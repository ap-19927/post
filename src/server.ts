import path from "path";
import fs from "fs/promises";
import express, { Express, Request, Response } from "express";
import { check } from "express-validator";
import rateLimit from "express-rate-limit";
import session from "express-session";
import pgSession = require("connect-pg-simple");
import bodyParser from "body-parser";
import { Pool } from "pg";
import passport from "passport";
import { Strategy } from "passport-local";
import { isoDate } from "./utils";
import bcrypt from "bcrypt";
import multer from "multer";

const deletePath = `/${process.env.DELETE}`;

const app: Express = express();
app.set("trust proxy", true);

const limiter = rateLimit({
  windowMs: 1000*60, //1 minute
  max: 1,
  message: (req: Request, res: Response) => res.redirect("/"),
  standardHeaders: true,
  legacyHeaders: false,
});

const imgStorage = multer.diskStorage({
  destination: path.join(__dirname,`${process.env.PATH_IMG_UP}/`),
  // you might also want to set some limits: https://github.com/expressjs/multer#limits
});
const upload = multer({
  storage: imgStorage,
  // you might also want to set some limits: https://github.com/expressjs/multer#limits
});
const pool: Pool = new Pool({
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  port: Number(process.env.POSTGRES_PORT),
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});
const createPostTable =
  "CREATE TABLE IF NOT EXISTS posts (text varchar(256) NOT null, date timestamp NOT null DEFAULT NOW(), img text);"
const createPostIndex = "CREATE INDEX IF NOT EXISTS post_date ON posts (date DESC);"
pool.query(createPostTable);
pool.query(createPostIndex);
const createUserTable =
  "CREATE TABLE IF NOT EXISTS users (username varchar(256) NOT null, password varchar(256) NOT null);"
pool.query(createUserTable);

//https://github.com/voxpelli/node-connect-pg-simple/blob/main/table.sql
const createSessionTable = `CREATE TABLE IF NOT EXISTS "session" ("sid" varchar NOT NULL COLLATE "default" PRIMARY KEY NOT DEFERRABLE INITIALLY IMMEDIATE, "sess" json NOT NULL, "expire" timestamp(6) NOT NULL) WITH (OIDS=FALSE);`
const createSessionIndex = "CREATE INDEX IF NOT EXISTS IDX_session_expire ON session (expire);"
pool.query(createSessionTable);
pool.query(createSessionIndex);

const PGStore = pgSession(session);
const ss = process.env.SESSION_SECRET == undefined ? "ss" : process.env.SESSION_SECRET;
app.use(session({
  secret: ss,
  resave: false,
  saveUninitialized: false,
  store: new PGStore({
    pool: pool,
    tableName: "session",
  }),
  cookie: {
    maxAge: 1000*60, //1 minute
    secure: false,
  }
}));
passport.use(new Strategy(async (username: string, password: string, done) => {
  const user = await pool.query("SELECT * FROM users WHERE username = $1 LIMIT 1", [username]);
  const compare = await bcrypt.compare(password, user.rows[0].password);
  if(user && compare) done(null, user.rows[0].username);
  else return done(null, false);
}));
passport.serializeUser((username, done) => {
  done(null, username);
});
passport.deserializeUser((username: string, done) => {
  done(null, username);
});
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("views", path.join(__dirname, "../src/public"));
app.set("view engine", "pug");

app.get("/", async (req: Request, res: Response) => {
  const posts = await pool.query("SELECT * FROM posts ORDER BY date DESC;");
  res.render("index", {posts: posts.rows, isoDate,});
});

app.post(`/${process.env.POST}`, [check("text").trim().escape(), limiter, upload.single("img")], async (req: Request, res: Response) => {
  if(req.file && path.extname(req.file.originalname).toLowerCase() !== ".png")
    return res.status(403).contentType("text/plain").end("File must be of type .png");
  const imgB64convrtFrmPath = async (filePath : string) => {
    const imgRaw = await fs.readFile(filePath);
    return `data:image/jpeg;base64,${imgRaw.toString("base64")}`;
  }
  const img = req.file ? await imgB64convrtFrmPath(req.file.path) : null;
  const text = req.body.text;
  await pool.query("INSERT INTO posts (text, img) VALUES ($1, $2);", [text, img],
    (err: Error) => {
      if(err) {
        console.error(err);
        res.status(500).send("Error inserting post into database");
      } else {
        console.log({IP: req.ip, text, date: new Date(),});
        res.redirect("/");
      }
  });
});

app.get(`/${process.env.LOGIN}`, (req: Request, res: Response) => {
  if(req.isAuthenticated()) return res.redirect(deletePath);
  res.render("login", {login: `/${process.env.LOGIN}`,});
});
app.post(`/${process.env.LOGIN}`, passport.authenticate("local", {
    successRedirect: deletePath,
    failureRedirect: "/",
    failureMessage: "Invalid",
  }),
 (req: Request, res: Response) => res.redirect(`${process.env.DELETE}`)
);

app.get(deletePath, async (req: Request, res: Response) => {
  if (!req.isAuthenticated()) return res.redirect("/");
  const posts = await pool.query("SELECT * FROM posts ORDER BY date DESC;");
  res.render("delete", {data: posts.rows, isoDate, deletePath,});
});

app.post(deletePath, async (req: Request, res: Response) => {
  if (!req.isAuthenticated()) return res.redirect("/");
  const startDate = req.body.start;
  const endDate = req.body.end;
  await pool.query("DELETE FROM posts WHERE date >= $1 AND date <= $2", [startDate, endDate],
    (err: Error) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error deleting posts from database");
      } else {
        console.log({IP: req.ip, date: new Date()});
        res.redirect("/");
      }
  });
});

app.listen(process.env.PORT);

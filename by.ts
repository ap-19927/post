import bcrypt from "bcrypt";
import * as dotenv from "dotenv";

dotenv.config();

const f = async () => {
  const saltRounds = 10;
  const hp = await bcrypt.hash(process.env.ADMIN_PASSWORD || "1", saltRounds);
  console.log(hp);
} 
f();

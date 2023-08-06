cp env .env
mkdir data
mkdir data/nginx
cp app.conf data/nginx
docker compose up --build -d
bash init-letsencrypt.sh

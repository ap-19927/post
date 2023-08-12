cp env .env
mkdir data
mkdir data/nginx
mkdir data/nginx/templates
cp app.conf.template data/nginx/templates
bash init-letsencrypt.sh

mkdir data
mkdir data/nginx
mkdir data/nginx/templates

cat > data/nginx/templates/app.conf.template << EOF
server {
  server_name \${IP} \${URI};
  location / {
    return 301 https://\$host\$request_uri;
  }
  location /.well-known/acme-challenge/ {
    root /var/www/certbot;
  }
}
EOF
bash letsencrypt-init.sh

cat >> data/nginx/templates/app.conf.template << EOF
server {
  listen 443 ssl;
  server_name \${URI};
  location / {
    proxy_pass http://172.17.0.1:\${PORT};
  }
  client_max_body_size 4M;
  ssl_certificate /etc/letsencrypt/live/\${URI}-0001/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/\${URI}-0001/privkey.pem;
  include /etc/letsencrypt/options-ssl-nginx.conf;
  ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}
EOF
bash letsencrypt-init.sh

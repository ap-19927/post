https://post.roadpeoples.com
## Post
A single thread with CRD capabilities. Authentication requried to create and delete.
We hope to improve the documentation so others may spin up their own server with ease.

### Setup
1. `cp env .env` and change the values in `.env` sensibly. In particular,
   change `IP` to the IP address of your server, and `URI` to the URI which
points to `IP`. Provide a strong `ADMIN_PASSWORD` and unique `ADMIN`.
2. `bash setup.sh`


### TODO
1. Given SIGNUP, LOGIN and DELETE routes on separate, non-public listener.
4. improve doc

### References

https://stackoverflow.com/questions/8107856/how-to-determine-a-users-ip-address-in-node

https://stackoverflow.com/questions/46718772/how-i-can-sanitize-my-input-values-in-node-js

https://flaviocopes.com/express-sanitize-input/

https://stackoverflow.com/questions/29506253/best-session-storage-middleware-for-express-postgresql

https://stackoverflow.com/questions/41419484/typescript-import-of-an-es5-anonymous-function

https://wiki.postgresql.org/wiki/BinaryFilesInDB

https://stackoverflow.com/questions/15772394/how-to-upload-display-and-save-images-using-node-js-and-express

https://pentacent.medium.com/nginx-and-lets-encrypt-with-docker-in-less-than-5-minutes-b4b8a60d3a71

https://stackoverflow.com/questions/55115080/how-to-specify-different-port-for-a-docker-postgres-instance

https://stackoverflow.com/questions/68449947/certbot-failing-acme-challenge-connection-refused

https://stackoverflow.com/questions/17233068/two-apps-in-expressjs

https://www.passportjs.org/concepts/authentication/logout/

https://www.cyberciti.biz/faq/nginx-ipv6-configuration/

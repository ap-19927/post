https://post.roadpeoples.com
## Post
What you wish, but we reserve the right to delete it.

We hope to improve the documentation so others may spin up their own server with ease.

### Setup
1. Change the values in `env` sensibly. In particular, change `IP` to the IP address of your server, and `URI` to the URI which points to `IP`.
2. `bash setup.sh`


### TODO
1. Given LOGIN and DELETE routes on separate, non-public listener.
2. New SIGNUP routes on above listener.
3. have dev env self-sign cert. nginx alpine run certbot --nginx
4. improve doc
5. content moderation

### References
https://stackoverflow.com/questions/8107856/how-to-determine-a-users-ip-address-in-node
https://stackoverflow.com/questions/46718772/how-i-can-sanitize-my-input-values-in-node-js
https://flaviocopes.com/express-sanitize-input/
https://stackoverflow.com/questions/29506253/best-session-storage-middleware-for-express-postgresql
https://stackoverflow.com/questions/41419484/typescript-import-of-an-es5-anonymous-function
https://wiki.postgresql.org/wiki/BinaryFilesInDB
https://stackoverflow.com/questions/15772394/how-to-upload-display-and-save-images-using-node-js-and-express
https://pentacent.medium.com/nginx-and-lets-encrypt-with-docker-in-less-than-5-minutes-b4b8a60d3a71

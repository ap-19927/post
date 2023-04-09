https://post.roadpeoples.com
## Post
What you wish, but we reserve the right to delete it.

We hope to improve the documentation so others may spin up their own server with ease.

### Setup
`cp env .env`

Change the `IP`, `DNS`, and `PORT` names in `app.conf` to the public ip address of your server, the domain name you have purchased, and the port the express server is running on, respectively.

`mkdir data`

`mkdir data/nginx`

`cp app.conf data/nginx`
### TODO
1. Given LOGIN and DELETE routes on separate, non-public listener.
2. New SIGNUP routes on above listener.
3. Image store as bytea instead of base64.
4. Images too large for nginx - gives 413 error when trying to upload 1.1MB size image.
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

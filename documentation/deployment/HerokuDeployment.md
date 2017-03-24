**Heroku Deployment**

___

**Login to Heroku**

heroku login

**Create Instance**

heroku create <instance_name>

**Destroy Instance**

heroku apps:destroy --app <instance_name>

**Link your branch to Heroku**

heroku git:remote -a <instance_name>

**Push ONLY *dist/* folder to heroku**

git subtree push --prefix dist heroku master





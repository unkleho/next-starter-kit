# Next Starter Kit

## Getting Started

### ENV Variables
```
# .env
TEST=it works!
GOOGLE_ANALYTICS_ID=UA-XXXXXXXX-X
GRAPHQL_URL=https://local.api.com/graphql

# .env.production
TEST=it works on production!
GOOGLE_ANALYTICS_ID=UA-XXXXXXXX-X
GRAPHQL_URL=https://production.api.com/graphql
```

### Deployment

Using `now`:
```
$ now sh
# Configuration in now.js
```

Using `heroko`:
```
$ git push heroku
```

### Set up as upstream repo
```
# Set up
$ git remote add upstream git@github.com:unkleho/next-starter-kit.git

# Merging upstream
$ git fetch upstream
$ git merge upstream/master --allow-unrelated-histories
# Fix merge conflicts
$ git add .
$ git commit -am "Upstream merge"
$ git push
```

## Based on nextjs-postcss branch
https://github.com/almeynman/nextjs-postcss
https://blog.intellection.kz/next-js-and-css-modules-37e785a98bb0

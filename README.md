# Next Starter Kit

Opinionated starter kit for the Next.js React framework. Next.js is great, but still needs a bit of configuring. This starter kit includes all my go-to tech for new projects.

* next.js
* next-css
* React
* Redux
* GraphQL
* React Apollo
* dotenv
* postcss
* cssnext
* Lost Grid
* ESLint
* Prettier
* Stylelint
* Jest
* Flow

## Getting Started

```
$ git clone git@github.com:unkleho/next-starter-kit
$ rm -rf .git
$ npm install
$ npm start
```

### ENV Variables

```
# .env
PORT=XXXX
TEST=it works!
GOOGLE_ANALYTICS_ID=UA-XXXXXXXX-X
GRAPHQL_URL=https://local.api.com/graphql

# .env.production
PORT=XXX
TEST=it works on production!
GOOGLE_ANALYTICS_ID=UA-XXXXXXXX-X
GRAPHQL_URL=https://production.api.com/graphql
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

## Deployment

Using `now`:

```
# Configuration in now.js
$ now sh
$ now alias my-website-XXXXXXX.now.sh my-website.com
# if rules.json is set up
$ npm run alias
```

Using `heroku`:

```
$ git push heroku
```

## Notes

* Big update to Next5 helped remove lots of hacks to get CSS import working. (9/2/18)
* May need to serve compiled stylesheet from static folder (https://github.com/zeit/next-plugins/tree/master/packages/next-css)

## Based on Next.js example:

https://github.com/zeit/next.js/tree/canary/examples/with-apollo-and-redux

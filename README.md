# Next Starter Kit

Opinionated starter kit for the Next.js React framework. This starter kit includes all my go-to tech for new projects.

* Next.js
* React
* Redux
* GraphQL
* React Apollo
* dotenv
* next-css
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

* Strange Apollo bug with accessing `props.query.url` in `graphql` HOC `options`, server-side rendering halts and relies on client. Fix is to use `getInitialProps` and return url params, to be accessed by `graphql` HOC.
* Big update to Next5 helped remove lots of hacks to get CSS import working. (9/2/18)
* May need to serve compiled stylesheet from static folder (https://github.com/zeit/next-plugins/tree/master/packages/next-css)

## Changelog

### 31/10/18

* Updated to Next JS 7 from 5. Removing `.babelrc` seems to fix `.env["development"].presets must be an array, or undefined` error.
* Updated React from 16.2 to 16.6
* Updated next-css

- Removed Flow

## Based on Next.js example:

https://github.com/zeit/next.js/tree/canary/examples/with-apollo-and-redux

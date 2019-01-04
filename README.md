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
* Lint Staged
* Jest

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
FB_APP_ID=XXXXXXXXX
GRAPHQL_URL=https://local.api.com/graphql

# .env.production
PORT=XXX
TEST=it works on production!
GOOGLE_ANALYTICS_ID=UA-XXXXXXXX-X
GRAPHQL_URL=https://production.api.com/graphql
```

### Feature Branches

Certain features are accessible via branches:

* `serverless`: Slightly different setup for deployment using Serverless framework.

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

## Features

### Next JS

Super simple way to build a Universal React application. Takes care of `webpack` config for you, with an optional plugin system. Routing and `<head>` tags are bundled in.

### GraphQL

[GraphQL](https://graphql.org) moves complexity from the client to the server. This makes frontend apps simpler and more fun to build. Any complexity that is moved to a GraphQL server can then be shared across other apps.

I find [Apollo's](https://www.apollographql.com/) tools are the most mature and up-to-date. It can be a bit tricky to set up, check out `lib/initApollo` and `lib/withApolloClient`.

### Redux

While there are more options now for state management, I've still set [Redux](https://redux.js.org) up in this starter kit because it does make some things easier. It is pretty simple to remove if unneeded.

### Dotenv

Lets you NOT commit passwords or keys to your repo. Also makes switching environments easier. See the ENV Variables section above.

### Next CSS

[Next CSS](https://github.com/zeit/next-plugins/tree/master/packages/next-css) lets you import CSS into a Next.js project. Call me old fashioned, but still like working with actual CSS files.

### PostCSS Preset Env

While I'm bit old fashioned, I use [PostCSS Preset Env](https://github.com/csstools/postcss-preset-env) to convert cool new, experimental features of upcoming CSS to old school CSS that existing browsers can understand. Much like how [Babel](https://babeljs.io/) transpiles JavaScript.

### Jest

I'm a big believer of test driven development for backend applications. It is a bit trickier for frontend, however, [Jest](https://jestjs.io/) is well set up in this repo with example component and integration tests.

### Prettier

Stops developers from arguing. I'm coding way faster with [Prettier](https://prettier.io/). These are good things.

### ESlint

You gotta lint code. I'm using a Create React App's sane rules, along with a few others.

### Stylelint

CSS is code. You still gotta lint.

### Lint Staged

Along with `husky`, [Lint Staged](https://github.com/okonet/lint-staged) lets you run commands before committing code. Husky sets the pre-commit stuff, Lint Staged gives more options.

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

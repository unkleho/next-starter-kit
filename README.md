# Next Starter Kit

Opinionated starter kit for the Next.js React framework. This starter kit includes all my go-to tech for new projects.

- [Next.js](https://github.com/zeit/next.js)
- [React](https://github.com/facebook/react)
- [TypeScript](https://github.com/microsoft/TypeScript)
- [next-css](https://github.com/zeit/next-plugins/blob/master/packages/next-css)
- [next-sass](https://github.com/zeit/next-plugins/blob/master/packages/next-sass)
- [dotenv](https://github.com/motdotla/dotenv)
- [ESLint](https://github.com/eslint/eslint)
- [Prettier](https://github.com/prettier/prettier)
- [Stylelint](https://github.com/stylelint/stylelint)
- [Husky](https://github.com/typicode/husky)
- [Lint Staged](https://github.com/okonet/lint-staged)
- [Jest](https://github.com/facebook/jest)
- [React Testing Library](https://github.com/testing-library/react-testing-library)

## Version 1

[This version](https://github.com/unkleho/next-starter-kit/tree/v1.5.0) has cool things like Apollo GraphQL and Redux, however I removed them for Version 2 because it is hard to keep up with Apollo and I'm using Redux less and less. It still has some goodies though, especially setting up the providers in \_app and testing scripts.

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

# .env.production
PORT=XXX
TEST=it works on production!
GOOGLE_ANALYTICS_ID=UA-XXXXXXXX-X
```

### Feature Branches

Certain features are accessible via branches:

- `graphql`: Use Apollo graphql (TODO)

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

### Dotenv

Lets you NOT commit passwords or keys to your repo. Also makes switching environments easier. See the ENV Variables section above.

### Next CSS

[Next CSS](https://github.com/zeit/next-plugins/tree/master/packages/next-css) lets you import CSS into a Next.js project. Call me old fashioned, but still like working with actual CSS files.

### Jest

I'm a big believer of test driven development for backend applications. It is a bit trickier for frontend, however, [Jest](https://jestjs.io/) is well set up in this repo with example component and integration tests that work with Redux and Apollo.

### React Testing Library

[Excellent library](https://testing-library.com/docs/react-testing-library/intro) that tests the DOM, rather than implementation, leading to tests that simulate real world usage.

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
# Configuration in now.json
$ now
$ now alias my-website-XXXXXXX.now.sh my-website.com
```

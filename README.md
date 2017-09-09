# DX Lab Website

## Proxies
Express proxies the following sites:

- dxlab.sl.nsw.gov.au/pano-scope/

Now alias can proxy using rules.json, but doesn't seem to work for http/https connections.

## Getting Started

```
$ git clone git@github.com:slnsw/dxlab-website
$ npm install
# Create up .env
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

## Deployment

Using `now`:
```
$ now sh
# Configuration in now.js
```

Using `heroku`:
```
$ git push heroku
```

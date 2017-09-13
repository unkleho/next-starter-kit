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
DXLAB_URL=http://dxlab.sl.nsw.gov.au

# .env.production
PORT=XXX
TEST=it works on production!
GOOGLE_ANALYTICS_ID=UA-XXXXXXXX-X
GRAPHQL_URL=https://production.api.com/graphql
DXLAB_URL=http://dxlab.sl.nsw.gov.au
```

## Deployment

Using `now`:
```
# Configuration in .env.staging
# TODO: Remove now.json?
$ npm run deploy
$ npm run alias-staging # Alias to dxlab-staging.now.sh
# or
$ npm run alias-production # Alias to dxlab.now.sh
```

Using `heroku`:
```
$ git push heroku
```

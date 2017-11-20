# DX Lab Website

Node JS React application with server-side rendering for DX Lab's website.

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
PORT=XXXX
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
# Also need to scale to 1 instance, otherwise instance will be FROZEN after a while
$ now scale dxlab-website-xxxxxxxxxx.now.sh 1
```

Using `heroku`:
```
$ git push heroku
```

## Proxies
Express proxies the following sites:

- dxlab.sl.nsw.gov.au/index/
- dxlab.sl.nsw.gov.au/loom/
- dxlab.sl.nsw.gov.au/mainstreet/
- dxlab.sl.nsw.gov.au/meridian/
- dxlab.sl.nsw.gov.au/muruview/
- dxlab.sl.nsw.gov.au/pano-scope/
- dxlab.sl.nsw.gov.au/portico/
- dxlab.sl.nsw.gov.au/postcards-1001/
- dxlab.sl.nsw.gov.au/weemala/
- dxlab.sl.nsw.gov.au/youngsydney/

Now alias can proxy using rules.json, but doesn't seem to work for http/https connections.

- [ ] TODO: Once `dxlab.sl.nsw.gov.au` is on https, use Now's `rules.json` rather than Express to proxy as it should be faster.

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
PORT=5010
TEST=it works!
GRAPHQL_URL=http://localhost:5000/graphql or https://12ke3766e4.execute-api.ap-southeast-2.amazonaws.com/staging/graphql
DXLAB_URL=https://staging-wp.dxlab.sl.nsw.gov.au
GOOGLE_ANALYTICS_ID=UA-XXXXXXXX-X
FB_APP_ID=XXXXXXXXXXXXX

# .env.production
PORT=3000
TEST=it works on production!
GOOGLE_ANALYTICS_ID=UA-XXXXXXXX-X
GRAPHQL_URL=https://syggbw4nm9.execute-api.ap-southeast-2.amazonaws.com/production/graphql
DXLAB_URL=https://wp.dxlab.sl.nsw.gov.au
FB_APP_ID=XXXXXXXXXXXXX
```

## Server Setup

```
# SSH into server
# Install nvm and node
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
$ . ~/.nvm/nvm.sh # Activate nvm
$ nvm install v8.9.3
# Symlink node and npm so they can be run by Ansible (as ubuntu user)
$ sudo ln -s /home/ubuntu/.nvm/versions/node/v8.9.3/bin/node /usr/local/bin/node
$ sudo ln -s /home/ubuntu/.nvm/versions/node/v8.9.3/bin/npm /usr/local/bin/npm
# Set up nginx
$ vim /etc/nginx/sites-available/dxlab.sl.nsw.gov.au.conf
$ ln -s /etc/nginx/sites-available/dxlab.sl.nsw.gov.au.conf /etc/nginx/sites-enabled/dxlab.sl.nsw.gov.au.conf
# Make project folder
$ mkdir /src/www/dxlab.sl.nsw.gov.au
$ chown ubuntu:ubuntu dxlab.sl.nsw.gov.au
```

## Deployment

### Ansible

Run `npm run deploy-[stage]`.

Try adding your local `id_rsa.pub` to ubuntu user's `.authorized_keys` file if you get a UNREACHABLE error.

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

## Hygen generator

To generate a new component

```
# Make sure hygen is installed
$ hygen component new --name NewComponent
```

## Proxies

Express proxies the following sites:

* dxlab.sl.nsw.gov.au/index/
* dxlab.sl.nsw.gov.au/loom/
* dxlab.sl.nsw.gov.au/mainstreet/
* dxlab.sl.nsw.gov.au/meridian/
* dxlab.sl.nsw.gov.au/muruview/
* dxlab.sl.nsw.gov.au/pano-scope/
* dxlab.sl.nsw.gov.au/portico/
* dxlab.sl.nsw.gov.au/postcards-1001/
* dxlab.sl.nsw.gov.au/search-terms/
* dxlab.sl.nsw.gov.au/weemala/
* dxlab.sl.nsw.gov.au/youngsydney/

Now alias can proxy using rules.json, but doesn't seem to work for http/https connections.

* [ ] TODO: Once `dxlab.sl.nsw.gov.au` is on https, use Now's `rules.json` rather than Express to proxy as it should be faster.

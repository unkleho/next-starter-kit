// External apps to proxy
module.exports = {
  // TODO: Function to redirect /XXXX to /XXXX/, otherwise WP redirects it.
  '/index/': {
    target: process.env.DXLAB_URL,
    changeOrigin: true,
  },
  '/loom/': {
    target: process.env.DXLAB_URL,
    changeOrigin: true,
  },
  '/mainstreet/': {
    target: process.env.DXLAB_URL,
    changeOrigin: true,
  },
  '/muruview/': {
    target: process.env.DXLAB_URL,
    changeOrigin: true,
  },
  '/pano-scope/': {
    target: process.env.DXLAB_URL,
    changeOrigin: true,
  },
  '/portico/': {
    target: process.env.DXLAB_URL,
    changeOrigin: true,
  },
  '/postcards-1001/': {
    target: process.env.DXLAB_URL,
    changeOrigin: true,
  },
  '/weemala/': {
    target: process.env.DXLAB_URL,
    changeOrigin: true,
  },
  '/youngsydney/': {
    target: process.env.DXLAB_URL,
    changeOrigin: true,
  },
}

// External apps to proxy
module.exports = {
  // TODO: Function to redirect /XXXX to /XXXX/, otherwise WP redirects it.
  '/index/': {
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
}

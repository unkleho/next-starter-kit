// External apps to proxy from wp.dxlab.sl.nsw.gov.au
// Make sure to add trailing slash

module.exports = {
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
  '/meridian/': {
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
  '/search-terms/': {
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
};

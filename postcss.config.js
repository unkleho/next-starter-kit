module.exports = {
  plugins: [
    require("postcss-easy-import")({ prefix: "_" }), // keep this first
    require("postcss-cssnext")({
      features: {
        autoprefixer: false,
      }
    }),
    require('lost'),
    require('cssnano')()
  ]
}

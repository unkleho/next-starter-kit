module.exports = {
  plugins: [
    require("postcss-easy-import")({
      // FIXME: Emitted value instead of an instance of Error...
      // plugins: [
      //   require("stylelint")({
      //     "extends": "stylelint-config-standard"
      //   }),
      // ],
      prefix: "_",
    }), // keep this first
    require("postcss-cssnext")({
      features: {
        autoprefixer: false,
      },
    }),
    require('lost'),
    // FIXME: cssnano messes with pseudo selectors
    // require('cssnano')()
    // require('postcss-reporter'),
  ]
}

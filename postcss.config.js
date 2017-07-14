module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-cssnext')(),
    require('lost'),
    // require('postcss-modules')({
    //   generateScopedName: '[local]-[hash:base64:5]'
    // }),
    // require('cssnano')()
  ]
}

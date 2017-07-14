const fs = require('fs')
const trash = require('trash')

// module.exports = {
//   webpack: (config, { dev }) => {
//     config.plugins = config.plugins.filter(
//       (plugin) => (plugin.constructor.name !== 'UglifyJsPlugin')
//     )
//
//     config.module.rules.push(
//       {
//         test: /\.css$/,
//         use: [
//           {
//             loader: 'emit-file-loader',
//             options: {
//               name: 'dist/[path][name].[ext]'
//             }
//           },
//           // {
//           //   loader: 'skeleton-loader',
//           //   options: {
//           //     procedure: function (content) {
//           //       const fileName = `${this._module.userRequest}.json`
//           //       const classNames = fs.readFileSync(fileName, 'utf8')
//           //
//           //       trash(fileName)
//           //
//           //       return ['module.exports = {',
//           //         `classNames: ${classNames},`,
//           //         `stylesheet: \`${content}\``,
//           //         '}'
//           //       ].join('')
//           //     }
//           //   }
//           // },
//           // 'postcss-loader'
//         ]
//       },
//       {
//         test: /\.css$/,
//         // Example with `css-loader` and `postcss-loader' (you may also activate CSS modules just like above)
//         // Enable `postcss-imports` plugin must be enabled in the `postcss.config.js` file to process @import declarations
//         loader: `babel-loader!next-style-loader!css-loader?sourceMap&minimize=${!dev}&url=false!postcss-loader`
//       }
//     )
//
//     return config
//   }
// }

module.exports = {
    webpack: (config, { dev }) => {
        config.module.rules.push(
            {
                test: /\.css$/,
                loader: 'emit-file-loader',
                options: {
                    name: 'dist/[path][name].[ext]',
                },
            },
            {
                test: /\.css$/,
                // Example with `css-loader` and `postcss-loader' (you may also activate CSS modules just like above)
                // Enable `postcss-imports` plugin must be enabled in the `postcss.config.js` file to process @import declarations
                loader: `babel-loader!next-style-loader!css-loader?sourceMap&minimize=${!dev}&url=false`
            }
        );

        return config;
    },
};

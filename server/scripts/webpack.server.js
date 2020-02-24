// const path = require('path')

console.log(1)

module.exports = {
  mode: 'development',
  entry: './server/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.bundle.js'
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.js|ts|tsx$/,
        use: ['babel-loader'],
        exclude: path.resolve(__dirname, 'node_modules'),
        options: {
          customize: require.resolve(
            'babel-preset-react-app/webpack-overrides'
          ),

          plugins: [
            [
              require.resolve('babel-plugin-named-asset-import'),
              {
                loaderMap: {
                  svg: {
                    ReactComponent: '@svgr/webpack?-svgo,+ref![path]'
                  }
                }
              }
            ]
          ],
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: true,
          cacheCompression: true,
          compact: true
        }
      },
      {
        // CSS 代码不能被打包进用于服务端的代码中去，忽略掉 CSS 文件
        test: /\.css/,
        use: ['ignore-loader']
      }
    ]
  }

}

const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
  addDecoratorsLegacy,
  addWebpackPlugin
} = require('customize-cra');

const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#109efc' },
  }),
  addDecoratorsLegacy(),
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src'),
  }),
  addWebpackPlugin(new UglifyJsPlugin())
);
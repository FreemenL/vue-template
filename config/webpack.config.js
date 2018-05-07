//开发环境配置
const path = require('path');
const webpack = require('webpack');
const commonSet = require('./webpack.common.js');
const { address } = require('./config.js');
const config = {
  entry:[
    'babel-polyfill',
    path.resolve(__dirname,'../src/index.js')
  ],
  output:{
      filename:'assets/js/[name].js',
      path:path.resolve(__dirname,'../dist'),
      publicPath:'/'
  },
  devtool: commonSet.devtool,//定位错位位置
  devServer:{//浏览器自动刷新,需下载webpack-dev-server
    contentBase:path.join(__dirname, "../dist"),
    overlay: true,
    port:8000,
    open : false,
    host:'0.0.0.0',
    hot:true,//开启热更新
    stats: "errors-only",
    historyApiFallback: true,
    proxy: {
      '/api/*': {
        target:address.domains+'/',
        changeOrigin: true,
        secure: true
      }
    }
  },
  module:commonSet.module,
  plugins:[
    //new webpack.optimize.UglifyJsPlugin(),//压缩打包后文件
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ConsoleLogWebpackStart(),//自定义插件
    new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"development"'//node提供的常量api
        }
    })
  ].concat(commonSet.plugins),
  resolve:commonSet.resolve
}
function ConsoleLogWebpackStart(){

}
ConsoleLogWebpackStart.prototype.apply = function(compiler){
    compiler.plugin('run',function(compiler,callback){
      console.log('package start!');
      callback();
    })
}
module.exports = config;

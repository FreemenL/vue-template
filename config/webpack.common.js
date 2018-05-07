const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const srcPath = path.resolve(__dirname,'../src');
const commonSet = {
    entry:{
        app:path.resolve(__dirname,'../src/index.js')
    },
    output:{
      filename:'assets/js/[name].js',
      path:path.resolve(__dirname,'../dist')
    },
    devtool: 'inline-source-map',
    module:{
      rules:[{
        test: /\.vue$/,
        loader: 'vue-loader'
      },{
        test: /\.styl/,
        use: [
            'style-loader',
            'css-loader',
            {
                loader: 'postcss-loader',
                options: {
                    sourceMap: true
                }
            },
            'stylus-loader'
        ]
    },{
        test:/\.bundle\.js$/,
        use:'bundle-loader'
      },{
        test:/\.(js|jsx)$/,
        use:'babel-loader',
        exclude:path.resolve(__dirname, '../node_modules')
      },{
        test: /\.(less|css)$/,
        use: ['style-loader',
          'css-loader',
          'less-loader'
        ]
      },{
        test: /\.scss$/,
        use: ['style-loader',
          'css-loader',
          'sass-loader'
        ]
      },{
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
              loader: 'url-loader',
              options: {
                  limit: 1024,  // 文件小于1024字节，转换成base64编码，写入文件里面
                  name: '[name]-output.[ext]'
              }
          }
        ]
      },{
       test: /\.(woff|woff2|eot|ttf|otf)$/,
       use: [
         'file-loader'
       ]
     }]
    },
    plugins:[
      new HtmlWebpackPlugin({
        title:'learn redux',
        template:path.resolve(__dirname,'../template/index.html')
      }),//自动生成html
      new webpack.ProvidePlugin({
        util:"util",
        config:'config'
      })
    ],
    externals:{
      'jquery':'window.jQuery'
    },
    resolve:{
    extensions: [".js", ".json",".jsx",".vue"],
    alias:{//配置路径常量
      '@component':`${srcPath}/component`,
      '@assets':`${srcPath}/assets`,
      '@router':`${srcPath}/router`,
      '@store':`${srcPath}/store`,
       style:`${srcPath}/style`,
       libs:`${srcPath}/libs`,
       util:`${srcPath}/libs/util`,
       config:path.resolve(__dirname,'../config/config'),
    }
  }
}


module.exports = commonSet;
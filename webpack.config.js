const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    devtool: 'eval-source-map',
    entry: {
        main: './src/js/main.js',
        home: './src/js/home.js'
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/dist'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename : 'index.html',//入口html
            template : './src/page/index.html',
            minify : {
                // removeComments:true,   //删除注释
                // collapseWhitespace: true      //删除空格，压缩
            },
            chunks: ['main']  //对应entry的入口js.这样可以按需加载js
        }),
        new HtmlWebpackPlugin({
            filename : 'home.html',
            template : './src/page/home.html',
            minify : {
                // removeComments:true,   //删除注释
                // collapseWhitespace: true      //删除空格，压缩
            },
            chunks: ['home']
        }),
    ],
    module: {
        rules: [{
                test: /\.js$/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                //图片加载器，雷同file-loader，更适合图片，可以将较小的图片转成base64，减少http请求
                //如下配置，将小于8192byte的图片转成base64码
                test: /.(jpg|png|gif|svg)$/, 
                use: ['url-loader?limit=8192&name=./[name].[ext]']/*解析图片*//*解析图片*/
            }
        ]
    },
    devServer: { 
        host : '127.0.0.1', 
        port : 8080 ,
        inline : true,
        open :true,   //自动打开浏览器
        hot : false,   //慎用！打开热更新，会导致修改样式可能不支持。关闭热更新，页面会强刷
        contentBase : path.join(__dirname),
    }
}
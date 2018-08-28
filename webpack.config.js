/**
 * Created by liumanli on 2018/8/28.
 */
const path = require('path');

module.exports = {
    context: path.resolve(__dirname, 'app'),//__dirname获得当前文件所在目录的完成目录名
    resolve: {
        modules: [
            path.resolve(__dirname, 'node_modules')//path.resolve返回一个相对当前的工作目录的绝对路径
        ]
    },
    entry: './app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react'],
                    }
                }
            },
            {
                test: /index\.html/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name (file) {
                            return 'index.[ext]'
                        }
                    }
                }]
            },
            {
                test: /\.css$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }],
            },
            {
                test: /.*\.(gif|png|jpe?g|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'images/[name].[ext]'
                    }
                }, {
                    loader: 'image-webpack-loader'
                }]
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.less$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader',
                }, {
                    loader: 'less-loader',
                }]
            },
        ]
    },
    //webpack-dev-server配置
    devServer: {
        contentBase: './dist',
        historyApiFallback: true,
        inline: true,//源文件改变,会自动刷新页面
        port: 1234,//设置默认监听端口，如果省略，默认为"8080"
    },
};
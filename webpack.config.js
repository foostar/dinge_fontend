/* eslint-disable */
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var path = require('path');
var webpack = require('webpack');
var fs = require('fs');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

var srcDir = path.resolve(process.cwd(), 'src');

//获取多页面的每个入口文件，用于配置中的entry
function getEntry() {
    var jsPath = path.resolve(srcDir, 'js');
    var dirs = fs.readdirSync(jsPath);
    var matchs = [], files = {};
    dirs.forEach(function (item) {
        matchs = item.match(/(.+)\.js$/);
        console.log(matchs);
        if (matchs) {
            files[matchs[1]] = path.resolve(srcDir, 'js', item);
        }
    });
    console.log(JSON.stringify(files));
    return files;
}

module.exports = {
    cache: true,
    entry: getEntry(),
    output: {
        path: path.join(__dirname, "dist/js/"),
        publicPath: "dist/js/",
        filename: "[name].js",
        chunkFilename: "[chunkhash].js"
    },
    module:{
        loaders:[
            {
                test: /\.js$/,
                include: srcDir + "/js",
                loader: 'babel-loader',
                query: {
                  presets: ['es2015']
                }
            },
            {
                test: /zepto.js$/,
                loader: 'exports?window.$!script'
            }
        ]
    },
    resolve: {
        alias: {
            Zepto: srcDir + "/js/lib/zepto.js",
            dingeUi: srcDir + "/js/ui/uiComponent.js",
            Swiper: srcDir + "/js/lib/swiper.jquery.min.js",
            dingeTools: srcDir + "/js/core/dingeTools.js",
            API: srcDir + "/js/api/api.js"
        }
    },
    plugins: [
        new CommonsChunkPlugin('common.js'),
        new webpack.ProvidePlugin({
            $: srcDir + "/js/lib/zepto.js",
            Zepto: srcDir + "/js/lib/zepto.js",
            'window.Zepto': srcDir + "/js/lib/zepto.js"
        })/*,
        new uglifyJsPlugin({
            compress: {
                warnings: false
            }
        })*/
    ]
};
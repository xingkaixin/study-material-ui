var webpack = require('webpack');

module.exports = {
    entry : {
        bundle: "./index.js"
    },
    output : {
        path : "./build",
        filename : "[name].js"
    },
    module : {
        loaders :[
            {test:/\.js$/, loader:'babel-loader?stage=1'}
        ],
        noParse: /\.min\.js/

    },
}
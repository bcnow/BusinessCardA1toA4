var path = require('path');
var webpack = require('webpack');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
	entry: './src/es6/main.js',
	output: {
		path: path.resolve(__dirname, 'dist-es6-webpack'),
		filename: 'main.bundle.js'
	},
	module: {
		loaders: [{
			test: /\.js$/,
			loader: 'babel-loader',
			query: {
				presets: ['es2015']
			}
		}]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: "vendor.bundle.js",
			//async: 'lodash',
			minChunks(module, count) {
				var context = module.context;
				return context && (context.indexOf('node_modules') >= 0 || context.indexOf('bower_components') >= 0);
			},
		}),
		new BundleAnalyzerPlugin({
			analyzerMode: 'static'
		})
	],
	stats: {
		colors: true
	},
	devtool: 'source-map'
};
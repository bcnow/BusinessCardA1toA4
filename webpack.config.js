var path = require('path');
var webpack = require('webpack');

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
			filename: "vendor.bundle.js"
		})
	],
	stats: {
		colors: true
	},
	devtool: 'source-map'
};
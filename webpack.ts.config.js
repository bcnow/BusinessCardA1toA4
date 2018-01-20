var path = require('path');
var webpack = require('webpack');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
	entry: './src/typescript-example/main.ts',
	output: {
		path: path.resolve(__dirname, 'dist-ts-webpack'),
		filename: 'ts.bundle.js'
	},
	resolve: {
		// Add `.ts` and `.tsx` as a resolvable extension.
		extensions: ['.ts', '.tsx', '.js']
	},
	module: {
		rules: [
			// all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
			{
				test: /\.tsx?$/,
				loader: 'ts-loader'
			}
		]
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
		})
		// new BundleAnalyzerPlugin({
		// 	analyzerMode: 'static'
		// })
	],
	stats: {
		colors: true
	},
	devtool: 'inline-source-map'
};

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'xue.js',
		path: './dist'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				}
			}
		]
	}
};

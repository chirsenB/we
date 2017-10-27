const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = env => {
	let publicPath = '';
	if(env && env.NODE_ENV !== 'local') {
		publicPath = '//www.examplg.com/';
	}
	return {
		entry: './main.js',
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: 'bundle.js',
			publicPath
		},
		module: {
			rules: [
				{
					test: /\.less$/,
					use: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: ['css-loader', 'postcss-loader', 'less-loader']
					})
				},
				{
					test:/\.(png|jpg|ttf|gif)$/,
					use: [
						{
							loader: 'url-loader',
							options: {
								limit: 1,
								name: 'images/[hash:8].[name].[ext]'
							}
						}
					]
				},
				{ 
					test: /\.(mp4|ogg|mp3|wav)$/, 
					use: [{
						loader: 'file-loader',
						options: {
							name: 'audio/[hash:8].[name].[ext]'
						}
					}]
				}
			]
		},
		plugins: [
			new HtmlWebpackPlugin({
				// 动态注入文件，html中的资源文件动态编译，注意设置attrs来应对不同文件，默认为img
				template: 'html-loader?attrs[]=img:src&attrs[]=source:src!' + path.join(__dirname, 'index.html')
			}), new ExtractTextPlugin('test.css'), // css提取
			new UglifyJSPlugin() // 压缩
		],
		devtool: 'inline-source-map'
	}
}

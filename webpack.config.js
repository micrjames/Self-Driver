const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
   mode: "development",
   entry: {
	  bundle: path.resolve(__dirname, "src/index.ts"),
   },
   output: {
	  path: path.resolve(__dirname, "dist"),
	  filename: "[name][contenthash].js",	// bundle.js
	  clean: true,
	  assetModuleFilename: '[name][ext]'
   },
   devtool: 'source-map',
   devServer: {
	  static: {
		 directory: path.resolve(__dirname, 'dist')
	  },
	  port: 3000,
	  open: true,
	  hot: true,
	  compress: true,
	  historyApiFallback: true
   },
   module: {
	  rules: [
		 {
			test: /\.scss$/,
			use: ["style-loader", "css-loader", "sass-loader"]
		 },
		 {
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
			   loader: 'babel-loader',
			   options: {
				  presets: ['@babel/preset-env']
			   }
			}
		 },
		 {
			test: /\.tsx?$/,
			use: 'ts-loader',
			exclude: /node_modules/
		 },
		 {
			test: /\.(png|svg|jpg|jpeg|gif)$/i,
			type: 'asset/resource'
		 }
	  ]
   },
   resolve: {
	  extensions: ['.tsx', '.ts', '.js']
   },
   plugins: [
	  new CleanWebpackPlugin({
		 verbose: true
	  }),
	  new HtmlWebpackPlugin({
		 title: 'Self-Driving car - No Libraries',
		 filename: 'index.html',
		 template: 'src/template.html'
	  })
   ]
};

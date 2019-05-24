const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/src"),
    filename: "bundle.js"
  },
    devServer: {
	    proxy: {
      		'/api': 'http://localhost:3000'
    	}
	},
	module: {
	    rules: [
	      {
	        test: /\.js$/,
	        exclude: /node_modules/,
	        use: {
	          loader: "babel-loader"
	        },
	      },
	      {
	        test: /\.css$/,
	        use: ["style-loader", "css-loader"]
	      }
	    ]
	  },
   plugins: [
     new HtmlWebpackPlugin({
       template: "./src/index.html"
     })
   ]
};

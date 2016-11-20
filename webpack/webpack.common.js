var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractCSS = new ExtractTextPlugin('[name].[hash].css');
var extractLESS = new ExtractTextPlugin('[name]2.[hash].css');

module.exports = {
	entry: {
		vendors: "./src/vendors.ts",
		app: "./src/index.tsx"
	},
	output: {
		filename: "[name].[hash].js",
		path: __dirname + "/../dist"
	},

	// Enable sourcemaps for debugging webpack's output.
	devtool: "source-map",

	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".scss"]
	},

	module: {
		loaders: [
			// All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
			{ test: /\.tsx?$/, loader: "ts-loader" },
			{ test: /\.scss$/i, loader: extractCSS.extract(['css','sass']) },
			{ test: /\.less$/i, loader: extractLESS.extract(['css','less']) },
			{ test: /\.(eot|svg|ttf|woff|woff2)$/, loader: 'file?name=fonts/[name].[hash].[ext]' }
		],

		preLoaders: [
			// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
			{ test: /\.js$/, loader: "source-map-loader" }
		]
	},

	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'index.html',
			hash: true
		}),
		extractCSS,
		extractLESS
	],

	// When importing a module whose path matches one of the following, just
	// assume a corresponding global variable exists and use that instead.
	// This is important because it allows us to avoid bundling all of our
	// dependencies, which allows browsers to cache those libraries between builds.
	externals: {
		"react": "React",
		"react-dom": "ReactDOM"
	},
};

const HtmlWebPackPlugin = require( 'html-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const OptimmizeCssAssetsPlugin = require( 'optimize-css-assets-webpack-plugin' );
const CopyPlugin = require( 'copy-webpack-plugin' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );


let htmlPageNames = [ 'crear-gifos', 'favoritos', 'home', 'mis-gifos' ];
let multipleHtmlPlugins = htmlPageNames.map( name => {
  return new HtmlWebPackPlugin( {
    template: `./src/pages/${ name }.html`, // relative path to the HTML files
    filename: `${ name }.html`, // output HTML files
    // chunks: [ `${ name }` ] // respective JS files
  } );
} );

module.exports = {

  mode: 'development',
  optimization: {
    minimizer: [ new OptimmizeCssAssetsPlugin() ]
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      // {
      //   test: /\.scss$/,
      //   loader: 'style!css!sass',
      //   exclude: /node_modules/
      // },
      // {
      //   test: /\.css$/,
      //   exclude: /styles\.css$/,
      //   use: [
      //     'style-loader',
      //     'css-loader'
      //   ]
      // },
      {
        test: /styles\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          attributes: false,
          minimize: false,
        }
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg|jpg|png)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin( {
      template: './src/index.html',
      filename: './index.html'
    } ),
    new MiniCssExtractPlugin( {
      filename: '[name].css',
      ignoreOrder: false
    } ),
    new CopyPlugin( {
      patterns: [
        { from: 'src/assets', to: 'assets/' },
        // { from: 'src/pages', to: 'pages/' },
        // { from: 'src/components', to: 'components/' },
        // { from: 'src/js', to: 'js/' },
      ]
    } ),
    new CleanWebpackPlugin(),
  ]
    .concat( multipleHtmlPlugins )
};


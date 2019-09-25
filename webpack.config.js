const webpack = require("webpack"); 
const path = require("path"); 
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //transfer style vis css not js
const HtmlWebpackPlugin = require('html-webpack-plugin') ; 
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    mode: 'development', //development | production
    optimization: {
        minimize: false //for minify .js files
    },
    entry: {//we create new property for each entry point , key is name and value should point to entry point
        'index' : './src/index/index.js' ,    
        'product' : './src/product/product.js' ,    
        'products' : './src/products/products.js' ,    
        'faq' : './src/faq/faq.js' ,    
        'loginGuide' : './src/login-guide/login-guide.js' ,    
        'conditions' : './src/conditions/conditions.js' ,    
        'private' : './src/private/private.js' ,    
        'nameDesign' : './src/name-design/name-design.js' ,    
        'soundFreq' : './src/sound-freq/sound-freq.js' ,    
        'teach' : './src/teach/teach.js' ,    
        'about' : './src/about/about.js' ,    
        'article' : './src/article/article.js' ,    
        'articles' : './src/articles/articles.js' ,    
        'manualCheckout' : './src/manual-checkout/manual-checkout.js' ,    
        'withTabacharm' : './src/with-tabacharm/with-tabacharm.js' ,    
        'contact' : './src/contact/contact.js' ,       
        'orderDetails' : './src/order-details/order-details.js' ,    
        'orders' : './src/orders/orders.js' ,    
        'signin' : './src/signin/signin.js' ,    
        'signup' : './src/signup/signup.js' ,    
        'forgetPassword' : './src/forget-password/forget-password.js' ,    
        'basket' : './src/basket/basket.js' ,            
        'editProfile' : './src/edit-profile/edit-profile.js' ,            
        'changePassword' : './src/change-password/change-password.js' ,            
        'returnRequest' : './src/return-request/return-request.js' ,            
    },
    output: {//for each entry point we create one .js bundle(with the same name of entry point)
        filename: '[name].js',
        path: path.resolve(__dirname, './dist') 
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader" ,
				exclude: /node_modules/,
            },
            { //for transfer .css via css files
                test: /\.css$/,
                use: [
                    {
                      loader: MiniCssExtractPlugin.loader,
                      options: {
                        hmr: process.env.NODE_ENV === 'development', //for enabling HMR(hot module reloading)
                        reloadAll: true,
                      },
                    },
                    'css-loader',
                    'postcss-loader'
                ]
            },
            // { //for transfer .css via js files
            //     test: /\.css$/,
            //     use: ['style-loader','css-loader','postcss-loader']
            // },
            {//for transfer .scss via css files
                test:/\.scss$/,
                use: [
                    {
                      loader: MiniCssExtractPlugin.loader,
                      options: {
                        hmr: process.env.NODE_ENV === 'development',
                        reloadAll: true,
                      },
                    },
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            // { //for transfer .scss via js files
            //     test: /\.scss$/,
            //     use: ['style-loader','css-loader','postcss-loader','sass-loader']
            // },
            {
                test : /\.html$/,
                exclude: /node_modules/,		
                use: [ {
                    loader: 'html-loader',
                    options: {
                        minimize: false , //for minify html or not
                        publicPath: './'
                    }
                }]
            },
            {
                test : /\.(png|jpg|jpeg)$/ ,
                exclude: /node_modules/,
                use : [ {
                        loader : 'file-loader' ,
                        options : {
                            name : '[name].[ext]',
                            outputPath : 'assets/imgs/',
                            publicPath : 'assets/imgs/'
                        }
                        }
                ]
            },
            {
                test : /\.(ttf|otf|woff|woff2|eot)$/ ,
                use : [ {
                        loader : 'file-loader' ,
                        options : {
                            name : '[name].[ext]',
                            outputPath : 'assets/fonts/',
                            publicPath : 'assets/fonts/'
                        }
                        }
                ]
            },
            {
                test : /\.svg$/ ,
                use : [ {
                        loader : 'file-loader' ,
                        options : {
                            name : '[name].[ext]',
                            outputPath : 'assets/svgs/',
                            publicPath : 'assets/svgs/'
                        }
                        }
                ]
            },
            {
                test : /\.mp4$/ ,
                use : [ {
                        loader : 'file-loader' ,
                        options : {
                            name : '[name].[ext]',
                            outputPath : 'assets/vids/',
                            publicPath : 'assets/vids/'
                        }
                        }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({ //for each .html file we have one bundle .css file that its name is same as its entry point
            filename: "[name].css", 
            chunkFilename: '[id].css',
            ignoreOrder: false 
        }),
        new HtmlWebpackPlugin({ //for each .html file we need new instance of 'HtmlWebpackPlugin'
            filename: 'index.html' , //name of file inside ./dist folder
            inject: true,
            chunks: ['index'],
            template: './src/index/index.html' //should point to target html file that we want to add <script>,<link>
        }),
        new HtmlWebpackPlugin({ //for each .html file we need new instance of 'HtmlWebpackPlugin'
            filename: 'product.html' , //name of file inside ./dist folder
            inject: true,
            chunks: ['product'],
            template: './src/product/product.html' //should point to target html file that we want to add <script>,<link>
        }),
        new HtmlWebpackPlugin({ //for each .html file we need new instance of 'HtmlWebpackPlugin'
            filename: 'products.html' , //name of file inside ./dist folder
            inject: true,
            chunks: ['products'],
            template: './src/products/products.html' //should point to target html file that we want to add <script>,<link>
        }),
        new HtmlWebpackPlugin({ //for each .html file we need new instance of 'HtmlWebpackPlugin'
            filename: 'faq.html' , //name of file inside ./dist folder
            inject: true,
            chunks: ['faq'],
            template: './src/faq/faq.html' //should point to target html file that we want to add <script>,<link>
        }),
        new HtmlWebpackPlugin({ //for each .html file we need new instance of 'HtmlWebpackPlugin'
            filename: 'login-guide.html' , //name of file inside ./dist folder
            inject: true,
            chunks: ['loginGuide'],
            template: './src/login-guide/login-guide.html' //should point to target html file that we want to add <script>,<link>
        }),
        new HtmlWebpackPlugin({ //for each .html file we need new instance of 'HtmlWebpackPlugin'
            filename: 'conditions.html' , //name of file inside ./dist folder
            inject: true,
            chunks: ['conditions'],
            template: './src/conditions/conditions.html' //should point to target html file that we want to add <script>,<link>
        }),
        new HtmlWebpackPlugin({ //for each .html file we need new instance of 'HtmlWebpackPlugin'
            filename: 'private.html' , //name of file inside ./dist folder
            inject: true,
            chunks: ['private'],
            template: './src/private/private.html' //should point to target html file that we want to add <script>,<link>
        }),
        new HtmlWebpackPlugin({ //for each .html file we need new instance of 'HtmlWebpackPlugin'
            filename: 'name-design.html' , //name of file inside ./dist folder
            inject: true,
            chunks: ['nameDesign'],
            template: './src/name-design/name-design.html' //should point to target html file that we want to add <script>,<link>
        }),
        new HtmlWebpackPlugin({ //for each .html file we need new instance of 'HtmlWebpackPlugin'
            filename: 'sound-freq.html' , //name of file inside ./dist folder
            inject: true,
            chunks: ['soundFreq'],
            template: './src/sound-freq/sound-freq.html' //should point to target html file that we want to add <script>,<link>
        }),
        new HtmlWebpackPlugin({ //for each .html file we need new instance of 'HtmlWebpackPlugin'
            filename: 'teach.html' , //name of file inside ./dist folder
            inject: true,
            chunks: ['teach'],
            template: './src/teach/teach.html' //should point to target html file that we want to add <script>,<link>
        }),
        new HtmlWebpackPlugin({ //for each .html file we need new instance of 'HtmlWebpackPlugin'
            filename: 'about.html' , //name of file inside ./dist folder
            inject: true,
            chunks: ['about'],
            template: './src/about/about.html' //should point to target html file that we want to add <script>,<link>
        }),
        new HtmlWebpackPlugin({ //for each .html file we need new instance of 'HtmlWebpackPlugin'
            filename: 'article.html' , //name of file inside ./dist folder
            inject: true,
            chunks: ['article'],
            template: './src/article/article.html' //should point to target html file that we want to add <script>,<link>
        }),
        new HtmlWebpackPlugin({ //for each .html file we need new instance of 'HtmlWebpackPlugin'
            filename: 'articles.html' , //name of file inside ./dist folder
            inject: true,
            chunks: ['articles'],
            template: './src/articles/articles.html' //should point to target html file that we want to add <script>,<link>
        }),
        new HtmlWebpackPlugin({ //for each .html file we need new instance of 'HtmlWebpackPlugin'
            filename: 'manual-checkout.html' , //name of file inside ./dist folder
            inject: true,
            chunks: ['manualCheckout'],
            template: './src/manual-checkout/manual-checkout.html' //should point to target html file that we want to add <script>,<link>
        }),
        new HtmlWebpackPlugin({ //for each .html file we need new instance of 'HtmlWebpackPlugin'
            filename: 'with-tabacharm.html' , //name of file inside ./dist folder
            inject: true,
            chunks: ['withTabacharm'],
            template: './src/with-tabacharm/with-tabacharm.html' //should point to target html file that we want to add <script>,<link>
        }),
        new HtmlWebpackPlugin({ //for each .html file we need new instance of 'HtmlWebpackPlugin'
            filename: 'contact.html' , //name of file inside ./dist folder
            inject: true,
            chunks: ['contact'],
            template: './src/contact/contact.html' //should point to target html file that we want to add <script>,<link>
        }),
        new HtmlWebpackPlugin({ //for each .html file we need new instance of 'HtmlWebpackPlugin'
            filename: 'order-details.html' , //name of file inside ./dist folder
            inject: true,
            chunks: ['orderDetails'],
            template: './src/order-details/order-details.html' //should point to target html file that we want to add <script>,<link>
        }),
        new HtmlWebpackPlugin({ //for each .html file we need new instance of 'HtmlWebpackPlugin'
            filename: 'orders.html' , //name of file inside ./dist folder
            inject: true,
            chunks: ['orders'],
            template: './src/orders/orders.html' //should point to target html file that we want to add <script>,<link>
        }),
        new HtmlWebpackPlugin({ //for each .html file we need new instance of 'HtmlWebpackPlugin'
            filename: 'signin.html' , //name of file inside ./dist folder
            inject: true,
            chunks: ['signin'],
            template: './src/signin/signin.html' //should point to target html file that we want to add <script>,<link>
        }),
        new HtmlWebpackPlugin({ //for each .html file we need new instance of 'HtmlWebpackPlugin'
            filename: 'signup.html' , //name of file inside ./dist folder
            inject: true,
            chunks: ['signup'],
            template: './src/signup/signup.html' //should point to target html file that we want to add <script>,<link>
        }),
        new HtmlWebpackPlugin({ //for each .html file we need new instance of 'HtmlWebpackPlugin'
            filename: 'forget-password.html' , //name of file inside ./dist folder
            inject: true,
            chunks: ['forgetPassword'],
            template: './src/forget-password/forget-password.html' //should point to target html file that we want to add <script>,<link>
        }),
        new HtmlWebpackPlugin({ //for each .html file we need new instance of 'HtmlWebpackPlugin'
            filename: 'basket.html' , //name of file inside ./dist folder
            inject: true,
            chunks: ['basket'],
            template: './src/basket/basket.html' //should point to target html file that we want to add <script>,<link>
        }),
        new HtmlWebpackPlugin({ //for each .html file we need new instance of 'HtmlWebpackPlugin'
            filename: 'edit-profile.html' , //name of file inside ./dist folder
            inject: true,
            chunks: ['editProfile'],
            template: './src/edit-profile/edit-profile.html' //should point to target html file that we want to add <script>,<link>
        }),
        new HtmlWebpackPlugin({ //for each .html file we need new instance of 'HtmlWebpackPlugin'
            filename: 'change-password.html' , //name of file inside ./dist folder
            inject: true,
            chunks: ['changePassword'],
            template: './src/change-password/change-password.html' //should point to target html file that we want to add <script>,<link>
        }),
        new HtmlWebpackPlugin({ //for each .html file we need new instance of 'HtmlWebpackPlugin'
            filename: 'return-request.html' , //name of file inside ./dist folder
            inject: true,
            chunks: ['returnRequest'],
            template: './src/return-request/return-request.html' //should point to target html file that we want to add <script>,<link>
        }),
        new CleanWebpackPlugin()
    ]
};
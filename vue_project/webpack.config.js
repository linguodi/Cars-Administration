const path = require('path');
const {VueLoaderPlugin} = require('vue-loader');  //最新版webpack需要引入插件

module.exports = {
     //程序的入口文件
     entry: "./www/app/main.js",

     //程序的出口（打包的文件）
     output : {
        //打包文件输出的路径
        path : path.resolve(__dirname, "www/dist"),
        //打包文件的名称
        filename : "all.js",
        publicPath:"/public" //这是对webpack-dev-server的配置，配置虚拟路径
     },
     //让webpack监听变化，自动打包
     watch : true,
     mode : "development",
     //配置webpack的模块插件
     module:{
        //关于模块的配置规则
        rules : [
            {
                //模块规则（配置 loader、解析器等选项）
                test : /\.js$/,  //解析的时候匹配到的都是js文件
                include: [
                  path.resolve(__dirname, "www/app")    //翻译什么文件夹
                ],
                exclude: [
                  path.resolve(__dirname, "node_modules") //不翻译什么文件夹
                ],
                loader : "babel-loader",
                options : {
                    presets: ["es2015"],
                    plugins: ["transform-object-rest-spread"]
                }
            },
            {
                test: /\.vue$/,
                include: [
                  path.resolve(__dirname, "www/app")    //翻译什么文件夹
                ],
                exclude: [
                  path.resolve(__dirname, "node_modules") //不翻译什么文件夹
                ],
                loader: 'vue-loader',
                options :{
                    loaders : {
                        stylus:'vue-style-loader!css-loader!stylus-loader'
                    }
                }
            },
            {
                test:/\.css$/,
                use: ['vue-style-loader','css-loader']
            },
            {
                test: /\.styl(us)?$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'stylus-loader'
                ]
            }
        ]
     },
     resolve: {
        alias: { //配置别名
          'vue$': 'vue/dist/vue.esm.js' // 用 webpack 1 时需用 'vue/dist/vue.common.js'
        }
     },
     //最新版webpack需要引入插件
     plugins : [
        new VueLoaderPlugin()
     ],
     devServer :{
        proxy: {
          "/api": {
            target: "http://127.0.0.1:3000", //设置你调用的接口域名和端口
            //这里理解成/api代替target中的地址，后面组件中调用接口要使用/api/代替
            pathRewrite: {"^/api" : "/"}
          }
        }
     }
}
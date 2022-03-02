const path = require('path');//引入模块 作用是可以动态获取文件
const HtmlWebpackPlugin = require('html-webpack-plugin');// 导入HTML打包插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');// 导入css提取为独立外部样式的插件
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
module.exports = {
    optimization: {
        minimizer: [
            new CssMinimizerWebpackPlugin(),
        ],
        minimize: true,
    },
    entry: {
        index: "./src/index.js",
    },
    output: {
        path: path.resolve(__dirname, 'dist'), // 指定打包后的文件夹名称
        filename: './js/[name].js', // bundle名称由chunk名指定   [name]原名称
        clean: true, // 生成文件前清空output目录
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader','postcss-loader']
            },
            {
                test: /\.(png|jpg|gif|svg|jpeg)$/i,
                type: 'asset/resource', // 配置资源asset模板针对的是样式文件引用的外部文件资源
                generator: {
                    filename: 'img/[name][ext]', // [name]:原文件名[hash|contenthash]:hash值[ext]:原文件后缀名
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'font/[name][ext]',
                },
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html', // 生成的文件名
            template: './src/index.html', // 指定打包压缩的文件
            chunks: ['index'], // 指定使用的chunk
        }),
        new MiniCssExtractPlugin({
            filename: './css/[name].css',
        }),
    ],

    mode: 'development',
}

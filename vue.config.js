module.exports = {
    publicPath: '',
    outputDir: 'build',
    assetsDir: 'static',
    //第三方插件找不到就要到这里配置；
    configureWebpack: {
        externals: {
            "md5": "md5"
        }
    },
    devServer: {
        open: true,
        // port: 8088,
        // 配置跨域
        proxy: {
            '/api': {
                target: 'http://47.101.135.0:3000', // 接口的域名
                // secure: false,  // 如果是https接口，需要配置这个参数
                changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
}

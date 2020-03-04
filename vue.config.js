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
                // target: 'http://localhost:3001', // 接口的域名
                target:"http://admin.baiyang.work",
                // secure: false,  // 如果是https接口，需要配置这个参数
                changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
                pathRewrite: {
                    '^/api': ''
					//'^/api': '/' 这种接口配置出来 http://XX.XX.XX.XX:8083/login
                }
            }
        }
    },
}

module.exports = {
    devServer:{
        host:'localhost',
        port:8082,
        proxy:{
            '/api':{
                 /* 目标代理服务器地址 */
                target:'http://www.imooc.com',
                /* //changeOrigin是false：
                 请求头中host仍然是浏览器发送过来的host；
                 如果设置成true：发送请求头中host会设置成target。*/
                changeOrigin:true,
                pathRewrite:{//将api替换为空
                    'api':''
                }
            }
        }
    }
}
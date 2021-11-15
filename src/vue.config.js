module.exports = {
    devServer:{
        host:'localhost',
        port:8082,
        proxy:{
            '/api':{ //在真实url的http://www.imooc.com后面加一个虚拟的端口/api/，然后真正请求的时候把/api置空，再把后面的目标url拼上去，这样就减少了重复代码，否则对于每个端口都要重写该方法
                 /* 目标代理服务器地址 */
                target:'http://www.imooc.com',
                /* //changeOrigin是false：
                 请求头中host仍然是浏览器发送过来的host；
                 如果设置成true：发送请求头中host会设置成target。*/
                changeOrigin:true,
                pathRewrite:{//将api替换为空，实际转发的时候为http://www.imooc.com/activity/servicetime
                    'api':''
                }
            }
        }
    }
}
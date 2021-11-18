module.exports = {
  devServer:{
    host:'localhost',
    port:8080,
    proxy:{
      //接口代理
      '/api':{//虚拟接口地址,方便统一管理
        target:'http://mall-pre.springboot.cn',//真实接口地址
        changeOrigin:true,
        pathRewrite:{
          '/api':''
        }
      }
    }
  },
  // publicPath:'/app',
  // outputDir:'dist',
  // indexPath:'index2.html',
  // lintOnSave:false,
  productionSourceMap:true,
  chainWebpack:(config)=>{
    config.plugins.delete('prefetch');
  }
}
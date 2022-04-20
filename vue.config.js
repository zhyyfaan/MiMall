// vue-cli配置参考：https://cli.vuejs.org/zh/config/
module.exports = {
  devServer:{//https://cli.vuejs.org/zh/config/#devserver  ???
    host:'localhost',
    port:8080,
    proxy:{
      //接口代理
      '/api':{//虚拟接口地址,方便统一管理，请求的时候使用的我们的代理的apis来作为前缀。 
        target:'http://mall-pre.springboot.cn',//需要请求的网址的公共部分
        changeOrigin:true,//开启代理：在本地会创建一个虚假服务器，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端就可以进行数据的交互。
        pathRewrite:{
          '/api':''//重写路径
        }
      }
    }
  },
  // publicPath:'/app', //跟路径标准的是/，现在是变成/app/
  // outputDir:'dist', //打包输出的文件夹地址
  // indexPath:'index2.html', //单页面项目的入口文件在打包后会变成index2.html
  // lintOnSave:false, //是否在开发环境下通过 eslint-loader 在每次保存时 lint（检查错误） 代码，建议为true。设置为 true 或 'warning' 时，eslint-loader 会将 lint 错误输出为编译警告。
  productionSourceMap:false,//设为false则打包后不会生成js.map，这样更加的安全，别人在网页检查的时候无法查看我们写的js文件，且打包后体积更小；设为true是开发时方便调试
  chainWebpack:(config)=>{
    config.plugins.delete('prefetch');//删除文件预加载prefetch，防止不需要的文件被预加载进来，优化性能
  }
}
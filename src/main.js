/*
该文件是整个项目的入口文件，在运行npm run serve后第一个运行main.js
 */
import Vue from 'vue'
import router from './router'//引入路由器：自己写的
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyLoad from 'vue-lazyload'
import VueCookie from 'vue-cookie'
import { Message } from 'element-ui' //按需引入element ui的插件
import 'element-ui/lib/theme-chalk/index.css'//引入element ui的样式
import store from './store' //引入store配置项，默认选择index.js文件

//引入App组件，他是所有组件的父组件
import App from './App.vue'

// import env from './env' ：使用jsonp或者coars跨域需要使用，本项目使用借口代理跨域
// mock开关
const mock = false;
if(mock){
  require('./mock/api');
}
// 接口代理的方式实现跨域，配合vur.config.js实现，根据前端的跨域方式做调整 /a/b : /api/a/b => /a/b
// axios.defaults.baseURL = 'https://www.easy-mock.com/mock/5dc7afee2b69d9223b633cbb/mimall';
axios.defaults.baseURL = '/api';
axios.defaults.timeout = 8000; 
// 根据环境变量获取不同的请求地址
// axios.defaults.baseURL = env.baseURL;
// 接口错误拦截
axios.interceptors.response.use(function(response){  
  //对返回的业务错误（状态码是200是对的）进行拦截，不对请求（request）的错误进行拦截
  let res = response.data;  //接口错误返回的值
  let path = location.hash;  //获取哈西路由，可以再当前页面命令行看这个的值，就知道当前页面哈西路由是什么
  if(res.status == 0){  //代表成功
    return res.data;
  }else if(res.status == 10){  //未登录的错误码，程序员自定义
    if (path != '#/index'){  //在首页的话刷新一下就不用跳转了，在其他页面才需要进行跳转
      window.location.href = '/#/login';   //不能在main.js里面用路由去跳，路由是挂在vue实例上面的，这里只能使用哈希路由
    }
    return Promise.reject(res);//未登录就算异常，要reject，否则会正常进入成功返回的代码
  }else{
    Message.warning(res.msg);//使用element ui的message代替alert：会在命令行报错并显示出错状态和消息内容：{status:1,msg:'密码错误'}，不使用这个就只会报错，不显示状态码和消息内容
    return Promise.reject(res); //这样抛出异常后，就不会正常进入登录后的页面，一定得写
  }
},(error)=>{
  //http状态码错误（发送请求失败，服务器问题，非业务问题）
  let res = error.response;
  Message.error(res.data.message);
  return Promise.reject(error);
});

Vue.use(VueAxios,axios);
Vue.use(VueCookie);
Vue.use(VueLazyLoad,{
  // 图片加载时的一个动画，是矢量图，不会失真
  loading:'/imgs/loading-svg/loading-bars.svg'
})
Vue.prototype.$message = Message;//扩展对象，可以使用对象的方式来使用message方法，不用每次都import
//关闭vue的生产提示
Vue.config.productionTip = false

new Vue({
  store, //前提是import store和vue.use(vuex),这样一来所有组件实例对象和VM都可以使用$store
  router,
  //完成的功能：将App组件放入容器
  render: h => h(App),
}).$mount('#app')

/*
该文件是整个项目的入口文件，在运行npm run serve后第一个运行main.js
 */
import Vue from 'vue'
import router from './router'//引入路由器：自己写的
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyLoad from 'vue-lazyload'
import VueCookie from 'vue-cookie'
import { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'

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
axios.interceptors.response.use(function(response){  //对返回的错误进行拦截，不对请求（request）的错误进行拦截
  let res = response.data;  //接口错误返回的值
  let path = location.hash;  
  if(res.status == 0){  //代表成功
    return res.data;
  }else if(res.status == 10){  //未登录的错误码，程序员自定义
    if (path != '#/index'){
      window.location.href = '/#/login';   //不能在main.js里面用路由去跳，路由是挂在vue实例上面的，这里只能使用哈希路由
    }
    return Promise.reject(res);
  }else{
    Message.warning(res.msg);
    return Promise.reject(res);
  }
},(error)=>{
  let res = error.response;
  Message.error(res.data.message);
  return Promise.reject(error);
});

Vue.use(VueAxios,axios);
Vue.use(VueCookie);
Vue.use(VueLazyLoad,{
  loading:'/imgs/loading-svg/loading-bars.svg'
})
Vue.prototype.$message = Message;
//关闭vue的生产提示
Vue.config.productionTip = false

new Vue({
  store,
  router,
  //完成的功能：将App组件放入容器
  render: h => h(App),
}).$mount('#app')

import Vue from 'vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyLoad from 'vue-lazyload'
import VueCookie from 'vue-cookie'
import { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import App from './App.vue'
// import env from './env' ：使用jsonp或者coars跨域需要使用，本项目使用借口代理跨域
// mock开关,用在mockjs方法中，只有设置为true才有效  4-11
const mock = false;
if(mock){
  require('./mock/api');
}
//easy mock项目URL，可以自己创建项目后复制过来，项目可以设置接口，这个URL可以改成真实后台对接的地址  4-12
axios.defaults.baseURL = '  https://mock.mengxuegu.com/mock/61938b29f126df7bfd5b7d19/mimall';
// 接口代理的方式实现跨域，配合vue.config.js实现，根据前端的跨域方式做调整 /a/b : /api/a/b => /a/b 
// axios.defaults.baseURL = '/api';
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
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')

import Vue from 'vue'
import Router from 'vue-router'//vue-router是一个插件库，专门用来实现单页面yingyong（SPA）开发
import Home from './pages/home'
import Index from './pages/index'
//Vue.use(插件名) 表示使用插件
Vue.use(Router); 

export default new Router({
  //mode:'history',  默认是哈希模式，但也可以改成history模式
  routes:[
    { //一级路由，path里面要加斜杠，且不能写成./
      path:'/',
      name:'home',
      component:Home,
      redirect:'/index',
      children:[
        {  //二级路由，path里面可以不加斜杠
          path: '/index',
          name: 'index',
          component: Index,
        }, {
          path: '/product/:id', // /:id是占位符，表示带的参数params，不是三级路由，使用占位符接受params参数， 在组件中可以使用&route.params.id来获得数值
          name: 'product',
          //路由懒加载实现路由的按需加载：https://router.vuejs.org/zh/guide/advanced/lazy-loading.html
          component: () => import('./pages/product.vue')
        }, {
          path: '/detail/:id',
          name: 'detail',
          component: () => import('./pages/detail.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./pages/login.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('./pages/cart.vue')
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('./pages/order.vue'),
      children:[
        {
          path: 'list',
          name: 'order-list',
          component: () => import('./pages/orderList.vue')
        },
        {
          path: 'confirm',
          name: 'order-confirm',
          component: () => import('./pages/orderConfirm.vue')
        },
        {
          path: 'pay',
          name: 'order-pay',
          component: () => import('./pages/orderPay.vue')
        },
        {
          path: 'alipay',
          name: 'alipay',
          component: () => import('./pages/alipay.vue')
        }
      ]
    }
  ]
});
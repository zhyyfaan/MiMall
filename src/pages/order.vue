// 订单的父页面，用于单页面路由跳转渲染订单列表、订单确认、订单支付、支付宝支付等多个子页面
<template>
  <div>
    <!-- 路由跳转并渲染子组件页面，包括/order/list,/order/confirm,/order/pay,/order/alipay -->
    <!-- <router-view>在组件中放的位置，就是当前组件路由的子组件内容的输出位置，比如组件a中使用了router-view，组件a对应路由为“/a”,子路由为":id",对应子组件为aa,当组件a内部要进行路由跳转"/a/:id",那么组件aa的内容显示的位置为router-view标签的位置；
    当组件a内部要进行路由跳转“/b”,那么此时b组件对应内容的输出位置就不再是router-view标签的位置，而是新开页面 -->
    <router-view></router-view>
    <service-bar></service-bar>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
  import ServiceBar from './../components/ServiceBar'
  import NavFooter from './../components/NavFooter'
  export default{
    name:'order',
    data(){
      return {
        title:'',
        tip:''
      }
    },
    components:{
      ServiceBar,
      NavFooter
    }
  }
</script>
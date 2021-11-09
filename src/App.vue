<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
// import axios from 'axios'
import jsonp from 'jsonp'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data(){
    return {
      age:45
    }
  },
  mounted(){
    let url = "/api/activity/servicetime";
    // axios.get(url).then(()=>{

    // })
    jsonp(url,(err,res)=>{  //不是请求，只是一个js函数(请求不允许跨域访问的网站，用axios会报错，jsonp不会),参数为(url请求地址，(错误信息，返回结果))
      let result = res;
      this.data=result;
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;  
}
</style>

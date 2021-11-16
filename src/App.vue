<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import storage from './storage/index'
export default {
  name: 'app',
  components: {
    
  },
  data(){
    return {
      res:{}
    }
  },
  mounted(){
    //测试storage
    // storage.setItem('a',1);
    // storage.setItem('user',{a:1});
    // storage.setItem('abc',{age:1},'user');
    // storage.clear('a');
    // storage.clear('age','user');

    // this.axios.get('/proxy').then((res) =>{
    //   this.res = res;
    // });
    
    //本地集成mockjs实现数据mock
    this.axios.get('/user/login').then((res) =>{
      this.res = res;
    });

    if(this.$cookie.get('userId')){
      this.getUser();
      this.getCartCount();
    }
  },
  methods:{
    getUser(){
      this.axios.get('/user').then((res={})=>{
        this.$store.dispatch('saveUserName',res.username);
      })
    },
    getCartCount(){
      this.axios.get('/carts/products/sum').then((res=0)=>{
        this.$store.dispatch('saveCartCount',res);
      })
    }
  }
}
</script>

<style lang="scss">
@import './assets/scss/reset.scss';
@import './assets/scss/config.scss';
@import './assets/scss/button.scss';
</style>

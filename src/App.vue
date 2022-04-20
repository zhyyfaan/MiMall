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
    // this.axios.get('/mock/api.js').then((res) =>{
    //   this.res = res;
    // });
    
    if(this.$cookie.get('userId')){//这里要加个判断条件，在登录前不需要获取用户名和购物车数量，这样会造成资源浪费，仅在登录后再获取（userid过期时间和后端session一致，当浏览器进程关闭（不是关掉标签页，是整个浏览器关闭）时就过期了，无法获取，需要重新登录）
      //在入口处获取用户信息和购物车数量，这样每次刷新后，用户信息都还在
      this.getUser();
      this.getCartCount();
    }
  },
  methods:{
    getUser(){//获取用户信息
      this.axios.get('/user').then((res={})=>{//res要给一个默认值object，否则当未登录的时候res是undefined会报错
        this.$store.dispatch('saveUserName',res.username);  //保存到vueX里面，调用store.dispatch进入actions.js文件找到saveUserName方法
      })
    },
    getCartCount(){//获取购物车中商品数量，查看门户_购物车接口.md第7条
      this.axios.get('/carts/products/sum').then((res=0)=>{//res要给一个默认值0，显示购物车(0),否则当未登录的时候res是undefined会报错
        this.$store.dispatch('saveCartCount',res); //返回的res里面的data就只有一个数值，表示购物车数量
      })
    }
  }
}
</script>

<style lang="scss">
@import './assets/scss/reset.scss';  // @import导入scss文件
@import './assets/scss/config.scss';
@import './assets/scss/button.scss';
</style>

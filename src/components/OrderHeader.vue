<template>
  <div class="order-header">
    <!-- clearfix清除浮动，如果不写的话因为内部元素都使用了浮动，会导致父元素container高度坍塌 -->
    <div class="container clearfix">
      <div class="header-logo">
        <a href="/#/index"></a>
      </div>
      <div class="title">
        <!-- title是动态的，根据外部传入的title参数决定显示，slot定义插槽（相当于挖一个坑，告诉这个组件使用者往这里填东西） -->
        <h2>{{title}}<slot name="tip"></slot></h2>
      </div>
      <div class="username">
        <a href="javascript:;">{{username}}</a>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  export default{
    name:'order-header',
    props:{//接收外部参数title
      title:String
    },
    computed:{
      ...mapState(['username'])
      /* mapState等价于下面的写法：用于获取state里面的数据，...是es6里面的展开运算符
      意思是将vuex中的username 数据映射到组件的computed属性里
      username(){
        return this.$store.state.username
      }*/
    },
  }
</script>
<style lang="scss">
  .order-header{
    padding:30px 0;
    border-bottom:2px solid #FF6600;
    .header-logo{
      float:left;
    }
    .title,.username{
      // display:inline-block与浮动的比较：https://www.cnblogs.com/Ry-yuan/p/6848197.html
      display:inline-block;//行内块级元素，可以与其他元素共享一行
      height:55px;
      line-height:55px;
    }
    .title{
      float:left;
      margin-left:54px;
      h2{
        font-size:28px;
        color:#333333;
      }
      span{
        font-size:14px;
        margin-left:17px;
        color:#999999;
        font-weight:200;
      }
    }
    .username{
      float:right;
      a{
        color:#666666;
        font-size:16px;
      }
    }
  }
</style>
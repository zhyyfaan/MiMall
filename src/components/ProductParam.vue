<template>
<!-- 动态绑定isfixed样式，通过js isfixed变量来确定css isfixed样式是否绑定 -->
  <div class="nav-bar" :class="{'is_fixed':isFixed}">
    <div class="container">
      <div class="pro-title">
        {{title}}
      </div>
      <div class="pro-param">
        <a href="javascript:;">概述</a><span>|</span>
        <a href="javascript:;">参数</a><span>|</span>
        <a href="javascript:;">用户评价</a>
        <slot name="buy"></slot>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    name:'nav-bar',
    props:{//从父组件接收参数title
      title:String
    },
    data(){
      return {
        isFixed:false//是否需要固定定位，用于实现吸顶
      }
    },
    mounted(){
      //为了实现鼠标滚动后，该组件扔吸顶，在这里监听滚动事件
      window.addEventListener('scroll',this.initHeight)//事件的名称，方法
    },
    methods:{
      initHeight(){
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;//获取浏览器滚动条高度（考虑不同浏览器兼容性）
        this.isFixed = scrollTop > 152? true:false;//原本显示在该组件上方的内容高度为152，滚动不超过152时不需要吸顶
      }
    },
    destroyed(){//页面销毁时要把这个事件去掉，否则的话会浪费资源
      //因此上面addEventListener的时候里面的initHeight方法不能直接用一个无名function写好，会导致无法销毁
      window.removeEventListener('scroll',this.initHeight,false)//true表示捕获销毁，false表示冒泡销毁（全部销毁）
    }
  }
</script>
<style lang="scss">
  @import './../assets/scss/config.scss';
  @import './../assets/scss/mixin.scss';
  .nav-bar{
    height:70px;
    line-height:70px;
    border-top:1px solid $colorH;
    background-color:$colorG;
    z-index:10;
    &.is_fixed{
      // 1.固定定位的盒子必须有宽度
      //   也就是必须设置width，如果没有设置宽度，那么该盒子的宽度就是内容撑开的宽度，如果没有内容那么会默认为0，
      //   从而无法在页面上看到。由于固定定位一般用于导航栏吸顶效果，所以必须给它设置合适的版心宽度。
      // 2.固定定位的盒子跟父级盒子无关，它是以屏幕为准
      position:fixed;//固定定位
      top:0;
      width:100%; //必须要控制宽度使其撑满浏览器，否则无法正常显示
      box-shadow: 0 5px 5px $colorE;
    }
    .container{
      @include flex();
      .pro-title{
        font-size:$fontH;
        color:$colorB;
        font-weight:bold;
      }
      .pro-param{
        font-size:$fontJ;
        span{
          margin:0 10px;
        }
        a{
          color:$colorC;
        }
      }
    }
  }
</style>
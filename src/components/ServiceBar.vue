<template>
  <div class="service">
    <div class="container">
      <ul>
        <li><span class="icon-setting"></span>预约维修服务</li>
        <li><span class="icon-7day"></span>7天无理由退货</li>
        <li><span class="icon-15day"></span>15天免费换货</li>
        <li><span class="icon-post"></span>满150元包邮</li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default{
    name:'service-bar'
  }
</script>
<style lang="scss">
  @import './../assets/scss/mixin.scss';
  .service{
    padding:33px 0;
    color:#666666;
    font-size:16px;
    li{
      display:inline-block;
      width:24.9%; //其实是25%的意思，但是由于浏览器有差异，25不一定是25，所以就宁愿少点
      text-align:center;
      border-right:1px solid #E5E5E5;
      span{
        display:inline-block;
        width:20px;
        height:20px;
        vertical-align: middle; //vertical-align属性设置元素的垂直对齐方式,可用于设置图片垂直居中，这样图片和文字才能对齐
        margin-right:8px;
      }
      .icon-setting{
        @include bgImg(20px,20px,'/imgs/icon-setting.png');
      }
      .icon-7day{
        @include bgImg(20px,20px,'/imgs/icon-7day.png');
      }
      .icon-15day{
        @include bgImg(20px,20px,'/imgs/icon-15day.png');
      }
      .icon-post{
        @include bgImg(20px,20px,'/imgs/icon-post.png');
      }
    }

  }
</style>
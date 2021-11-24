// 实现模态框组件即弹窗
<template>
<!-- 设置下滑的动画 -->
  <transition name="slide">
    <!-- v-show控制动画 -->
    <div class="modal" v-show="showModal">
      <!-- 遮罩层 -->
      <div class="mask"></div>
      <!-- 弹框 -->
      <div class="modal-dialog">
        <div class="modal-header">
          <span>{{title}}</span>
          <!-- 关闭弹窗 -->
          <a href="javascript:;" class="icon-close" v-on:click="$emit('cancel')"></a>
        </div>
        <div class="modal-body">
          <!-- 定义插槽 -->
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
          <!-- 子组件级向父组件传递事件是&emit(自定义事件)，表示点击子组件时会调用父组件自定义的submit函数，即index.vue第112行v-on:submit="goToCart"，这里父组件自定义的submit是第258行的gotocart函数 -->
          <a href="javascript:;" class="btn" v-if="btnType==1" v-on:click="$emit('submit')">{{sureText}}</a>
          <a href="javascript:;" class="btn" v-if="btnType==2" v-on:click="$emit('cancel')">{{cancelText}}</a>
          <div class="btn-group" v-if="btnType==3">
            <a href="javascript:;" class="btn" v-on:click="$emit('submit')">{{sureText}}</a>
            <a href="javascript:;" class="btn btn-default" v-on:click="$emit('cancel')">{{cancelText}}</a>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  export default{
    name:'modal',
    props:{
      // 弹框类型：小small、中middle、大large、表单form
      modalType:{
        type:String,
        default:'form'
      },
      // 弹框标题
      title:String,
      // 按钮类型: 1:确定按钮 2：取消按钮 3：确定取消按钮都有
      btnType:String,
      // 确定按钮的文本
      sureText:{
        type:String,
        default:'确定'
      },
      // 取消按钮的文本
      cancelText:{
        type:String,
        default:'取消'
      },
      // 是否要展示弹框，用于动画控制
      showModal:Boolean
    }
  }
</script>
<style lang="scss">
@import './../assets/scss/config.scss';
@import './../assets/scss/mixin.scss';
@import './../assets/scss/modal.scss';
</style>
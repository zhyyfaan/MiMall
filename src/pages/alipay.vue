// 支付宝跳转的中间界面
<template>
  <div class="ali-pay">
    <!-- 等待的时候有一个动画界面，loading组件 -->
    <loading v-if="loading"></loading>
    <div class="form" v-html="content"></div>
  </div>
</template>
<script>
  import Loading from './../components/Loading'
  export default{
    name:'alipay',
    components:{
      Loading
    },
    data(){
      return {
        orderId:this.$route.query.orderId,
        content:'',
        loading:true
      }
    },
    mounted(){
      this.paySubmit();
    },
    methods:{
      paySubmit(){
        // 查看支付接口
        this.axios.post('/pay',{
          orderId:this.orderId,
          orderName:'Vue高仿小米商城',
          amount:0.01,//单位元
          payType:1 //1支付宝，2微信
        }).then((res)=>{
        /* 接口返回的内容即要渲染的content内容是一个表单（支付宝吐给前端的）："<form id='bestPayForm' name=\"punchout_form\" method=\"post\" action="..."（后面的省略）,自带一些签名提高安全级别，前端进行渲染*/ 
          this.content = res.content;//支付宝支付：返回的content是html源码，渲染到页面上后自动跳转到支付页面
          setTimeout(()=>{//渲染支付宝跳转html代码的时间
          // document.forms语法 : https://blog.csdn.net/qq_42651904/article/details/88745663
            document.forms[0].submit();//js语法获取getelementbyid：获取到的第一个表单，通过submit进行提交，就会自动跳转到支付宝的扫码界面
          },100)
        })
      }
    }
  }
</script>
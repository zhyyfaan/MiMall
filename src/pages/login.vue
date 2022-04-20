<template>
  <div class="login">
    <div class="container">
      <a href="/#/index"><img src="/imgs/login-logo.png" alt=""></a>
    </div>
    <div class="wrapper">
      <div class="container">
        <div class="login-form">
          <h3>
            <span class="checked">帐号登录</span><span class="sep-line">|</span><span>扫码登录</span>
          </h3>
          <div class="input">
            <input type="text" placeholder="请输入帐号" v-model="username">
          </div>
          <div class="input">
            <input type="password" placeholder="请输入密码" v-model="password">
          </div>
          <div class="btn-box">
            <!-- @click绑定登录事件 -->
            <a href="javascript:;" class="btn" @click="login">登录</a>   
          </div>
          <div class="tips">
            <!-- @click绑定注册事件 -->
            <div class="sms" @click="register">手机短信登录/注册</div>
            <div class="reg">立即注册<span>|</span>忘记密码？</div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-link">
        <a href="https://www.imooc.com/u/1343480" target="_blank">河畔一角主页</a><span>|</span>
        <a href="https://coding.imooc.com/class/113.html" target="_blank">Vue全栈课程</a><span>|</span>
        <a href="https://coding.imooc.com/class/236.html" target="_blank">React全家桶课程</a><span>|</span>
        <a href="https://coding.imooc.com/class/343.html" target="_blank">微信支付专项课程（H5+小程序/云+Node+MongoDB）</a>
      </div>
      <p class="copyright">Copyright ©2019 mi.futurefe.com All Rights Reserved.</p>
    </div>
  </div>
</template>
<script> 
import { mapActions } from 'vuex';
export default {
  name: 'login',
  data(){ //不能直接传对象，要传返回值
    return {
      username:'', //默认为空
      password:'', //默认为空
      userId:''  //前后端分离，后端不知道前端是谁，只能通过userid来识别
    } 
  },
  methods:{
    // 登录
    login(){
      let { username,password } = this; //解构：相当于username = this.username, password = this.password
      // 调接口：看门户_用户接口.md 第6行可知：方法是post， 地址是/user/login
      // 把前端输入的登录信息传给后端
      this.axios.post('/user/login',{ //this.axios.post('url',data) 门户_用户接口.md 第11行可知，参数是username和password
        username, //key 和 value一样的时候可以简写，等价于username:username
        password
      }).then((res)=>{ //res返回的是结果，即门户_用户接口.md 第28行data里面的东西，res.id返回的是data里面的id不是整个cookie的id
        this.$cookie.set('userId',res.id,{expires:'Session'});//将用户信息保存在cookie中,vue-cookie详细语法：https://www.npmjs.com/package/vue-cookie，expires设置cookie过期时间，设置为Session，则和后端的会话Session在同一个时间过期（后端session在浏览器进程关闭后就结束了，需要重新登录）
        // this.$store.dispatch('saveUserName',res.username);
        this.saveUserName(res.username);//保存用户姓名
        //this.$router可以拿到路由器，整个应用只有一个router，通过组件的$router获取，每个组件有自己的￥route属性，保存自己的路由信息
        this.$router.push({ //push实现编程式路由跳转，push是指在历史纪录中推入下一个路由，replace是取代栈顶路由
          //query和param传参区别：https://blog.csdn.net/mf_717714/article/details/81945218
          name:'index',//指定页面，如果是query的话，这里是path:'/index'
          params:{//传递数据内容
            from:'login'
          }
        });
      })
    },
    ...mapActions(['saveUserName']), //...的意思是把mapActions中的每组key value都展开了写;['saveUserName']即等价于 'saveUserName':'saveUserName'
    register(){
      this.axios.post('/user/register',{
        username:'admin1',
        password:'admin1',
        email:'admin1@163.com'
      }).then(()=>{
        this.$message.success('注册成功'); //element-UI提示注册成功，代替alert
      })
    }
  }
}
</script>
<style lang="scss">
.login{
  &>.container{
    height:113px;
    img{
      width:auto;
      height:100%;
    }
  }
  .wrapper{
    background:url('/imgs/login-bg.jpg') no-repeat center;
    .container{
      height:576px;
      .login-form{
        box-sizing: border-box;
        padding-left: 31px;
        padding-right: 31px;
        width:410px;
        height:510px;
        background-color:#ffffff;
        position:absolute;
        bottom:29px;
        right:0;
        h3{
          line-height:23px;
          font-size:24px;
          text-align:center;
          margin:40px auto 49px;
          .checked{
            color:#FF6600;
          }
          .sep-line{
            margin:0 32px;
          }
        }
        .input{
          display:inline-block;
          width:348px;
          height:50px;
          border:1px solid #E5E5E5;
          margin-bottom:20px;
          input{
            width: 100%;
            height: 100%;
            border: none;
            padding: 18px;
          }
        }
        .btn{
          width:100%;
          line-height:50px;
          margin-top:10px;
          font-size:16px;
        }
        .tips{
          margin-top:14px;
          display:flex;
          justify-content:space-between;
          font-size:14px;
          cursor:pointer;
          .sms{
            color:#FF6600;
          }
          .reg{
            color:#999999;
            span{
              margin:0 7px;
            }
          }
        }
      }
    }
  }
  .footer{
    height:100px;
    padding-top:60px;
    color:#999999;
    font-size:16px;
    text-align:center;
    .footer-link{
      a{
        color:#999999;
        display:inline-block;
      }
      span{
        margin:0 10px;
      }
    }
    .copyright{
      margin-top:13px;
    }
  }
}
</style>
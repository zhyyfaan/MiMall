<template>
  <div class="header">
    <div class="nav-topbar">
      <div class="container">
        <div class="topbar-menu"><!--  页面不刷新 -->
          <a href="javascript:;">小米商城</a> 
          <a href="javascript:;">MUI</a>
          <a href="javascript:;">云服务</a>
          <a href="javascript:;">协议规则</a>
        </div>
        <div class="topbar-user">
          <!-- 下面加v-if：如果user-name是true的话就显示username否则显示登录 -->
          <a href="javascript:;" v-if="username">{{username}}</a>
           <!-- 点击后完成单页面路由跳转 -->
          <a href="javascript:;" v-if="!username" @click="login">登录</a>
          <a href="javascript:;" v-if="username" @click="logout">退出</a>
          <a href="/#/order/list" v-if="username">我的订单</a>
          <a href="javascript:;" class="my-cart" @click="goToCart"><span class="icon-cart"></span>购物车({{cartCount}})</a>
        </div>
      </div>
    </div>
    <div class="nav-header">
      <div class="container">
        <div class="header-logo">
          <a href="/#/index"></a>
        </div>
        <div class="header-menu">
          <div class="item-menu">
            <span>小米手机</span>
            <div class="children">
              <ul>
                <!-- 为啥下面只有一个li标签？
                因为他根据源数据多次渲染元素或模板块，下面的li给出的是一个模板li，数据是从后端接口中动态获取的
                为啥用：key？
                因为在用v-for更新已渲染的元素列表的时候，会使用就地复用的策略；这就是说列表数据修改的时候，他会根据key值去判断某个值是否修改，如果修改了就重新渲染，不然就复用之前的元素。
                总结一下，就是通过key值来提升渲染的效率。 -->
                <li class="product" v-for="(item,index) in phoneList" :key="index">
                  <!-- target="_blank"打开新标签页 -->
                  <!-- 产品的路径要拼接产品的ID。因此要用v-bind，“”里面必须是js表达式，因此要拼接字符串的话，还要加‘’ -->
                  <a v-bind:href="'/#/product/'+item.id" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="item.mainImage" :alt="item.subtitle">
                    </div>
                    <div class="pro-name">{{item.name}}</div>
                    <!-- 使用过滤器对金额进行规范 -->
                    <div class="pro-price">{{item.price | currency}}</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="item-menu">
            <span>RedMi红米</span>
          </div>
          <div class="item-menu">
            <span>电视</span>
            <div class="children">
              <ul>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-1.jpg'" alt="">
                    </div>
                    <div class="pro-name">小米壁画电视 65英寸</div>
                    <div class="pro-price">6999元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-2.jpg'" alt="">
                    </div>
                    <div class="pro-name">小米全面屏电视E55A</div>
                    <div class="pro-price">1999元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-3.png'" alt="">
                    </div>
                    <div class="pro-name">小米电视4A 32英寸</div>
                    <div class="pro-price">699元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-4.jpg'" alt="">
                    </div>
                    <div class="pro-name">小米电视4A 55英寸</div>
                    <div class="pro-price">1799元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-5.jpg'" alt="">
                    </div>
                    <div class="pro-name">小米电视4A 65英寸</div>
                    <div class="pro-price">2699元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-6.png'" alt="">
                    </div>
                    <div class="pro-name">查看全部</div>
                    <div class="pro-price">查看全部</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="header-search">
          <div class="wrapper">
            <input type="text" name="keyword">
            <a href="javascript:;"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  export default{
    name:'nav-header',
    data(){
      return {
        username:'', //登录用户的默认值为空，如果有值的话，则首页看不到登录按钮，直接显示用户名
        phoneList:[]
      }
    },
    computed:{
      /*username(){
        return this.$store.state.username;
      },
      cartCount(){
        return this.$store.state.cartCount;
      }*/
      ...mapState(['username','cartCount'])
    },
    filters:{ //定义过滤器，处理产品接口传回来的产品价格，过滤器一般用在金额、日期的规范化
      currency(val){
        if(!val)return '0.00';
        return '￥' + val.toFixed(2) + '元';
      }
    },
    mounted(){
      this.getProductList(); //调用methods里面的方法
      let params = this.$route.params; //取出路由的参数
      if(params && params.from == 'login'){
        this.getCartCount();
      }
    },
    methods:{
      login(){
        this.$router.push('/login');//路由跳转
      },
      getProductList(){
        this.axios.get('/products',{  //接口名称，要通过vue.config.js进行接口代理
          params:{
            categoryId:'100012',
            pageSize:6 //一页查6条
          }
        }).then((res)=>{ //res只包含data不包含status
          this.phoneList = res.list;
        })
      },
      getCartCount(){
        this.axios.get('/carts/products/sum').then((res=0)=>{
          this.$store.dispatch('saveCartCount',res);
        })
      },
      logout(){
        this.axios.post('/user/logout').then(()=>{
          this.$message.success('退出成功');
          this.$cookie.set('userId','',{expires:'-1'});
          this.$store.dispatch('saveUserName','');
          this.$store.dispatch('saveCartCount','0');
        })
      },
      goToCart(){
        this.$router.push('/cart');//路由跳转
      }
    }
  }
</script>
// 定义style模板语法为scss
<style lang="scss">
  @import './../assets/scss/base.scss';
  @import './../assets/scss/mixin.scss';
  @import './../assets/scss/config.scss';
  .header{
    .nav-topbar{
      height:39px;
      line-height:39px;
      background-color:#333333;
      color:#B0B0B0;
      .container{
        //服用flex布局：mixin.scss中定义，flex样式为topbar-menu和topbar-user两端对齐
        @include flex();
        a{
          // 设置为行内块级元素，可以与其他元素同行排列，且能调整宽高等：https://www.cnblogs.com/Ry-yuan/p/6848197.html
          display:inline-block;
          color:#B0B0B0;
          margin-right:17px;
        }
        .my-cart{
          width:110px;
          background-color:#FF6600;
          text-align:center;
          color:#ffffff;
          margin-right:0;
          .icon-cart{
            @include bgImg(16px,12px,'/imgs/icon-cart-checked.png');//传值的时候不要忘记单位如px
            margin-right:4px;
          }
        }
      }
    }
    .nav-header{
      .container{
        position:relative;
        height:112px;
        @include flex();
        //mi logo的css定义在base.css的.header-logo里面了:其中用到了:before,:after
        .header-menu{
          display:inline-block;
          width:643px;
          padding-left:209px;
          .item-menu{
            display:inline-block;
            color:#333333;
            font-weight:bold;
            font-size:16px;
            line-height:112px;
            margin-right:20px;
            span{
              cursor:pointer;  //鼠标是小手状
            }
            &:hover{
              color:$colorA;  //config.scss中定义，可以用来同意修改系统主题色
              .children{  //高度展开，可以实现隐藏后出现的功能
                height:220px;
                opacity:1;
              }
            }
            .children{
              //这里加绝对定位，要相对于container，因此container要加一个相对定位
              position:absolute;
              //绝对定位的元素的位置相对于最近的已定位祖先元素，如果元素没有已定位的祖先元素，那么它的位置相对于最初的包含块。
              top:112px;
              left:0;
              width:1226px;
              height:0;
              opacity:0;
              // 给一个元素中设置overflow:hidden，那么该元素的内容若超出了给定的宽度和高度属性，那么超出的部分将会被隐藏，不占位。
              // 如果不这么设置的话。鼠标滑到下面children就会出现，而这里要求仅当滑过上面的menu时才出现
              overflow:hidden;
              border-top:1px solid #E5E5E5;
              box-shadow:0px 7px 6px 0px rgba(0, 0, 0, 0.11);
              z-index: 10;  //设置元素的层叠顺序，不设置的话默认和父元素同级，这里比父元素大，所以在顶层
              transition:all .5s; //all：所有属性都有动画
              background-color: #ffffff;
              .product{
                position:relative;
                float:left;
                //总共6个产品 100%/6=16.6%
                width:16.6%;  
                height:220px;
                font-size:12px;
                line-height:12px;
                text-align: center;
                a{
                  // a里面潜逃了div，所以要设置为行内块级元素，否则a撑不开，高度只有0
                  display:inline-block;
                }
                img{
                  // 图片宽高不要同时定义，定一个，另一个自适应
                  width:auto;
                  height:111px;
                  margin-top:26px;
                }
                .pro-img{
                  height:137px;
                }
                .pro-name{
                  font-weight:bold;
                  margin-top:19px;
                  margin-bottom:8px;
                  color:$colorB ;
                }
                .pro-price{
                  color:$colorA;
                }
                //价格伪类，实现不同产品间的分割线，因为分割线很短，所以不能用边框线替代
                &:before{
                  content:' ';
                  //相对于product的绝对定位，product要变成相对定位
                  position:absolute;
                  top:28px;
                  right:0;
                  border-left:1px solid $colorF;
                  height:100px;
                  width:1px;
                }
                &:last-child:before{
                  display:none;  //最后一条竖线不要
                }
              }
            }
          }
        }
        .header-search{
          width:319px;
          .wrapper{
            //搜索框高度
            height:50px;
            border:1px solid #E0E0E0;
            display:flex;
            //搜索框和搜索图标垂直居中
            align-items:center;
            input{
              //取消输入框的border样式
              border:none;
              // 你设置的边框和内边距的值是包含在width内的。也就是说，如果你将一个元素的width设为100px,
              // 那么这100px会包含其它的border和padding，内容区的实际宽度会是width减去border + padding的计算值。
              box-sizing: border-box;
              //搜索框的右边界用的是inpot的有边框
              border-right:1px solid #E0E0E0;
              width:264px;
              height:50px;
              //设置输入的光标位置，不要贴着边框 
              padding-left:14px;
            }
            a{
              @include bgImg(18px,18px,'/imgs/icon-search.png');
              margin-left:17px;
            }
          }
        }
      }
    }
  }
</style>
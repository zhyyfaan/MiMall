// 首页
<template>
  <div class="index">
    <!-- 容器 -->
    <div class="container"> 
      <!-- 轮播图 -->
      <div class="swiper-box">
        <!-- 导航菜单 -->
        <div class="nav-menu">
          <ul class="menu-wrap">
            <li class="menu-item">
              <!-- 导航栏点击,右侧出现面板,但不跳转 -->
              <a href="javascript:;">手机 电话卡</a>
              <div class="children">
                <!-- 2层for循环：6行4列 ，记得绑定key-->
                <ul v-for="(item,i) in menuList" v-bind:key="i">
                  <li v-for="(sub,j) in item" v-bind:key="j">
                    <!-- 如果sub为true，跳转到对应id的页面，否则不跳转（id设为空） ，这里用到了拼接-->
                    <a v-bind:href="sub?'/#/product/'+sub.id:''">
                      <!-- 如果sub为true则显示对应产品的图片，否则显示/imgs/item-box-1.png的图片 -->
                      <img v-bind:src="sub?sub.img:'/imgs/item-box-1.png'" alt="">
                      {{sub?sub.name:'小米9'}}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">电视 盒子</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">笔记本 平板</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">家电 插线板</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">出行 穿戴</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">智能 路由器</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">电源 配件</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">生活 箱包</a>
            </li>
          </ul>
        </div>
        <!-- 使用Swiper实现轮播图 -->
        <swiper v-bind:options="swiperOption"> 
          <!-- 循环实现，就不用写成5个swiper-slide，需要指定key=索引，来实现swiper的缓存 -->
          <swiper-slide v-for="(item,index) in slideList" v-bind:key="index">
            <!-- href中使用字符串拼接要用单引号别忘了 -->
            <a v-bind:href="'/#/product/'+item.id"><img v-bind:src="item.img"></a>
          </swiper-slide>
          <!-- Optional controls,下面js进行配置 -->
          <div class="swiper-pagination"  slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
      <!-- 4个广告位 -->
      <div class="ads-box">
        <a v-bind:href="'/#/product/'+item.id" v-for="(item,index) in adsList" v-bind:key="index">
          <img v-lazy="item.img" alt="">
        </a>
      </div>
      <!-- 长条的广告位 -->
      <div class="banner">
        <a href="/#/product/30">
          <img v-lazy="'/imgs/banner-1.png'" alt="">
        </a>
      </div>
    </div>
    <!-- 产品展示区 -->
    <div class="product-box">
      <div class="container">
        <h2>手机</h2>
        <div class="wrapper">
          <div class="banner-left">
            <a href="/#/product/35"><img v-lazy="'/imgs/mix-alpha.jpg'" alt=""></a>
          </div>
          <div class="list-box">
            <div class="list" v-for="(arr,i) in phoneList" v-bind:key="i">
              <div class="item" v-for="(item,j) in arr" v-bind:key="j">
                <!-- 标签：是否新品 --> 
                <span v-bind:class="{'new-pro':j%2==0}">新品</span>
                <div class="item-img">
                  <img v-lazy="item.mainImage" alt="">
                </div>
                <div class="item-info">
                  <h3>{{item.name}}</h3>
                  <p>{{item.subtitle}}</p>
                  <p class="price" @click="addCart(item.id)">{{item.price}}元</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <service-bar></service-bar>
    <!-- 接收modal.vue传过来的参数 -->
    <modal 
      title="提示" 
      sureText="查看购物车" 
      btnType="1" 
      modalType="middle" 
      v-bind:showModal="showModal"
      v-on:submit="goToCart"
      v-on:cancel="showModal=false">
      <!-- 插槽要放在template里面 -->
      <template v-slot:body>
        <p>商品添加成功！</p>
      </template>
    </modal>
  </div>
</template>
<script>
  import ServiceBar from './../components/ServiceBar'
  import Modal from './../components/Modal'
  import { swiper, swiperSlide } from 'vue-awesome-swiper' //github中引入swiper有两种方式，这里选择局部引入，使用结构的语法，不需要全部的swiper都引入
  import 'swiper/dist/css/swiper.css' //引入swiper的样式
  export default{
    name:'index',
    components:{
      swiper,
      swiperSlide,
      ServiceBar,
      Modal
    },
    data(){
      return {
        // 轮播图属性
        swiperOption:{
          // 自动播放
          autoplay:true,
          // 循环轮播,点到头了还能继续点
          loop:true,
          // 切换效果:这里是立方体
          effect:'cube',
          // cube效果参数,可以设置阴影
          cubeEffect: {
            shadowOffset: 100,
            shadowScale: 0.6
          },
          // 分页器
          pagination: {
            // 指定分页器
            el: '.swiper-pagination',
            // 分页器点击可以切换
            clickable:true
          },
          // 分类器前进后退左右两个按钮
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }
        },
        // 轮播图循环列表
        slideList:[
          {
            // 商品id,根据数据库来写
            id:'42',
            img:'/imgs/slider/slide-1.jpg'
          },
          {
            id:'45',
            img:'/imgs/slider/slide-2.jpg'
          },
          {
            id:'46',
            img:'/imgs/slider/slide-3.jpg'
          },
          {
            // 有些可以不跳转
            id:'',
            img:'/imgs/slider/slide-4.jpg'
          },
          {
            id:'',
            img:'/imgs/slider/slide-1.jpg'
          }
        ],
        // 导航菜单点击后右边的面板，6行4列要用二维数组实现
        menuList:[
          // 这里只详写了第一行
          [
            {//object
              id:30,
              img:'/imgs/item-box-1.png',
              name:'小米CC9',
            },{
              id:31,
              img:'/imgs/item-box-2.png',
              name:'小米8青春版',
            },{
              id:32,
              img:'/imgs/item-box-3.jpg',
              name:'Redmi K20 Pro',
            },{
              id:33,
              img:'/imgs/item-box-4.jpg',
              name:'移动4G专区',
            }
          ],
          [0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]
        ],
        // 4个广告位
        adsList:[
          {
            id:33,
            img:'/imgs/ads/ads-1.png'
          },{
            id:48,
            img:'/imgs/ads/ads-2.jpg'
          },{
            id:45,
            img:'/imgs/ads/ads-3.png'
          },{
            id:47,
            img:'/imgs/ads/ads-4.jpg'
          }
        ],
        phoneList:[],
        showModal:false
      }
    },
    mounted(){//页面初始化方法
      this.init();
    },
    methods:{
      init(){
        this.axios.get('/products',{
          params:{
            categoryId:100012,
            pageSize:14 //查14条数据，导航栏6+产品展示8
          }
        }).then((res)=>{
          res.list = res.list.slice(6,14); //后面8条是给产品展示部分的
          this.phoneList = [res.list.slice(0,4),res.list.slice(4,8)];
        })
      },
      addCart(id){
        //参考门户_购物车接口.md文档看需要怎么调用传参
        this.axios.post('/carts',{
          productId:id,
          selected: true  //购物车默认是选中状态
        }).then((res)=>{
          this.showModal = true;//显示弹框，参考modal.vue文件
          this.$store.dispatch('saveCartCount',res.cartTotalQuantity);//实时更新购物车数量
        }).catch(()=>{
          this.showModal = true;
        });
      },
      goToCart(){
        this.$router.push('/cart');
      }
    }
  }
</script>
<style lang="scss">
// 导入的时候要加分号
  @import './../assets/scss/config.scss';
  @import './../assets/scss/mixin.scss';
  .index{
    .swiper-box{
      .nav-menu{
        position:absolute;
        width:264px;
        height:451px;
        z-index:9;//设置层级,使他在上面
        padding:26px 0;
        // 设置背景透明度，可以直接调整背景颜色的透明度，不能设置opacity,否则字也会变透明
        background-color:#55585a7a;
        box-sizing:border-box;
        .menu-wrap{
          .menu-item{
            height:50px;
            line-height:50px;
            a{
              position:relative;
              // a要设置为块级元素，否则后面的剪头无法和他出现在同一行
              display:block;
              font-size:16px;
              color:#ffffff;
              padding-left:30px;
              // 右侧的剪头使用伪类的方式
              &:after{
                position:absolute;
                right:30px;
                // top是相对于每个li标签的，所以a的css样式里面要设置为相对定位
                top:17.5px;
                content:' ';
                @include bgImg(10px,15px,'/imgs/icon-arrow.png');
              }
            }
            &:hover{
              background-color:$colorA;
              .children{
                display:block;
              } 
            }
            .children{
              display:none;
              width:962px;
              height:451px;
              background-color:$colorG;
              position:absolute;
              top:0;
              left:264px;
              border:1px solid $colorH;
              ul{
                display:flex;
                justify-content:space-between;
                height:75px;  // 451 / 6
                li{
                  height:75px;
                  line-height:75px; //垂直居中
                  flex:1; //等分，也可以写成固定值 width：241px
                  padding-left:23px;
                }
                a{
                  color:$colorB;
                  font-size:14px;
                }
                img{
                  width:42px;
                  height:35px;
                  vertical-align:middle; // 使图片和文字居中
                  margin-right:15px;
                }
              }
            }
          }
        }
      }
      // 覆盖swiper插件本身定的属性值
      .swiper-container {
        height: 451px;
        // 左箭头要放在导航菜单右边
        .swiper-button-prev{
          left:274px;
        }
        // 让图片全部填充
        img{
          width:100%;
          height:100%;
        }
      }  
    }
    .ads-box{
      @include flex();
      margin-top:14px;
      margin-bottom:31px;
      a{
        // 在base.scss中定义了a下面的img宽高都是百分百展示的，这里就不用写了
        width:296px;
        height:167px;
      }
    }
    .banner{
      margin-bottom:50px;
    }
    .product-box{
      background-color:$colorJ;
      padding:30px 0 50px;
      h2{
        font-size:$fontF;
        height:21px;
        line-height:21px;
        color:$colorB;
        margin-bottom:20px;
      }
      .wrapper{
        display:flex;
        .banner-left{
          margin-right:16px;
          img{
            width:224px;
            height:619px;
          }
        }
        .list-box{
          // 行
          .list{
            @include flex();
            width:986px;
            margin-bottom:14px;
            // 第二行底部没有margin-bottom
            &:last-child{
              margin-bottom:0;
            }
            .item{
              width:236px;
              height:302px;
              background-color:$colorG;
              text-align:center;
              // 新品标签
              span{
                display:inline-block;
                width:67px;
                height:24px;
                font-size:14px;
                line-height:24px;
                color:$colorG;
                &.new-pro{
                  background-color:#7ECF68;
                }
                &.kill-pro{
                  background-color:#E82626;
                }
              }
              .item-img{
                img{
                  width:100%;
                  height:195px;
                }
              }
              .item-info{
                h3{
                  font-size:$fontJ;
                  color:$colorB;
                  line-height:$fontJ;
                  font-weight:bold;
                }
                p{
                  color:$colorD;
                  line-height:13px;
                  margin:6px auto 13px;
                }
                .price{
                  color:#F20A0A;
                  font-size:$fontJ;
                  font-weight:bold;
                  cursor:pointer;
                  // 购物车图标
                  &:after{
                    @include bgImg(22px,22px,'/imgs/icon-cart-hover.png');
                    content:' ';
                    margin-left:5px;
                    vertical-align: middle;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
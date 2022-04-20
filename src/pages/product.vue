<template>
  <div class="product">
    <!-- 子组件ProductParam渲染处，需要传入动态title=商品名称，对应的子组件里面的title值从这获取 -->
    <product-param v-bind:title="product.name">
      <template v-slot:buy>
        <button class="btn" @click="buy">立即购买</button>
      </template>
    </product-param>
    <div class="content">
      <div class="item-bg">
        <h2>{{product.name}}</h2>
        <h3>{{product.subtitle}}</h3>
        <p>
          <a href="" id="">全球首款双频 GP</a>
          <span>|</span>
          <a href="" id="">骁龙845</a>
          <span>|</span>
          <a href="" id="">AI 变焦双摄</a>
          <span>|</span>
          <a href="" id="">红外人脸识别</a>
        </p>
        <div class="price">
          <span>￥<em>{{product.price}}</em></span>
        </div>
      </div>
      <div class="item-bg-2"></div>
      <div class="item-bg-3"></div>
      <div class="item-swiper">
        <swiper :options="swiperOption">
            <swiper-slide><img src="/imgs/product/gallery-2.png" alt=""></swiper-slide>
            <swiper-slide><img src="/imgs/product/gallery-3.png" alt=""></swiper-slide>
            <swiper-slide><img src="/imgs/product/gallery-4.png" alt=""></swiper-slide>
            <swiper-slide><img src="/imgs/product/gallery-5.jpg" alt=""></swiper-slide>
            <swiper-slide><img src="/imgs/product/gallery-6.jpg" alt=""></swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
        <p class="desc">小米8 AI变焦双摄拍摄</p>
      </div>
      <div class="item-video">
        <h2>60帧超慢动作摄影<br/>慢慢回味每一瞬间的精彩</h2>
        <p>后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！<br/>更能AI 精准分析视频内容，15个场景智能匹配背景音效。</p>
        <!-- 点击背景图片后，showslide从''变为slidedown -->
        <div class="video-bg" @click="showSlide='slideDown'"></div>
        <!-- v-show根据表达式是否为true来显示或者隐藏元素，当showslide=''，即slidedown和slideup动画都结束后才隐藏
        v-show & v-if 比较：
        v-show 指令的功能与 v-if 指令相似。不过 v-if 指令会根据表达式重建或销毁元素或组件以及它们所绑定的事件。
        v-show 指令只是简单地设置 css 属性display: none。
        v-if 指令开销较大，所以更适合条件不经常改变的场景。而 v-show 指令适合条件频繁切换的场景。 -->
        <div class="video-box" v-show="showSlide">
          <!-- 视频遮罩 -->
          <div class="overlay"></div>
          <!-- 直接用showslide变量来控制样式是''还是slideDown还是slideUp -->
          <div class="video" v-bind:class="showSlide">
            <!-- 关闭按钮，closevideo函数中设置了showslide=slideup，并设置了计时器，会让动画结束后showslide恢复为'' -->
            <span class="icon-close" @click="closeVideo"></span>
            <!-- 注意使用video标签，muted让音频静音输出，autoplay表示自动播放，controls表示视频的控件：播放暂停 -->
            <video src="/imgs/product/video.mp4" autoplay controls="controls"></video>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import ProductParam from './../components/ProductParam' //引入商品参数行组件
  export default{
    name:'product',
    components:{
      swiper,
      swiperSlide,
      ProductParam
    },
    data(){
      return {
        showSlide:'',//控制视频的动画效果（下滑上移）
        product:{},//商品信息，object类型
        swiperOption:{
          autoplay:true,
          slidesPerView:3,
          spaceBetween: 30,
          freeMode: true,
          pagination: {
            el: '.swiper-pagination',
            clickable :true,
          }
        }
      }
    },
    mounted(){//初始化数据，mounted是个函数，下面methods是个object
      this.getProductInfo();
    },
    methods:{
      getProductInfo(){
        let id = this.$route.params.id;//获取动态路由参数：地址栏上面的商品id，参考router.js里面22行注释
        this.axios.get(`/products/${id}`).then((res)=>{//this.axios.get调用商品接口，因为这里地址是动态的所以用字符串模板
          this.product = res;//返回的res表示id商品对应的信息
        })
      },
      buy(){
        //this.$route一般用于获取路由参数，this.$router一般用于路由跳转
        let id = this.$route.params.id;
        this.$router.push(`/detail/${id}`);//跳转到产品详情页，动态路径可以使用字符串模板
      },
      closeVideo(){
        this.showSlide='slideUp';//设置为slideup动画
        setTimeout(()=>{//过600毫秒动画结束后再将showslide置为空，这样整个视频组件都能被隐藏
          this.showSlide='';
        },600)
      }
    }
  }
</script>
<style lang="scss">
  @import './../assets/scss/mixin.scss';
  .product{
    .content{
      .item-bg{
        background:url('/imgs/product/product-bg-1.png') no-repeat center;
        height:718px;
        text-align:center;
        h2{
          font-size:80px;
          padding-top:55px;
        }
        h3{
          font-size:24px;
          letter-spacing: 10px;
        }
        p{
          margin-top:21px;
          margin-bottom:40px;
          a{
            font-size:16px;
            color:#333333;
          }
          span{
            margin:0 15px;
          }
        }
        .price{
          font-size:30px;
          color:#333333;
          em{
            font-style:normal;
            font-size:38px;
          }
        }
      }
      .item-bg-2{
        background:url(/imgs/product/product-bg-2.png) no-repeat center;
        height:480px;
        background-size:1226px 397px;
      }
      .item-bg-3{
        background:url(/imgs/product/product-bg-3.png) no-repeat center;
        height:638px;
        background-size:cover;
      }
      .item-swiper{
        margin:36px auto 52px;
        .desc{
          font-size:18px;
          color:#333333;
          text-align:center;
        }
        img{
          width:100%;
        }
      }
      .item-video{
        height:1044px;
        background-color:#070708;
        margin-bottom:76px;
        color:#FFFFFF;
        text-align:center;
        h2{
          font-size:60px;
          padding-top:82px;
          margin-bottom:47px;
        }
        p{
          font-size:24px;
          margin-bottom:58px;
        }
        .video-bg{
          background:url('/imgs/product/gallery-1.png') no-repeat center;
          background-size:cover;
          width:1226px;
          height:540px;
          margin:0 auto 120px;
          cursor:pointer;
        }
        .video-box{
          .overlay{
            @include position(fixed);//minxin.scss文件里面的方法position
            background-color:#333333;
            opacity:.4;
            z-index:10;
          }
          //animation定义动画的方法：keyframes一定是成对定义出现的，有淡入一定要有淡出
          @keyframes slideDown{
            from{
              top:-50%;
              opacity:0;
            }
            to{
              top:50%;
              opacity:1;
            }
          }
          @keyframes slideUp{
            from{
              top:50%;
              opacity:1;
            }
            to{
              top:-50%;
              opacity:0;
            }
          }
          .video{
            position:fixed;
            //下面三行水平垂直居中实现，常考！
            top:-50%;
            left:50%;
            transform:translate(-50%,-50%);//等价于margin-top:-?px;margin-left:-?px

            z-index:10;
            width:1000px;
            height:536px;
            opacity:1;
            &.slideDown{
              //transition用于制作比较单一的动画效果，animation用于制作复杂的动画效果
              //视频8-4讲了怎么用transition实现动画，要再看看的！
              animation:slideDown .6s linear;//调用哪个动画，过渡时间，过渡曲线（匀速）
              top:50%;//动画只会跑一次，跑完后top就会回到-50%，因此这里要固定住top为50%使其停留在中间
            }
            &.slideUp{
              animation:slideUp .6s linear;
            }
            .icon-close{
              position:absolute;
              top:20px;
              right:20px;
              @include bgImg(20px,20px,'/imgs/icon-close.png');
              cursor:pointer;//鼠标放上去有个小手
              z-index:11;
            }
            video{
              //撑满整个父容器
              width:100%;
              height:100%;
              object-fit:cover;//内容覆盖整个窗口，视频组件浏览器原生的样式是有阴影的，这样就看不到阴影了
              outline:none;//消除内置样式
            }
          }
        }
      }
    }
    button{
      margin-left:10px;
    }
  }
</style>
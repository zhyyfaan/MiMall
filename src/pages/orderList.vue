<template>
  <div class="order-list">
    <order-header title="订单列表">
      <template v-slot:tip>
        <span>请谨防钓鱼链接或诈骗电话，了解更多></span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="order-box">
          <loading v-if="loading"></loading>
          <div class="order" v-for="(order,index) in list" :key="index">
            <div class="order-title">
              <div class="item-info fl">
                {{order.createTime}}
                <span>|</span>
                {{order.receiverName}}
                <span>|</span>
                订单号：{{order.orderNo}}
                <span>|</span>
                {{order.paymentTypeDesc}}
              </div>
              <div class="item-money fr">
                <span>应付金额：</span>
                <span class="money">{{order.payment}}</span>
                <span>元</span>
              </div>
            </div>
            <div class="order-content clearfix">
              <div class="good-box fl">
                <div class="good-list" v-for="(item,i) in order.orderItemVoList" :key="i">
                  <div class="good-img">
                    <img v-lazy="item.productImage" alt="">
                  </div>
                  <div class="good-name">
                    <div class="p-name">{{item.productName}}</div>
                    <div class="p-money">{{item.totalPrice + 'X' + item.quantity}}元</div>
                  </div>
                </div>
              </div>
              <div class="good-state fr" v-if="order.status == 20">
                <!-- 已支付 -->
                <a href="javascript:;">{{order.statusDesc}}</a>
              </div>
              <div class="good-state fr" v-else>
                <!-- 未支付 -->
                <a href="javascript:;" @click="goPay(order.orderNo)">{{order.statusDesc}}</a>
              </div>
            </div>
          </div>
          <!-- 第一种分页方式使用分页器：elementui的组件前面要加el-：该组件使用参考：https://element.eleme.io/#/zh-CN/component/pagination -->
          <el-pagination
            v-if="true"
            class="pagination"
            background 
            layout="prev, pager, next"
            :pageSize="pageSize"
            :total="total"
            @current-change="handleChange"
            >
          </el-pagination>
          <!-- 第二种分页方式，在一个页面中，点击加载更多后显示更多内容，使用loading控制点击按钮后进行数据加载操作，在按钮上显示加载状态。 -->
          <div class="load-more" v-if="false">
              <el-button type="primary" :loading="loading" @click="loadMore">加载更多</el-button>
          </div>
          <!-- 第三种分页方式，使用npm插件infiniteScroll，v-infinite-scroll滚动触发的事件，infinite-scroll-disabled滚动开始/禁用的标志busy为true禁用，infinite-scroll-distance页面滚动到离页尾多少像素的时候触发 -->
          <div class="scroll-more"
            v-infinite-scroll="scrollMore"
            infinite-scroll-disabled="busy"
            infinite-scroll-distance="410"
            v-if="false"
          >
            <!-- 滚动加载的等待动画，loading确定是否显示 -->
            <img src="/imgs/loading-svg/loading-spinning-bubbles.svg" alt="" v-show="loading">
          </div> 
          <!-- 当loading关闭且orderlist没有数据时，使用no-data组件 -->
          <no-data v-if="!loading && list.length==0"></no-data>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import OrderHeader from './../components/OrderHeader'
  import Loading from './../components/Loading'
  import NoData from './../components/NoData'
  // 引入element-ui的分类器组件和buttion组件
  import { Pagination,Button } from 'element-ui'
  //引入npm插件infiniteScroll实现滚动加载：https://www.cnblogs.com/yingcaiyi/p/11765971.html
  import infiniteScroll from 'vue-infinite-scroll'
  export default{
    name:'order-list',
    components:{
      OrderHeader,
      Loading,
      NoData,
      [Pagination.name]:Pagination,//[]动态获取数据，这里Pagination.name的值为el-pagination,即el-pagination：Pagination
      [Button.name]:Button//同上，el-button:Button
    },
    directives: {
      //npm插件，不是组件，不是放在components中的：https://www.cnblogs.com/yingcaiyi/p/11765971.html
      infiniteScroll
    },
    data(){
      return {
        loading:false,//请求前有一个等待动画，请求后动画消失
        list:[],
        pageSize:10,//分页器每页显示条目个数：每个页面10条订单
        pageNum:1,//当前是第几页
        total:0,//总条目数
        showNextPage:true,//加载更多：是否显示按钮
        busy:false,//滚动加载，是否触发，false表示不忙可以触发,true表示禁用
      }
    },
    mounted(){
      this.getOrderList();
    },
    methods:{
      getOrderList(){
        this.loading = true;
        this.busy = true;//页面一开始加载时busy设置为true，当请求完第一页后再开启busy=false，否则一开始就会请求第二页
        this.axios.get('/orders',{
          params:{
            pageSize:10,
            pageNum:this.pageNum 
          }
        }).then((res)=>{
          this.loading = false;//请求后loading消失
          this.list = res.list;
          // this.list = this.list.concat(res.list); //用于el-button加载更多按钮，每次都在之前的列表后面继续加载。如果直接使用this.list=res.list则只能实现下一页替换当前页数据
          this.total = res.total;
          this.showNextPage = res.hasNextPage;//这是针对加载更多按钮来说的，如果还有下一页才会显示加载更多按钮，如果是最后一页则不显示该按钮
          this.busy = false;//当请求完第一页后再开启busy=false
        }).catch(()=>{
          this.loading = false;//请求失败也要取消loading
        })
      },
      goPay(orderNo){
        // 三种路由跳转方式
        // this.$router.push('/order/pay')
        /*this.$router.push({
          name:'order-pay',
          query:{
            orderNo
          }
        })*/
        this.$router.push({
          path:'/order/pay',
          query:{
            orderNo
          }
        })
      },
      // 第一种方法：element-ui分页器Pagination
      handleChange(pageNum){
        // @current-change：当前页面改变时（手动点击某一页，或者点击上一页下一页都会触发）触发
        this.pageNum = pageNum;//当前页面
        this.getOrderList();//重新加载当前页面订单列表
      },
      // 第二种方法：加载更多按钮
      loadMore(){
        this.pageNum++;//每次页面+1
        this.getOrderList();
      },
      // 第三种方法：滚动加载，通过npm插件infiniteScroll实现
      scrollMore(){
        this.busy = true;//滚动触发一次后就暂时禁用了，否则会一直滚动下去
        setTimeout(()=>{//定时器
          this.pageNum++;
          this.getList();
        },500);
      },
      // 专门给scrollMore使用
      getList(){
        this.loading = true;
        this.axios.get('/orders',{
          params:{
            pageSize:10,
            pageNum:this.pageNum
          }
        }).then((res)=>{
          this.list = this.list.concat(res.list);
          this.loading = false;
          if(res.hasNextPage){//如果还有后一页可以加载的话，就释放busy可以继续实现加载
            this.busy=false;
          }else{//如果后面没有下一页可以加载了的话，就令busy=true，这样就不会触发滚动加载了
            this.busy=true;
          }
        });
      },
    }
  }
</script>
<style lang="scss">
  @import './../assets/scss/config.scss';
  @import './../assets/scss/mixin.scss';
  .order-list{
    .wrapper{
      background-color:$colorJ;
      padding-top:33px;
      padding-bottom:110px;
      .order-box{
        .order{
          @include border();
          background-color:$colorG;
          margin-bottom:31px;
          &:last-child{
            margin-bottom:0;
          }
          .order-title{
            @include height(74px);
            background-color:$colorK;
            padding:0 43px;
            font-size:16px;
            color:$colorC;
            .item-info{
              span{
                margin:0 9px;
              }
            }
            .money{
              font-size:26px;
              color:$colorB;
            }
          }
          .order-content{
            padding:0 43px;
            .good-box{
              width:88%;
              .good-list{
                display: flex;
                align-items: center;
                height:145px;
                .good-img{
                  width:112px;
                  img{
                    width:100%;
                  }
                }
                .good-name{
                  font-size:20px;
                  color:$colorB;
                }
              }
            }
            .good-state{
              @include height(145px);
              font-size: 20px;
              color:$colorA;
              a{
                color:$colorA;
              }
            }
          }
        }
        .pagination{
          text-align:right;//分页器靠右
        }
        .el-pagination.is-background .el-pager li:not(.disabled).active{
          //分页器底色
          background-color: #FF6600;
        }
        .el-button--primary{//修改button颜色
          background-color: #FF6600;
          border-color: #FF6600;
        }
        .load-more,.scroll-more{
          text-align:center;//控制加载更多按钮和滚动加载的loading动画居中
        }
      }
    }
  }
</style>
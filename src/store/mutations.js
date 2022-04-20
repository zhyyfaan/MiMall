/**
 * 商城Vuex-mutations，定义各种方法,改变状态state
 */
export default {
  //这里的大写可以很好的和action.js里面的同名函数进行区分
  SAVEUSERNAME(state, username) {//mutation是唯一可以修改state的地方
    state.username = username;
  },
  SAVECARTCONUT(state, count) {
    state.cartCount = count;
  }
}
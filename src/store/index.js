//store目录下定义了index,action,mutation三个文件
//index文件是vuex入口文件，定义结构，包括状态state
import Vue from 'vue'
import Vuex from 'vuex'
// 使用vuex插件
Vue.use(Vuex);

import mutations from './mutations'
import actions from './action'


const state = {
  username:'',//登录用0
  cartCount:0//购物车商品数量
}
//创建并暴露store
export default new Vuex.Store({ //传递配置对象{}
  //下面的名字不能篡改
  state, //等同于state:state
  mutations, //等同于mutations:mutations,mutations即导入的./mutations文件里面定义的东西
  actions //等同于actions:actions,actions即导入的./actions文件里面定义的东西
});
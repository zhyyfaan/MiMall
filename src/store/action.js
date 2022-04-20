/**
 * 商城Vuex-actions，触发mutations里面的函数；而action 通过 store.dispatch 方法触发
 */
export default {
  saveUserName(context,username){ //context是vuex官方文档给的参数，是一个迷你版的store，表示上下文对象，里面有commit和dispatch方法，也有state属性，但是不能直接改state，因为vue开发者工具
    //只能看到mutation的东西，如果用action重context对象修改，那就无法使用开发者工具了；username是传入的参数
    context.commit('SAVEUSERNAME', username); //action提交的是mutation，不能直接改变state：接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 context.commit 提交一个 mutation
  },
  saveCartCount(context, count) {
    context.commit('SAVECARTCONUT', count);
  }
}
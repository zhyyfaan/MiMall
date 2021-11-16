/**
 * Storage封装
 */
const  STORAGE_KEY = 'mall';
export default{
  // 存储值
  setItem(key,value,module_name){
    if (module_name){//module_name即user
      let val = this.getItem(module_name); //object对象即{username:"jack",age:30,sex:1}
      val[key] = value;
      this.setItem(module_name, val);
    }else{
      let val = this.getStorage();
      val[key] = value;
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val)); //重新覆盖掉原来的STORAGE_KEY的值
    }
  },
  // 获取某一个模块的值user下面的userName属性的value值 即key:mall value: user{username:"jack",age:30,sex:1}
  getItem(key,module_name){
    if (module_name){ //module_name即user
      let val = this.getItem(module_name); //val:object对象即{username:"jack",age:30,sex:1}
      if(val) return val[key];
    }
    return this.getStorage()[key];
  },
  //获取整个数据（浏览器的环境信息）
  getStorage(){
    return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || '{}');  //转换为json
  },
  //清空某一个值
  clear(key, module_name){
    let val = this.getStorage();
    if (module_name){
      if (!val[module_name])return;
      delete val[module_name][key];
    }else{
      delete val[key];
    }
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val));//要重新覆盖
  }
}
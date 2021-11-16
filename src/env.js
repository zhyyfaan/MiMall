//如果是接口代理（最常用，/api）的话，就直接用vue.config.js，不用这个文件，只有当使用jsonp跨域和coars跨域时才要这个文件

let baseURL;

// process对象是全局变量，它提供当前node.js的有关信息，以及控制当前node.js的有关进程。因为是全局变量，它对于node应用程序是始终可用的，无需require()。
// 既然process都是一个对象了，env自然是它的一个属性，这个属性返回包含用户环境信息的对象。在终端输入node后，在输入process.env可以看到打印出来的信息。

// 主角出场 ：process.env.NODE_ENV
// NODE_ENV不是process.env对象上原有的属性，它是我们自己添加上去的一个环境变量，用来确定当前所处的开发阶段。一般生产阶段设为production，开发阶段设为develop，然后在脚本中读取process.env.NODE_ENV。

switch (process.env.NODE_ENV) { //配合package.json里面的配置
  case 'development':  //终端输入cnpm run serve(为啥是serve不是development看package.json)
    baseURL = 'http://dev-mall-pre.springboot.cn/api';
    break;
  case 'test'://终端输入cnpm run test
    baseURL = 'http://test-mall-pre.springboot.cn/api';
    break;
  case 'prev'://终端输入cnpm run prev
    baseURL = 'http://prev-mall-pre.springboot.cn/api';   //这个是自己定义的，需要配合.env.prev文件
    break;
  case 'prod'://终端输入cnpm run bulid
    baseURL = 'http://mall-pre.springboot.cn/api';
    break;
  default:
    baseURL = 'http://mall-pre.springboot.cn/api';
    break;
}

export default {
  baseURL
}
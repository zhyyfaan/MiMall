import Mock from 'mockjs'
//参考mockjs语法：https://github.com/nuysoft/Mock/wiki/Getting-Started
Mock.mock('/api/user/login',{
  "status": 0,
  "data": {
    "id|10001-11000": 0, //产生一个10001-11000的随机数
    "username": "@cname", //随机产生一个名字，cname是中文的，name是英文的
    "email": "admin@51purse.com",
    "phone": null,
    "role": 0,
    "createTime": 1479048325000,
    "updateTime": 1479048325000
  }
});
/**
 * @Author: sun
 * @Date: 2021/5/23 19:08
 * @title: index
 * @Description:
 * @version: 1.0
 */
import axios from 'axios'
import qs from 'qs';
axios.defaults.baseURL="/api";

//登录
const login = data =>
    axios.post('/user/login', data)


//注册
const register =data =>
    axios.post('/user/registerCommon',data)

//获取验证码,这里获取的是图片，所以需要设置成blob
const getCode=()=>
 axios.get('/user/getCode',{responseType: 'blob'})

//普通用户注册
const registerCommon=(data)=>
 axios.post("/user/registerCommon",data)

//商家注册
const registerBusinessCommon=(data)=>
    axios.post("/user/registerBusiness",data)


//通过用户id来找用户信息
const getUserId=(data)=>
    axios.get("/user/getUserById?userId="+data)

//获取cookid
const getCookie=(data)=>{
   // var cookieStr = unescape(document.cookie);
   // //console.log(cookieStr);
   // var num= cookieStr.split("=");
   // var result=num[1];
   // //console.log(result)
    var strCookie = unescape(document.cookie);
    var arrCookie = strCookie.split("; ");

    for(var i = 0; i < arrCookie.length; i++){

        var arr = arrCookie[i].split("=");
        console.log(arr)
        if(data == arr[0]){
            return arr[1];
        }else{
            return "";
        }
    }

}

//用户名是否被占用
const isuser=(data)=>
    axios.get("/user/isUsernameExist",{params:{
          username:data
       }})
//邮箱是否被占用
const isEmial=(data)=>
    axios.get("/user/isEmailExist",{params:{
          email:data
       }})
//处理获取用户信息的双引号问题
const remdou=(data)=>{
   //这里只能用这个json的这个方法
   let num=data.split('"');
   let result=num[1];
   return result;
}

//更新密码
const upPassword=(data)=>
   axios.post("/user/updatePassword",data)

//更新地址
const upAddress=(data)=>
    axios.get("/user/updateAddress",{params:{
       username:data.username,
          address:data.address
       }})


export {
   login,
   register,
   getCode,
   registerCommon,
   registerBusinessCommon,
   getUserId,
   getCookie,
   remdou,
   upPassword,
   upAddress,
   isuser,
   isEmial
}
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
// const registerBusinessCommon(data)=>
//     axios.post("/user/registerBusiness",data)


//通过用户id来找用户信息

export {
   login,
   register,
   getCode,
   registerCommon
}
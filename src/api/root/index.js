/**
 * @Author: sun
 * @Date: 2021/6/20 10:58
 * @title: index
 * @Description:
 * @version: 1.0
 */

import axios from 'axios'
axios.defaults.baseURL="/api";

//获取所有用户个数
const getAllUserCount=(data)=>
    axios.get('/user/getUserCount')

//获取用户数据
const getUserData=(mode,size,status)=>
    axios.get('/user/getUserList?mode='+mode+'&currentPage=1&pageSize='+size+'&status='+status)

//改变用户状态
const changeUserStatus=(na,sta)=>
    axios.get('/user/changeStatus?username='+na+'&status='+sta)

//获取所有商店个数
const getAllShopCount=(data)=>
    axios.get('/shop/getShopCount')
//获取所有商店数据
const getShopData=(data)=>
    axios.get('/shop/shopFilter?currentPage=1&pageSize='+data)

//改变商店状态
const changeShopstatus=(na,sta)=>
    axios.get('/shop/updateShopStatus?shopUUID='+na+'&isOpen='+sta)

//改变商店等级
const changeShoplevel=(na,sta)=>
    axios.get('/shop/updateShopLevel?shopUUID='+na+'&upper='+sta)

//获取所有订单
const getAlldeal=()=>
    axios.get('/deal/dealFilter')
export{
    getAllUserCount,
    getUserData,
    changeUserStatus,
    getAllShopCount,
    getShopData,
    changeShopstatus,
    changeShoplevel,
    getAlldeal

}
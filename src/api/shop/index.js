/**
 * @Author: sun
 * @Date: 2021/6/15 17:00
 * @title: index
 * @Description:
 * @version: 1.0
 */
import axios from 'axios'
axios.defaults.baseURL="/api";

//获取商家详情
const getShopDetail=(data)=>
    axios.get('/shop/shopFilter?shopUUID='+data+'&currentPage=1&pageSize=10')

export{
    getShopDetail
}
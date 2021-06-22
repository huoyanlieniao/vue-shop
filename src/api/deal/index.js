/**
 * @Author: sun
 * @Date: 2021/6/15 16:00
 * @title: index
 * @Description:
 * @version: 1.0
 */
import axios from 'axios'
import qs from 'qs';
axios.defaults.baseURL="/api";


//获取用户多少个具体商品订单
const getGoodsUserNum=(UUID,Id)=>
    axios.get('/deal/dealFilter?goodsUUID='+UUID+'&commonId='+Id
        )

//插入订单
const insetDeal=(data)=>
    axios.post('/deal/insertDeal',data)

//获取用户所有的订单
const getUserAllDeal=(data)=>
    axios.get('/deal/dealFilter?commonId='+data)

//更改订单状态
const UpdateDeal=(ID,status)=>
    axios.get('/deal/updateDealStatus?dealUUID='+ID+'&status='+status)

//签收订单
const receip=(ID,status)=>
    axios.get('/deal/receipt?dealUUID='+ID+'&assess='+status)

//获取商店所有的订单
const getGoodAllDeal=(data)=>
    axios.get('/deal/dealFilter?goodsUUID='+data)

//获取该商品所有的订单
const getShopAllDeal=(data)=>
    axios.get('/deal/dealFilter?shopUUID='+data)

//退货
const returnDeal=(ID,status)=>
    axios.get('/deal/returnGoods?dealUUID='+ID+'&assess='+status)

export{
    getGoodsUserNum,
    insetDeal,
    getUserAllDeal,
    UpdateDeal,
    receip,
    returnDeal,
    getShopAllDeal,
    getGoodAllDeal

}

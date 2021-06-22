/**
 * @Author: sun
 * @Date: 2021/6/16 11:20
 * @title: index
 * @Description:
 * @version: 1.0
 */
import axios from 'axios'
import qs from 'qs';
axios.defaults.baseURL="/api";

//看本商品是否在购物车中
const isLive=(goodUUID,commonId)=>
    axios.get('/shopCar/getGoodsByCommonIdAndUUID?goodsUUID='+goodUUID+'&commonId='+commonId)

//添加商品进入购物车
const insertGoods=(data)=>
    axios.post('/shopCar/insertToCar',data)

//更改商品状态
const updateGoods=(goodUUID,commonId,status)=>
    axios.get('/shopCar/updateStatus?goodsUUID='+goodUUID+'&commonId='+commonId+'&status='+status)

//获取用户的所有订单
const getUserShopCar=(data)=>
    axios.get('/shopCar/getGoodsListInCar?commonId='+data+'&status=0')




export{
    isLive,
    insertGoods,
    updateGoods,
    getUserShopCar
}
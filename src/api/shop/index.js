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

//获取商家商品数量
const getGoodsCount=(data)=>
    axios.get('/Goods/getGoodsCount?shopUUID='+data)

//获取商家商品信息
const getGoodsDetail=(uuid,Page)=>
    axios.get('/Goods/goodsFilter?shopUUID='+uuid+'&currentPage='+Page+'&pageSize=10')

//店铺商品模糊搜索数量
const getShopMuoGoodsCount=(data,name)=>
    axios.get('/Goods/getGoodsCount?shopUUID='+data+'&goodsName='+name)

//店铺商品模糊搜索商品
const getShopMuoGoodsDetail=(uuid,name,page)=>
    axios.get('/Goods/goodsFilter?shopUUID='+uuid+'&goodsName='+name+'&currentPage='+page+'&pageSize=10')

//获取商家名下的商店数量
const getShopCount=(data)=>
    axios.get('/shop/getShopCount?businessId='+data)

//获取商家名下的商店信息
const getShopDetail1=(id,num)=>
    axios.get('/shop/shopFilter?businessId='+id+'&currentPage=1&pageSize='+num)

//调整商品属性
const changeGoods=(data)=>
    axios.post('/Goods/updateGoodsInfo',data)

//开店或者关店
const isOpen=(uuid,data)=>
    axios.get('/shop/updateShopStatus?shopUUID='+uuid+'&isOpen='+data)

//改商店名字
const changeShopName=(uuid,data)=>
    axios.get('/shop/updateShopName?shopUUID='+uuid+'&shopName='+data)

export{
    getShopDetail,
    getGoodsCount,
    getGoodsDetail,
    getShopMuoGoodsCount,
    getShopMuoGoodsDetail,
    getShopCount,
    getShopDetail1,
    changeGoods,
    isOpen,
    changeShopName
}
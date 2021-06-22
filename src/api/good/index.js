/**
 * @Author: sun
 * @Date: 2021/6/6 15:04
 * @title: index
 * @Description:
 * @version: 1.0
 */

import axios from 'axios'
axios.defaults.baseURL="/api";

//获取商品详情
const getGoodDetail=(data)=>
    axios.get('/Goods/getGoodsByUUID?goodsUUID='+data)

//处理获取商品信息的双引号问题
const remdou=(data)=>{
    //这里只能用这个json的这个方法
    let num=data.split('"');
    let result=num[1];
    return result;
}
//获取评价
const getComment=(data)=>
    axios.get('/goods/comment/getCommentListByGoodsUUID?goodsUUID='+data)

//添加评价
const insertComment=(data)=>
    axios.post('/goods/comment/insertComment',data)

//获取商品终类信息
const getGoodsType=()=>
    axios.get('/Goods/getGoodsType')

//获取所有的商品数量
const getAllGoodsCount=()=>
    axios.get('/Goods/getGoodsCount')

//商品全局信息获取
const getGoodsDetail=(page)=>
    axios.get('/Goods/goodsFilter?currentPage='+page+'&pageSize=10')

//商品模糊搜索数量
const getMuoGoodsCount=(name)=>
    axios.get('/Goods/getGoodsCount?&goodsName='+name)

//商品模糊搜索商品
const getMuoGoodsDetail=(name,page)=>
    axios.get('/Goods/goodsFilter?goodsName='+name+'&currentPage='+page+'&pageSize=10')

//插入商品
const insetGoods=(data)=>
    axios.post('/Goods/insertGoods',data)

export{
    getGoodDetail,
    remdou,
    getComment,
    insertComment,
    getGoodsType,
    getAllGoodsCount,
    getGoodsDetail,
    getMuoGoodsCount,
    getMuoGoodsDetail,
    insetGoods

}
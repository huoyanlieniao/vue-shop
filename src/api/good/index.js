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

export{
    getGoodDetail,
    remdou,
    getComment,
    insertComment,
    getGoodsType
}
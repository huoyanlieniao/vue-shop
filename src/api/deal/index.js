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


export{
    getGoodsUserNum
}

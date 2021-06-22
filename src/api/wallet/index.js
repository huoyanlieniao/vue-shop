/**
 * @Author: sun
 * @Date: 2021/6/15 20:16
 * @title: index
 * @Description:
 * @version: 1.0
 */
import axios from 'axios'
import qs from 'qs';
axios.defaults.baseURL="/api";

const getWallet=(data)=>
    axios.get('/user/getWalletById',{params:{
            userId:data
        }})

const addMoney=(name,money)=>
    axios.get('/user/addMoney?username='+name+'&addMoney='+money)

const subMoney=(name,money)=>
    axios.get('/user/subMoney?username='+name+'&subMoney='+money)



export{
    getWallet,
    addMoney,
    subMoney
}
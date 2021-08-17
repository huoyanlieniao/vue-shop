/**
 * @Author: sun
 * @Date: 2021/8/13 21:10
 * @title: axiosSet
 * @Description: axios 错误拦截处理
 * @version: 1.0
 */


import axios from "axios";
import alert from './Alert'

let axiosInstance=axios.create()

/**
 * 请求拦截器，目前没有什么配置
 * @date 2021/8/17 22:35
 * @author sun
 * @param null
 * @return
 */
axiosInstance.interceptors.request.use(
    config => {
        return config
    },
    err => {
        return Promise.reject(err)
    })


/**
 * 接受拦截器，目前通过errorHandler进行错误处理
 * 这里因为后端同学默认返回200然后在data里在写具体的返回码，所以这里需要加深一层
 * @date 2021/8/17 22:36
 * @author sun
 * @param null
 * @return
 */
axiosInstance.interceptors.response.use(response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    // console.log(response)
    if (response.data.code === 200) {
        return Promise.resolve(response.data);
    } else {
        errorHandler(response.data.code,response.data.message)
        return Promise.reject(response.data);

    }
}, error=>{

})


/**
 * 请求失败错误统一处理
 * 这里多次测试不可使用element，原因推测为这个js是多次引用的，即使挂载在全局被引用的地方也不可使用element
 * @date 2021/8/16 7:48
 * @author sun
 * @param status 请求失败状态码
 * @return
 */
const errorHandler=(status,other)=> {
    console.log(status,other)
    switch(status){
        case 480:
            window.alert("aaa");break;
            // alert.setAlert("xiao","success","tishi");break;
            // this.$refs.myAlert.setAlert("xiao","success","tishi");break

        default:break;
    }
}

export default axiosInstance

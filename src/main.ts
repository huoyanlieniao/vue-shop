import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
// @ts-ignore
import * as UserAPI from './api/user/index.js'
import {Vue} from "vue-class-component";


createApp(App).use(store).use(router).use(ElementPlus).mount('#app')




// 全局拦截器,在进入需要用户权限的页面前校验是否已经登录
router.beforeResolve((to, from, next) => {

    var userId = UserAPI.getCookie("userId:")
    console.log(userId)
    // const loginUser = localStorage.getItem('userId')
    // 判断路由是否设置相应校验用户权限
    if (to.meta.requireAuth) {
        if (!userId) {
            // 没有登录，转到登录界面
            window.alert("请先登录");
            router.push({
                name: 'Login'
            })
            if (from.name == null) {
                //此时，是在页面没有加载，直接在地址栏输入链接，进入需要登录验证的页面
                next('/')
                return
            }
            // 终止导航
            next(false)
            return
        }
    }
    next()
})

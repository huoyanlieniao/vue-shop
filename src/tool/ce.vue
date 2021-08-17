<!--
 * @Author: sun
 * @Date: 2021/8/12 19:29
 * @title: ce
 * @Description: 技术临时测试
 * @version: 1.0
 -->
<template>
    <div >
        <my-alert ref="myAlert"></my-alert>
        <el-button type="info" @click="ce" >上架商品</el-button>
    </div>

</template>

<script>
    import * as GoodAPI from '../api/good/index.js'

    export default {
        name: "ce",

        data(){
            shop:{}
        },
        methods:{
            ce(){
                // GoodAPI.getGoodDetail('07dd293d-746b-4bfd-96ca-33d690f92d9d').then(res=>{
                //    console.log(res)
                // })
                //c6118fa9-063f-4b34-a3f0-56cc3b2d7236


                //功能测试
                 GoodAPI.getDetail('').then(res=>{
                     this.shop=res
                 }
                )
                console.log(this.shop)
            }
        },

    }
</script>

<style scoped>

</style>
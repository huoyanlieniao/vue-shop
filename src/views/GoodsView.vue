<!--
 * @Author: sun
 * @Date: 2021/6/18 13:07
 * @title: GoodsView
 * @Description:
 * @version: 1.0
 -->
<template>

    <el-container>
            <el-header>
                <el-input v-model="input" placeholder="请输入搜索内容"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="find">搜索</el-button>


            </el-header>

            <el-main>
                <el-row>
                    <el-col :span="8" v-for="item in GoodsList" :offset="1" style="margin: 10px">
                        <el-card :body-style="{ padding: '0px',height:'300px'}" @click="gotogoods(item.goodsUUID)">
                            <div v-if="item.PictureUrl==0">
                                <el-image>
                                </el-image>
                            </div>

                            <div v-if="item.PictureUrl!=0">
                                <el-image
                                        style="width: 100%; height: 100%;"
                                        :src="item.PictureUrl"
                                        :fit="fill"></el-image>
                            </div>

                            <div  style="padding: 14px;">
                                <span>{{item.goodsName}}</span>
                            </div>
                            <div  style="padding: 14px;">
                                <span>{{item.goodsPrice}}</span>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>


            </el-main>

            <el-footer>
                <el-pagination
                        background
                        layout="prev, pager, next"
                        :page-size="Page.PageSize"
                        :page-count="Page.PageCount"
                        :current-page="Page.CurrentPage"
                        :total="Page.PageCount"
                        @current-change="handleCurrentChange"
                >
                </el-pagination>
            </el-footer>

    </el-container>
</template>

<script>
    import * as GoodAPI from '../api/good/index.js'
    import * as UserAPI from '../api/user/index.js'
    import * as DealAPI from '../api/deal/index.js'
    import * as ShopAPI from '../api/shop/index.js'
    import * as ShopCarAPI from '../api/shopCar/index.js'
    import { defineComponent } from 'vue'
    import { ElMessage } from 'element-plus'
    export default {
        inject:['reload'],
        data(){
            return{
                Select:0,
                Type:[],
                input:"",
                Page:{
                    GoodsCount:0,
                    //页面大小
                    PageSize:10,
                    //页码数目
                    PageCount:0,
                    //当前页数
                    CurrentPage:0
                },
                GoodsList:[]
            }
        },
        created(){
            GoodAPI.getAllGoodsCount().then(res=>{
                //种类数据
                GoodAPI.getGoodsType().then(res =>{
                    this.Type=res.data.result[0]
                    console.log(this.Type)
                })
                
                let GoodsCount=res.data.result[0].GoodsCount
                this.Page.GoodsCount=GoodsCount
                this.Page.PageCount=(this.Page.GoodsCount/10)+1
                //默认获取第一页数据
                GoodAPI.getGoodsDetail(1).then(res=>{
                    this.GoodsList=res.data.result[0]
                    //数据处理
                    for (let i=0;i< this.GoodsList.length;i++){
                        //图片处理
                        this.GoodsList[i]['PictureUrl']=this.PictureDeal(this.GoodsList[i].pictureList)
                    }
                    //console.log(this.GoodsList)
                })
            })

        },
        methods: {
            PictureDeal(a) {
                //将穿进来的照片列表处理，只取第一个然后将其处理成图片url
                if (a.length > 0) {
                    let path = JSON.stringify(a[0].picturePath)
                    path = GoodAPI.remdou(path)
                    return path
                } else {
                    return 0
                }

            },
            gotogoods(item) {
                this.$router.push({path: '/gooddetail', query: {goodsUUID: item}})
            },
            showMessage(data, status) {
                this.$message({
                    type: status,
                    message: data
                });
            },
            find() {
                GoodAPI.getMuoGoodsCount(this.input).then(res => {
                    let GoodsCount = res.data.result[0].GoodsCount
                    this.Page.GoodsCount = GoodsCount
                    this.Page.PageCount = (this.Page.GoodsCount / 10) + 1
                    GoodAPI.getMuoGoodsDetail(this.input,1).then(res => {
                        this.GoodsList = res.data.result[0]
                        //数据处理
                        for (let i = 0; i < this.GoodsList.length; i++) {
                            //图片处理
                            this.GoodsList[i]['PictureUrl'] = this.PictureDeal(this.GoodsList[i].pictureList)
                        }
                    })
                })
            },
            handleCurrentChange(){
                if(this.input==""){
                    //换页则请求当前页
                    GoodAPI.getGoodsDetail(this.Page.CurrentPage).then(res=>{
                        if(res.data.code==206){
                            this.GoodsList=res.data.result[0]
                            //数据处理
                            for (let i=0;i< this.GoodsList.length;i++){
                                //图片处理
                                this.GoodsList[i]['PictureUrl']=this.PictureDeal(this.GoodsList[i].pictureList)
                            }
                            //console.log(this.GoodsList)
                        }else{
                            this.showMessage("访问错误",'info')
                        }

                    })
                }else{
                    //换页则请求当前页
                    GoodAPI.getMuoGoodsCount(this.input,this.Page.CurrentPage).then(res=>{
                        if(res.data.code==206){
                            this.GoodsList=res.data.result[0]
                            //数据处理
                            for (let i=0;i< this.GoodsList.length;i++){
                                //图片处理
                                this.GoodsList[i]['PictureUrl']=this.PictureDeal(this.GoodsList[i].pictureList)
                            }
                            //console.log(this.GoodsList)
                        }else{
                            this.showMessage("访问错误",'info')
                        }

                    })
                }

            },
            handleClick(tab, event) {
                console.log(tab, event);
            },
            goout(){
                var exp = new Date();
                exp.setTime(exp.getTime() - 1);
                if(this.userId=!null){
                    document.cookie = "userId:"+"="+""+";expires="+exp.toGMTString()
                }
                if(this.businesssId=!null){
                    document.cookie = "businesssId:"+"="+""+";expires="+exp.toGMTString()
                }
                if(this.admin=!null){
                    document.cookie = "admin:"+"="+""+";expires="+exp.toGMTString()
                }
                this.dialogVisible=false
                this.reload()
            } ,gotologin(){
                console.log("aa")
                this.$router.push('/login');
            },
        }
    }

</script>

<style scoped>
    .el-input {
        margin-left: 200px;
        margin-right: 30px;
        width: 60%;

        border: 1px solid #ccc;

        float: left;

        box-sizing: border-box;
    }
    .el-button{
        float: left;
    }
</style>
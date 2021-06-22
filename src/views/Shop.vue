<!--
 * @Author: sun
 * @Date: 2021/6/17 22:24
 * @title: Shop
 * @Description:
 * @version: 1.0
 -->
<template>
    <el-container :class="{gray:ShopData.status==0}">
        <el-aside width="200px">
<!--            商家信息展示-->
            <p @click="gotoshop()">{{ShopData.shopName}}</p>
            <div >
                <p>店家好评率{{ShopData.praiseRate}}</p>
            </div>
            <el-rate
                    v-model="ShopData.praiseCount"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="店家好评度">
            </el-rate>
            <p>开店时间{{ShopData.createTime}}</p>
            <p>{{ShopData.level}}级店家</p>
            
            
            
        </el-aside>
        <el-container>
            <el-header>
                <el-input v-model="input" placeholder="请输入搜索内容"></el-input>
                <el-button type="primary" @click="find">本店搜索</el-button>
            </el-header>

            <el-main>
                <el-row>
                    <el-col :span="8" v-for="item in GoodsList" :offset="1">
                        <el-card :body-style="{ padding: '0px',height:'300px' }" @click="gotogoods(item.goodsUUID)">
                            <div v-if="item.PictureUrl==0">
                                <el-image>
                                </el-image>
                            </div>

                            <div v-if="item.PictureUrl!=0">
                                <el-image
                                        style="width: 100%; height: 100%"
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
    import {returnDeal} from "@/api/deal";
    export default {
        inject:['reload'],
        data(){
            return {
                input:"",
                ShopData:{
                        shopId:"",
                        shopUUID:"",
                        shopName:"",
                        businessId:"",
                        level:"",
                        //好评率
                        praiseRate:0.0,
                        praiseCount:0,
                        //成交量
                        dealCount:0,
                        createTime:"",
                        status:0,
                },
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
           this.ShopData.shopUUID = this.$route.query.shopUUID
            //商家信息处理
            ShopAPI.getShopDetail(this.ShopData.shopUUID).then(res=>{
                let shop = res.data.result[0][0]
                this.ShopData.businessId=JSON.stringify(shop.businessId).split("\"")[1]
                this.ShopData.createTime=JSON.stringify(shop.createTime).split("\"")[1]
                this.ShopData.dealCount=JSON.stringify(shop.dealCount)
                this.ShopData.level=JSON.stringify(shop.level)
                this.ShopData.praiseCount=JSON.stringify(shop.praiseCount)
                this.ShopData.praiseRate=JSON.stringify(shop.praiseRate)
                this.ShopData.shopId=JSON.stringify(shop.shopId).split("\"")[1]
                this.ShopData.shopName=JSON.stringify(shop.shopName).split("\"")[1]
                this.ShopData.shopUUID=JSON.stringify(shop.shopUUID).split("\"")[1]
                this.ShopData.status=JSON.stringify(shop.status).split("\"")[1]
                //商品数据获取
                ShopAPI.getGoodsCount(this.ShopData.shopUUID).then(res=>{
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

            })

        },
        methods: {
            handleCurrentChange(){
                if(this.input==""){
                    //换页则请求当前页
                    ShopAPI.getGoodsDetail(this.ShopData.shopUUID,this.Page.CurrentPage).then(res=>{
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
                    ShopAPI.getShopMuoGoodsCount(this.ShopData.shopUUID,this.input,this.Page.CurrentPage).then(res=>{
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

            PictureDeal(a){
                //将穿进来的照片列表处理，只取第一个然后将其处理成图片url
                if(a.length>0){
                    let path = JSON.stringify(a[0].picturePath)
                    path = GoodAPI.remdou(path)
                    return path
                }else{
                    return 0
                }
               
            },
            gotogoods(item){
                this.$router.push({path:'/gooddetail',query:{goodsUUID:item}})
            },
            showMessage(data,status){
                this.$message({
                    type: status,
                    message: data
                });
            },
            find(){
                ShopAPI.getShopMuoGoodsCount(this.ShopData.shopUUID,this.input).then(res=>{
                    let GoodsCount=res.data.result[0].GoodsCount
                    this.Page.GoodsCount=GoodsCount
                    this.Page.PageCount=(this.Page.GoodsCount/10)+1
                    ShopAPI.getShopMuoGoodsDetail(this.ShopData.shopUUID,this.input,1).then(res=>{
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
            gotoshop(){
                console.log(this.ShopData.shopUUID)
                this.reload()
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

    li{
        padding: 3px;
        list-style: none;
        margin-right: 15px;
        border: 1px solid #eee;
    }
    img{
        width: 200px;
        height: 150px;
    }
    .gray{
        background-color:gray;
    }
</style>
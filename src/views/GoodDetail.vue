<!--
 * @Author: sun
 * @Date: 2021/6/6 14:53
 * @title: GoodDetail
 * @Description:
 * @version: 1.0
 -->
<template>
    <el-container :class="{gray:goodsData.status=='0'}">
     <!--照片-->
           <el-main>
               <el-container>
                   <el-aside width="500px">
                       <el-carousel indicator-position="outside">
                           <el-carousel-item v-for="item in goodsPicture" :key="item">
                               <el-image
                                       style="width: 100%; height: 100%"
                                       :src="item"
                                       :fit="fill"></el-image>
                           </el-carousel-item>
                       </el-carousel>
                   </el-aside>

                   <!--信息展示-->
                   <el-main class="details-content">
                       <div id="simple">
                           <div class="tb-detail-hd">
                               <h1 >{{goodsData.goodsName}}</h1>
                           </div>
                           <div >
                               <dl class="price-bacckground">
                                   <dt class="price">价格</dt>
                                   <dt>
                                       <em>¥</em>
                                       <span>{{goodsData.goodsPrice}}</span>
                                   </dt>
                               </dl>
                           </div>

                           <div>
                               <el-input readonly placeholder="本商品不支持商讨价格"></el-input>
                           </div>

                           <el-input-number v-model="num" @change="handleChange" :min="1" :max=goodsData.goodsCount label="购买商品数量"></el-input-number>

                           <el-button type="primary">立即购买</el-button>
                           <el-button type="primary">加入购物车</el-button>
                           <div>
                               <dl>
                                   <dt class="price">服务承诺</dt>
                                   <dt>
                                       <span>正品保障</span>
                                       <span>急速退款</span>
                                   </dt>
                               </dl>

                           </div>
                       </div>

                   </el-main>
               </el-container>
           </el-main>

        <el-footer>
            <el-container>
                <el-aside width="200px">
                    <p @click="gotoshop()">{{shopData.shopName}}</p>
                    <div >
                        <p>店家好评率{{shopData.praiseRate}}</p>
                    </div>
                    <el-rate
                            v-model="shopData.praiseCount"
                            disabled
                            show-score
                            text-color="#ff9900"
                            score-template="店家好评度">
                    </el-rate>
                    <p>开店时间{{shopData.createTime}}</p>
                    <p>{{shopData.level}}级店家</p>



                </el-aside>
                <el-main>
                    <div id="select">
                        <el-tabs v-model="activeName" @tab-click="handleClick">
                            <el-tab-pane label="商品详情" name="first">
                                <el-descriptions title="商品详情列表" direction="vertical" :column="4" border>
                                    <el-descriptions-item label="商品名称">{{goodsData.goodsName}}</el-descriptions-item>
                                    <el-descriptions-item label="商品类型">{{goodsData.goodsType}}</el-descriptions-item>
                                    <el-descriptions-item label="商品价格">{{goodsData.goodsPrice}}</el-descriptions-item>
                                    <el-descriptions-item label="商品描述">{{goodsData.goodsDescription}}</el-descriptions-item>
                                    <el-descriptions-item label="商品大小">{{goodsData.size}}</el-descriptions-item>
                                    <el-descriptions-item label="商品是否可以议价">{{Bargain}}</el-descriptions-item>
                                    <el-descriptions-item label="商品折扣">{{goodsData.discount}}</el-descriptions-item>
                                    <el-descriptions-item label="折后价格">{{goodsData.goodsDiscountPrice}}</el-descriptions-item>
                                    <el-descriptions-item label="商品已售量">{{goodsData.goodsCount}}</el-descriptions-item>
                                    <el-descriptions-item label="商品库存量">{{goodsData.goodsDealCount}}</el-descriptions-item>
                                    <el-descriptions-item label="商品成色">{{goodsData.damageLevel}}成新</el-descriptions-item>
                                </el-descriptions>
                            </el-tab-pane>

                            <el-tab-pane label="图片展示" name="second">
                                <div v-for="item in goodsPicture" :key="item">
                                    <el-image
                                            style="width: 100%; height: 100%"
                                            :src="item"
                                            :fit="fill"></el-image>
                                </div>
                            </el-tab-pane>

                            <el-tab-pane label="商品评价" name="third">
                                <div>
                                    <div >
                                        <p>商品好评率{{goodsData.goodsPraiseCount}}</p>
                                    </div>

                                    <el-rate
                                            v-model="goodsData.goodsPraiseRate"
                                            disabled
                                            show-score
                                            text-color="#ff9900"
                                            score-template="商品好评度">
                                    </el-rate>
                                </div>


                                <div id="setGoodsComment">
                                    <el-button type="primary" @click="setGoodsComment()">评价商品</el-button>
                                </div>
                                <div v-for="item in commentlist" :key="item.commentId">
                                    <div >
                                        <h5>{{item.username}}</h5>
                                        <h5>{{item.commentContent}}</h5>
                                        <div v-if="item.reply!=null">
                                            <h5>{{item.reply.username}}回复:{{item.username}}</h5>
                                            <h5>{{item.reply.commentContent}}</h5>
                                        </div>
                                    </div>

                                </div>

                            </el-tab-pane>

                        </el-tabs>


                        <el-dialog title="评论" v-model="setGoodsCommentNode">
                            <el-form :model="form">
                                <el-form-item label="添加评论" :label-width="formLabelWidth">
                                    <el-input v-model="goodsComment" autocomplete="off"></el-input>
                                </el-form-item>

                            </el-form>
                            <template #footer>
                                <span class="dialog-footer">
                                  <el-button @click="setGoodsCommentNode=false">取 消</el-button>
                                  <el-button type="primary" @click="insetGoodsComment()">确 定</el-button>
                                </span>
                            </template>
                        </el-dialog>



                    </div>

                </el-main>


            </el-container>
        </el-footer>
    </el-container>



</template>

<script>
    import * as GoodAPI from '../api/good/index.js'
    import * as UserAPI from '../api/user/index.js'
    import * as DealAPI from '../api/deal/index.js'
    import * as ShopAPI from '../api/shop/index.js'
    import { defineComponent } from 'vue'
    import { ElMessage } from 'element-plus'
    export default {
        inject:['reload'],
        data() {
            return {
                activeName: 'first',
                num: 1,
                UserId:"",
                goodsPicture: [],
                goodsComment:"",
                Bargain:"不接受",
                commentlist:[],
                setGoodsCommentNode:false,
                goodsData: {
                    goodsId: "",
                    goodsUUID: "",
                    shopUUID: "",
                    goodsName: "",
                    goodsDescription: "",
                    size: "",
                    goodsType: "",
                    isBargain: "0",//是否可以讨价还价
                    Bargainprice: 0,
                    status: "1",//是否下架，0为下架
                    goodsPrice: 200.0,
                    goodsCount: 11,//商品数量
                    goodsPraiseCount: 0,//好评数量，如果超过3分，好评数加1
                    goodsPraiseRate: 0.0,//好评率
                    goodsDealCount: 12,//商品交易量
                    damageLevel: 10,//损坏程度，10为全新
                    discount: 100,//折扣
                    goodsDiscountPrice: 200.0,
                },
                shopData:{
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
                    createTime:""
                }
            }

        },
        created() {
            //console.log(this.$route.query.goodsUUID)
            let goodsUUID = this.$route.query.goodsUUID
            GoodAPI.getGoodDetail(goodsUUID).then(res => {
               // console.log(res)
                let data = res.data.result[0]

                //照片数据处理
                let picture = JSON.stringify(data.pictureList)
                picture = JSON.parse(picture)
                //console.log(picture)
                for (let i = 0; i < picture.length; i++) {
                    let path = JSON.stringify(picture[i].picturePath)
                    //console.log(path)
                    this.goodsPicture.push(GoodAPI.remdou(path))
                    //console.log(this.goodsPicture)
                }
                //console.log(this.goodsPicture)

                //商品数据处理
                this.goodsData.goodsId = GoodAPI.remdou(JSON.stringify(data.goodsId))
                this.goodsData.goodsId = JSON.stringify(data.goodsId)
                this.goodsData.goodsUUID = JSON.stringify(data.goodsUUID)
                this.goodsData.shopUUID = JSON.stringify(data.shopUUID).split("\"")[1]


                //商家信息处理

                ShopAPI.getShopDetail(this.goodsData.shopUUID).then(res=>{
                    let shop = res.data.result[0][0]
                    this.shopData.businessId=JSON.stringify(shop.businessId).split("\"")[1]
                    this.shopData.createTime=JSON.stringify(shop.createTime).split("\"")[1]
                    this.shopData.dealCount=JSON.stringify(shop.dealCount)
                    this.shopData.level=JSON.stringify(shop.level)
                    this.shopData.praiseCount=JSON.stringify(shop.praiseCount)
                    this.shopData.praiseRate=JSON.stringify(shop.praiseRate)
                    this.shopData.shopId=JSON.stringify(shop.shopId).split("\"")[1]
                    this.shopData.shopName=JSON.stringify(shop.shopName).split("\"")[1]
                    this.shopData.shopUUID=JSON.stringify(shop.shopUUID).split("\"")[1]
                })
                //console.log(this.shopData)



                this.goodsData.goodsName = JSON.stringify(data.goodsName)
                this.goodsData.goodsDescription = JSON.stringify(data.goodsDescription)
                this.goodsData.size = JSON.stringify(data.size)

                //种类信息处理
                GoodAPI.getGoodsType().then(res =>{
                    let code = JSON.stringify(data.goodsType)
                    let d=res.data.result[0]

                    for(let i=0;i<d.length;i++){
                        if(code ==d[i].typeCode){
                            this.goodsData.goodsType=d[i].type
                        }
                    }

                })

                this.goodsData.isBargain = JSON.stringify(data.isBargain)
                this.goodsData.status = JSON.stringify(data.status)
                this.goodsData.goodsCount = JSON.stringify(data.goodsCount)
                this.goodsData.goodsPrice = JSON.stringify(data.goodsPrice)
                this.goodsData.goodsCount = JSON.stringify(data.goodsCount)
                this.goodsData.goodsPraiseCount = JSON.stringify(data.goodsPraiseCount)
                this.goodsData.goodsPraiseRate = JSON.stringify(data.goodsPraiseRate)
                this.goodsData.goodsDealCount = JSON.stringify(data.goodsDealCount)
                this.goodsData.damageLevel = JSON.stringify(data.damageLevel)
                this.goodsData.discount = JSON.stringify(data.discount)
                this.goodsData.goodsDiscountPrice = JSON.stringify(data.goodsDiscountPrice)

                //更新库存量
                this.goodsData.goodsCount =this.goodsData.goodsCount-this.goodsData.goodsDealCount
               // console.log(this.goodsData.status)
               // console.log(JSON.stringify(data.status)
               // console.log(goodsUUID)
                //商品评价


        })
            var commentlist
            GoodAPI.getComment(goodsUUID).then(res => {
                commentlist=res.data.result[0]
                //console.log(commentlist)

                //这里只能用let，用var就会出错
                for(let i=0;i<commentlist.length-1;i++){
                    UserAPI.getUserId(commentlist[i].userId).then(res =>{
                        //console.log(commentlist[i])
                        let username=res.data.result[0].username
                        commentlist[i]["username"]=username
                    })

                    if(commentlist[i].replyId!=null){
                        for(let y=0;y<this.commentlist.length;y++){
                            if(commentlist[i].replyId==this.commentlist[y].commentId){
                                this.commentlist[y]["reply"]=commentlist[i]
                            }
                        }
                    }else{
                        this.commentlist.push(commentlist[i])
                    }
                }

            })

            //console.log(this.commentlist)




            },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            isLogin() {
                //判断登录
                var userId = UserAPI.getCookie("userId")
                console.log(userId)
                // const loginUser = localStorage.getItem('userId')
                // 判断路由是否设置相应校验用户权限
                if (!userId) {
                    // 没有登录，转到登录界面
                    window.alert("请先登录");
                    localStorage.setItem("nextpush", this.goodsData.goodsUUID)
                    this.$router.push('/login')
                } else {
                    this.UserId = userId
                }
            },
            setGoodsComment() {
                this.isLogin()
                let num=0
                let num1=0
                for (let i=0;i<this.commentlist.length;i++){
                   if (this.commentlist[i].commentId==this.UserId){
                       num++
                   }
                }

                let d=this.goodsData.goodsUUID.split("\"")
                d=d[1]
                DealAPI.getGoodsUserNum(d,this.UserId).then(res=>{
                    num1 = res.data.result[0]
                    console.log(num1)
                })

                if(num1.length>num){
                    this.$alert('您只有购买本商品且点击收货后方可成功评价，否则将评价失败', '商品评价提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                                type: 'info',
                                message: `action: ${action}`
                            });
                            this.setGoodsCommentNode = true;
                        }
                    });
                }else{
                    this.$alert('您已经评价过了', '商品评价提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                                type: 'info',
                                message: `action: ${action}`
                            });
                            this.setGoodsCommentNode = false;
                        }
                    });
                }




            },
            insetCommentresult(result) {
                if (result == true) {
                    this.setGoodsCommentNode = false
                    ElMessage.success({
                        message: '评论成功',
                        type: 'success'
                    });
                    this.reload()
                } else {
                    ElMessage.warning({
                        message: '评论失败',
                        type: 'warning'
                    });
                }
            },
            insetGoodsComment() {
                let formData = new FormData();
                formData.append("goodsUUID", GoodAPI.remdou(this.goodsData.goodsUUID))
                formData.append("userId", this.UserId)
                formData.append("commentContent", this.goodsComment)
                // console.log(GoodAPI.remdou(this.goodsData.goodsUUID))
                // console.log(this.UserId)
                // console.log(this.goodsComment)
                GoodAPI.insertComment(formData).then(res => {
                    console.log(res.data.code)
                    if (res.data.code == 229) {
                        this.insetCommentresult(true)
                    } else {
                        this.insetCommentresult(false)
                    }
                })
            },
            gotoshop(){
                this.$router.push({path:'/Shop',query:{shopUUID:this.shopUUID}})
            }

            }

    }


</script>

<style scoped>
    .gray{
        background-color:gray;
    }
    .tb-detail-hd {
        padding: 20px 10px 12px;
        color: #000;
    }

    .price-bacckground{
        background-image: url("../assets/price-background.png") ;

    }
    .price{
        float: left;
    }

</style>
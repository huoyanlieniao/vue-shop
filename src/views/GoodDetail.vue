<!--
 * @Author: sun
 * @Date: 2021/6/6 14:53
 * @title: GoodDetail
 * @Description:
 * @version: 1.0
 -->
<template>
    <el-container :class="{gray:goodsData.status==0}">
     <!--照片-->
        <div class="total">
            <div class="header">
                <div class="logo-con w clearfix">
<!--                    <a href="https://www.jd.com" class="logo"></a>-->
                    <div class="logo-title">商品详情页</div>
<!--                    <div class="have-account">已有账号？-->
<!--                        <a href="http://localhost:8080/login?ReturnUrl=http://localhost:8080/">-->
<!--                            <font color="#FF0000">请登录&gt;</font>-->
<!--                        </a>-->
<!--                    </div>-->
                </div>
            </div>


        <div class="body">
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
                            <el-input readonly placeholder="本商品不支持商讨价格" style="width:50%;margin-right:10px;float:left;"></el-input>
                        </div>


                        <el-button type="primary" @click="buyNow()" :disabled="goodsData.status===0">立即购买</el-button>
                        <el-button type="primary" @click="addShopCar()" :disabled="goodsData.status===0">加入购物车</el-button>
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
        </el-main></div>

            <div class="bottom"><el-footer>
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
                                        <el-descriptions-item label="商品已售量">{{goodsData.goodsDealCount}}</el-descriptions-item>
                                        <el-descriptions-item label="商品库存量">{{goodsData.goodsCount}}</el-descriptions-item>
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
                                    <div class="goodsComment">
                                        <div class="goodsCommentrate">
                                            <div class="c1">
                                                <p>商品好评率{{goodsData.goodsPraiseCount}}</p>
                                            </div>

                                            <div class="c2">
                                                <el-rate
                                                        v-model="goodsData.goodsPraiseRate"
                                                        disabled
                                                        show-score
                                                        text-color="#ff9900"
                                                        score-template="商品好评度">
                                                </el-rate>
                                            </div>


                                            <div id="setGoodsComment" class="c3">
                                                <el-button type="primary" @click="setGoodsComment()">评价商品</el-button>
                                            </div>
                                        </div>



                                        <div v-for="item in commentlist" :key="item.commentId" class="Comment">
                                            <div class="commentUser">
                                                <h5>客户：{{item.username}}</h5>
                                                <h5>评价：{{item.commentContent}}</h5>
                                            </div>
                                            <div v-if="item.reply!=null" class="commentReply">
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
            </el-footer></div>
        </div>
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
        data() {
            return {
                Isbussiness:false,
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
                    status: 1,//是否下架，0为下架
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
            let businesssId=UserAPI.getCookie("businesssId:")
            if(businesssId!=""){
                console.log(businesssId)
                this.Isbussiness=true
            }else{
                this.Isbussiness=false
            }
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

                //设置商品状态
                if(this.goodsData.goodsCount<this.goodsData.goodsDealCount){
                    this.goodsData.status=0
                }else{
                    this.goodsData.status=1
                }
                //更新库存量
                this.goodsData.goodsCount =this.goodsData.goodsCount-this.goodsData.goodsDealCount
               // console.log(this.goodsData.status)
               // console.log(JSON.stringify(data.status)
               // console.log(goodsUUID)


                GoodAPI.getComment(GoodAPI.remdou(this.goodsData.goodsUUID)).then(res => {
                   // console.log(res)
                    this.commentlist=res.data.result[0]
                    //console.log(this.commentlist)

                    for(let i=0;i<=this.commentlist.length-1;i++){
                        UserAPI.getUserId(this.commentlist[i].userId).then(res =>{
                            //console.log(this.commentlist[i].userId)
                            let username=res.data.result[0].username
                            this.commentlist[i]["username"]=username
                        })

                        if(this.commentlist[i].replyId!=null){
                            for(let y=0;y<this.commentlist.length;y++){
                                if(this.commentlist[i].replyId==this.commentlist[y].commentId){
                                    this.commentlist[y]["reply"]=this.commentlist[i]
                                }
                            }
                        }
                    }
                    console.log(this.commentlist)
                })

        })







            },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            isLogin() {
                //判断登录
                var userId = UserAPI.getCookie("userId:")
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
                if(this.Isbussiness){
                    this.showMessage("请在商家页面评价",'info')
                    return
                }
                console.log(this.UserId)
                if (this.UserId!=""){
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
                    })

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
                this.$router.push({path:'/shop',query:{shopUUID:this.shopUUID}})
            },
            buyNow(){
                if(this.Isbussiness){
                    this.showMessage("商家不可购买商品",'info')
                    return
                }
                this.isLogin()

                //console.log(this.goodsData.goodsU)
                if (this.UserId!=""){
                    localStorage.setItem("nextpush", this.goodsData.goodsUUID)
                    console.log(this.shopData.shopUUID)
                    this.$router.push({path:'/Deal',query:{goodsPicture:this.goodsPicture,shop:this.shopData.shopUUID,
                            commentId:this.UserId,
                            goodsUUID:this.goodsData.goodsUUID,
                        }})
                }

            },
            addShopCar(){
                if(this.Isbussiness){
                    this.showMessage("商家不可购买商品",'info')
                    return
                }
                this.isLogin()
                if (this.UserId!=""){
                        this.$confirm('是否将本商品添加到购物车?', '添加购物车', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            ShopCarAPI.isLive(GoodAPI.remdou(this.goodsData.goodsUUID),this.UserId).then(res =>{
                                console.log(res)
                                let data=res.data.result
                                if (data[0]!=null){
                                    console.log(data)
                                    if(data[0].status="0"){
                                        ShopCarAPI.updateGoods(GoodAPI.remdou(this.goodsData.goodsUUID),this.UserId,0)
                                        this.showMessage('该商品已在购物车中','success')
                                    }else{
                                        ShopCarAPI.updateGoods(GoodAPI.remdou(this.goodsData.goodsUUID),this.UserId,0)
                                        this.showMessage('该商品添加成功','success')
                                    }

                                }else{
                                    //购物车没该商品
                                    let formData=new FormData();
                                    formData.append("goodsUUID",GoodAPI.remdou(this.goodsData.goodsUUID));
                                    formData.append("commonId",this.UserId);
                                    formData.append("goodsCount",this.num);
                                    ShopCarAPI.insertGoods(formData).then(res=>{
                                        if(res.data.code ==224){
                                            this.showMessage('该商品添加成功','success')
                                        }else{
                                            this.showMessage('该商品添加失败','info')
                                        }

                                    })

                                    }

                                })

                            }).catch(() => {
                                this.showMessage('已取消','info')
                        });

                }
            },

            showMessage(data,status){
                this.$message({
                    type: status,
                    message: data
                });
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


            },

    }


</script>

<style scoped>
    /*.gray{*/
    /*    background-color:gray;*/
    /*}*/
    /*.tb-detail-hd {*/
    /*    padding: 20px 10px 12px;*/
    /*    color: #000;*/
    /*}*/

    /*.price-bacckground{*/
    /*    background-image: url("../assets/price-background.png") ;*/

    /*}*/
    /*.price{*/
    /*    float: left;*/
    /*}*/
    .gray {
        background-color: gray;
    }

    .tb-detail-hd {
        padding: 20px 10px 12px;
        color: #000;
    }

    .price-bacckground {
        background-image: url("../assets/price-background.png");
    }

    .price-bacckground em {
        font-size: 20px;
    }

    .price-bacckground span {
        font-size: 20px;
    }

    .price {
        font-size: 20px;
        float: left;
    }

    .price-info span {
        font-size: 20px;
    }

    .commentUser {
        text-align: left;
        margin: 5px;
        border: 10px solid #000
    }

    .commentReply {
        text-align: left;
        margin: 5px;
        border: 10px solid #000
    }
    .c1{
        font-size: 15px;
        height:10px;
        float:left;
        margin-right: 180px;
    }
    .c2{
        float:left;
        margin-right: 150px;

    }
    .c3{
        width:20%;
        height:20%;
        float:left;
    }


    .goodsCommentrate {
        text-align: left;
        height:50px;
        margin: 5px;
        border: 10px solid #000;
        padding: 15px;
        align-items: center;
    }


    .header {
        height: 110px;
        background: url(//misc.360buyimg.com/user/reg/3.0.0/css/i/headbg.jpg) repeat-x left bottom;
    }

    .header .logo {
        width: 120px;
        height: 80px;
        margin-top: 26px;
        margin-right: 1.25rem;
        float: left;
        background: url(../assets/logo1.png) no-repeat;
        background-size: cover;
    }

    .clearfix:after {
        content: ".";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }

    .header .have-account {
        font-size: 22px;
        float: right;
        height: 50px;
        margin-top: 34px;
        color: #999;
    }

    .header .logo-title {
        float: left;
        height: 34px;
        line-height: 34px;
        font-size: 34px;
        color: #333;
        margin-top: 54px;
    }

    .w {
        width: 1210px;
    }

    .body {
        margin-top: 40px;
        height: 300px;
        padding-top: 40px;
        padding-right: 20px;
        width: auto;
    }

    .bottom {
        margin-top: 40px;
        height: 400px;
        padding-top: 40px;
        padding-right: 20px;
        width: auto;
    }

    .total {}

</style>
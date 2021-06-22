<!--
 * @Author: sun
 * @Date: 2021/6/15 19:34
 * @title: Deal
 * @Description:
 * @version: 1.0
 -->
<template>

    <div class="header">
        <div class="logo-con w clearfix">
            <!--                <a href="https://www.jd.com" class="logo "></a>-->
            <!--                <div class="logo-title">用户详细信息</div>-->
            <!--&lt;!&ndash;                <div class="have-account">已有账号？ <a href="http://localhost:8080/login?ReturnUrl=http://localhost:8080/">&ndash;&gt;-->
            <!--&lt;!&ndash;                    <font color="#FF0000">请登录&gt;</font>&ndash;&gt;-->
            <!--&lt;!&ndash;                </a></div>&ndash;&gt;-->
            <div class="have-account">
                <p>剩余钱数:{{UserData.currentMondy}} 积分:{{UserData.Userintegral}} 总钱数:{{UserData.UsersumMoney}}</p>
            </div>
        </div>
    </div>

    <el-row>
        <el-col :span="24"><div class="grid-content bg-purple">
            <P>用户地址{{UserData.UserAddress}}</P>
        </div></el-col>
    </el-row>
    <el-row>
        <el-col :span="10"><div class="grid-content bg-purple">
            <p>确认订单信息</p>
        </div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple-light">
            <p @click="gotoshop()">店铺:{{shopData.shopName}}</p>
        </div></el-col>
    </el-row>
    <el-row>

        <el-col :span="6"><div class="grid-content bg-purple">
            <el-image
                    style="width: 100%; height: 100%"
                    :src="goodsPicture[1]"
                    :fit="fill"></el-image>
        </div></el-col>

        <el-col :span="6"><div class="grid-content bg-purple">
            <p>商品单价{{goodsPrice}}</p>
            <p>商品折后单价{{goodsDiscountPrice}}</p>
        </div></el-col>

        <el-col :span="6"><div class="grid-content bg-purple">
            <el-input-number v-model="num" @change="Calculation" :min="0" :max=goodsCount label="购买商品数量" ></el-input-number>
        </div></el-col>

        <el-col :span="6"><div class="grid-content bg-purple-light">
            <p>总金额:{{money}}</p>
        </div></el-col>


    </el-row>
    <el-row>
        <el-col :span="4"><div class="grid-content bg-purple">
            <el-button type="primary" @click="Submit()">提交订单</el-button>
        </div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
    </el-row>

    <el-dialog title="商品购买" v-model="CanbuyNode">
        <p>您的余额不足，是否充值</p>
        <template #footer>
                                <span class="dialog-footer">
                                  <el-button @click="CanbuyNode=false">取 消</el-button>
                                  <el-button type="primary" @click="addMoney()">充 值</el-button>
                                </span>
        </template>
    </el-dialog>

    <el-dialog title="充值" v-model="addMoneyNode">
        <p>充值金额</p>
        <el-input v-model="addMoneynum"></el-input>
        <template #footer>
                                <span class="dialog-footer">
                                  <el-button @click="addMoneyNode=false">取 消</el-button>
                                  <el-button type="primary" @click="addMoneygo()">充 值</el-button>
                                </span>
        </template>
    </el-dialog>
</template>

<script>
    import * as GoodAPI from '../api/good/index.js'
    import * as UserAPI from '../api/user/index.js'
    import * as DealAPI from '../api/deal/index.js'
    import * as ShopAPI from '../api/shop/index.js'
    import * as WalletAPI from '../api/wallet/index.js'
    import { h } from 'vue'
    import { defineComponent } from 'vue'
    import { ElMessage } from 'element-plus'
 export default {
     inject:['reload'],
     data() {
         return {
             num: 0,
             UserId: "",
             goodsPicture: [],
             commentlist: [],
             goodsName:"",
             goodsUUID: "",
             goodsPrice: 200.0,
             goodsCount: 0,//商品数量
             goodsDiscountPrice: 200.0,
             addMoneyNode:false,
             CanbuyNode:false,
             addMoneynum:0,
             shopUUID: "",
             money:0,
             shopData:[],
             UserData:{
                 Username:"",
                 UserId: "",
                 UserAddress:"",
                 //积分
                 Userintegral:0,
                 UsersumMoney:0,
                 currentMondy:0
             }


         }

     },
     created(){
         let shopUUID=this.$route.query.shop
         //商家信息处理
         console.log(shopUUID)
         ShopAPI.getShopDetail(shopUUID).then(res=>{
             this.shopData= res.data.result[0][0]
             console.log(this.shopData)
             
         })
         
         
         
         
        this.shopData=this.$route.query.shop
         console.log(this.shopData)
        this.UserData.UserId=this.$route.query.commentId
        this.goodsPicture=this.$route.query.goodsPicture
        let a=this.$route.query.goodsUUID
         this.goodsUUID=a.split("\"")[1]
         //商品信息请求
         GoodAPI.getGoodDetail(this.goodsUUID).then(res => {
             let data = res.data.result[0]
             this.goodsName = JSON.stringify(data.goodsName)
             this.goodsCount = JSON.stringify(data.goodsCount)
             this.goodsPrice = JSON.stringify(data.goodsPrice)
             this.goodsDiscountPrice = JSON.stringify(data.goodsDiscountPrice)
             //更新库存量
             this.goodsCount =this.goodsCount- JSON.stringify(data.goodsDealCount)
             let d=JSON.stringify(data.shopUUID).split("\"")[1]
             this.shopUUID=d
         })

         //用户信息请求
         UserAPI.getUserId(this.UserData.UserId).then(res =>{
             let data=res.data.result[0]
             this.UserData.UserAddress=JSON.stringify(data.city)
             let a=JSON.stringify(data.username)
             this.UserData.Username=a.split("\"")[1]
         })
         //钱包信息请求
         WalletAPI.getWallet(this.UserData.UserId).then(res=>{
             let data=res.data.result[0]
             this.UserData.currentMondy=parseFloat(JSON.stringify(data.currentMoney))
             this.UserData.Userintegral=parseFloat(JSON.stringify(data.integral))
             this.UserData.UsersumMoney=parseFloat((JSON.stringify(data.sumMoney)))
         })

         this.money=this.num*this.goodsDiscountPrice


     },
     methods: {
         gotoshop(){
             this.$router.push({path:'/shop',query:{shopUUID:this.shopUUID}})
         },
         Calculation(){
             this.money=this.num*this.goodsDiscountPrice
         },
         Submit(){
           this.Canbuy()
            if(this.money<this.UserData.currentMondy) {
                let formData=new FormData();
                formData.append("goodsUUID",this.goodsUUID);
                formData.append("shopUUID",this.shopUUID);
                formData.append("commonId",this.UserData.UserId);
                formData.append("dealCount",this.num);

                console.log(this.goodsUUID)
                console.log(this.shopUUID)
                console.log(this.UserData.UserId)
                console.log(this.num)
                DealAPI.insetDeal(formData).then(res=>{
                    let data=res.data
                    if(data.code == 219){
                        WalletAPI.subMoney(this.UserData.Username,this.money).then(res=>{
                            console.log(res)
                        })
                        this.$alert('订单提交成功', '订单提交', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$message({
                                    type: 'info',
                                    message: `action: ${ action }`
                                });
                                if(localStorage.getItem('nextpush')!=null){
                                    let a=localStorage.getItem('nextpush')
                                    a=a.split("\"")
                                    a=a[1]
                                    console.log(a)
                                    localStorage.removeItem('nextpush')
                                    this.$router.push({path:'/gooddetail',query:{goodsUUID:a}});
                                }else{
                                    this.$router.push('/');
                                }
                            }
                        })
            }else{
                        this.$alert('订单提交失败', '订单提交', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$message({
                                    type: 'info',
                                    message: `action: ${ action }`
                                });
                            }
                        })
                    }

                })}
         },
         Canbuy(){
             console.log(typeof this.money)
             console.log(typeof this.UserData.currentMondy)
           if(this.money>this.UserData.currentMondy){
               this.CanbuyNode=true
           }
         },
         addMoney(){
             this.addMoneyNode=true
         },
         addMoneygo(){
             if(this.addMoneynum>0){
                 WalletAPI.addMoney(this.UserData.Username,this.addMoneynum).then(res=>{
                     console.log(res)
                     let data=res.data

                     var box={
                         title: 'aaa',
                         messagetitle: 'bbb',
                         messagemain: 'ccc',
                         type: 'ddd'
                     }

                     if(data.code==227){
                         box.title='消息';
                         box.messagetitle='充值成功';
                         box.messagemain='您已充值成功';
                         box.type='success';
                     }else{
                         box.title='消息',
                             box.messagetitle='错误',
                             box.messagemain='充值失败',
                             box.type='error'
                     }
                     this.$msgbox({
                         title:  box.title,
                         message: h('p', null, [
                             h('span', null,  box.messagetitle),
                             h('i', {style: 'color: teal'}, box.messagemain)
                         ]),
                         type: box.type,
                         confirmButtonText: '确定',
                         cancelButtonText: '取消',
                         beforeClose: (action, instance, done) => {
                             if (action === 'confirm') {
                                 if ( box.type==='success'){
                                 }
                                 done()
                                 this.CanbuyNode=false
                                 this.addMoneyNode=false
                                 this.reload()
                             }else{
                                 done()
                             }

                         }
                     })
                 })}

         }
         ,
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
        background-size:cover;
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
        display: flex;
        justify-content: center;
        align-items: center;
        background-attachment:fixed;
        background-image: url(../assets/userdetail.jpeg);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-top: 40px;
        height: 100%;
        padding-top: 40px;
        padding-right: 20px;
        width: 100%;
        position: center;
    }

    .total {}

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

    .el-input {
        width: 800px;
        float: left;
        -webkit-border-radius: 5px;
        border-radius: 10px;
        -moz-border-radius: 5px;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
        background-clip: padding-box;
    }
    .el-button{
        float: left;
        -webkit-border-radius: 5px;
        border-radius: 10px;
        -moz-border-radius: 5px;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
        background-clip: padding-box;
    }

    .el-radio {
        float: left;
        margin-top: 10px;
    }
    .pics{
        display: flex;
        justify-content: left;
        align-items: left;
    }
    /deep/ .el-upload__tip{
        color:red;
    }
    /deep/ .el-form-item__label{
        color:black;
    }
</style>
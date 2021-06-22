<!--
 * @Author: sun
 * @Date: 2021/6/16 16:25
 * @title: shopCar
 * @Description:
 * @version: 1.0
 -->
<template>
    <div>
        <p>用户名：{{UserData.Username}}</p>
        <p>总钱数：{{UserData.UsersumMoney}}</p>
        <p>余额：{{UserData.currentMondy}}</p>
        <p>积分：{{UserData.Userintegral}}</p>
    </div>
    <div v-if="ShopCarEmpty">
        <p>购物车为空</p>
    </div>
    <div v-if="!ShopCarEmpty">
        <div id="shopCarListShow">
            <el-table
                    ref="multipleTable"
                    :data="ShopCarList"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        label="商品名称"
                        width="120">
                    <template #default="scope">
                        <div @click="clickgoods(scope.row.goodsUUID)">
                            {{ scope.row.goodsName }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        label="商品价格"
                        width="120">
                    <template #default="scope">
                        <div>
                            {{ scope.row.goodsPrice}}
                        </div>
                    </template>
                </el-table-column>

                <el-table-column
                        label="折后价格"
                        width="120">
                    <template #default="scope">
                        <div>
                            {{ scope.row.goodsDiscountPrice}}
                        </div>
                    </template>

                </el-table-column>

                <el-table-column
                        label="店铺"
                        show-overflow-tooltip>
                    <template #default="scope">
                        <div @click="clickShop(scope.row.shopUUID)">
                            {{ scope.row.shopName}}
                        </div>
                    </template>
                </el-table-column>

                <el-table-column
                        label="数量"
                        show-overflow-tooltip>
                    <template #default="scope">
                        <div>
                            <el-input-number v-model="scope.row.goodsNum" @change="Calculation(scope.row.goodsUUID)" :min="1" :max=scope.row.goodsCount ></el-input-number>
                        </div>
                    </template>
                </el-table-column>


                <el-table-column
                        label="总价格"
                        show-overflow-tooltip>
                    <template #default="scope">
                        <div>
                            <p>{{scope.row.sumMoney}}</p>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column label="操作">
                    <template #default="scope">
                        <i class="el-icon-delete" @click="handleDelete(scope.$index, scope.row)"></i>
                    </template>
                </el-table-column>


            </el-table>


            <div id="shopCarSumMoneyShow">
                <p>总价格</p>
                <p>{{ShopCarSumMoney}}</p>
                <el-button type="primary" @click="onSubmit">结算</el-button>
            </div>



        </div>

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


    </div>

</template>

<script>
    import * as UserAPI from '../api/user/index.js'
    import * as ShopCarAPI from '../api/shopCar/index.js'
    import * as GoodAPI from '../api/good/index.js'
    import * as ShopAPI from '../api/shop/index.js'
    import * as WalletAPI from '../api/wallet/index.js'
    import * as DealAPI from '../api/deal/index.js'
    export default {
        inject:['reload'],
        data(){
            return{
                Isbussiness:false,
                addMoneyNode:false,
                CanbuyNode:false,
                addMoneynum:0,
                goodsSelection:[],
                ShopCarEmpty:false,
                ShopCarSumMoney:0,
                ShopCarList: [],
                UserData:{
                    UserId:"",
                    Username:"",
                    //积分
                    Userintegral:0,
                    UsersumMoney:0,
                    currentMondy:0
                },
                checkList: ['选中且禁用','复选框 A']

            }

        },
        created(){
            let businesssId=UserAPI.getCookie("businesssId:")
            if(businesssId!=""){
                this.showMessage("商家无此功能",'info')
                this.$router.push('/')
            }else{
                this.Isbussiness=false
            }

            this.UserData.UserId=UserAPI.getCookie("userId:")
            //用户信息获取
            UserAPI.getUserId(this.UserData.UserId).then(res=>{
                let data=res.data.result[0]
                this.UserData.Username=data.username
            })

            //钱包信息请求
            WalletAPI.getWallet(this.UserData.UserId).then(res=>{
                let data=res.data.result[0]
                this.UserData.currentMondy=parseFloat(JSON.stringify(data.currentMoney))
                this.UserData.Userintegral=parseFloat(JSON.stringify(data.integral))
                this.UserData.UsersumMoney=parseFloat((JSON.stringify(data.sumMoney)))
            })

            //订单信息获取
            ShopCarAPI.getUserShopCar(this.UserData.UserId).then(res=>{
                let data=res.data.result[0]
                //购物车没东西
                if( data.length==0){
                    this.ShopCarEmpty=true
                }else{
                    //商品信息处理
                    for(let i=0;i<data.length;i++){
                        GoodAPI.getGoodDetail(data[i].goodsUUID).then(res=>{
                            let d=res.data.result[0]
                            data[i]['goodsName']=d.goodsName
                            data[i]["goodsPrice"]=d.goodsPrice
                            data[i]["goodsDiscountPrice"]=d.goodsDiscountPrice
                            data[i]["shopUUID"]=d.shopUUID
                            data[i]["goodsCount"]=d.goodsCount-d.goodsDealCount
                            data[i]["goodsNum"]=1
                            data[i]["goodsUUID"]=d.goodsUUID
                            data[i]["sumMoney"]=data[i].goodsDiscountPrice*data[i].goodsNum
                            //商店信息处理
                            ShopAPI.getShopDetail(data[i].shopUUID).then(res=>{
                                let c=res.data.result[0][0]
                                data[i]["shopName"]=c.shopName
                            })
                            
                        })
                        this.ShopCarList.push(data[i])
                    }

                }

            })
            //console.log(this.ShopCarList)
        },
        methods: {
            handleSelectionChange (val) {
                this.goodsSelection=[]

                for(let i=0;i<val.length;i++){
                    this.goodsSelection.push(val[i])
                    this.calculationMoney()
                }
            },
            calculationMoney(){
                for(let i=0;i<this.goodsSelection.length;i++){
                    this.ShopCarSumMoney=0
                    this.ShopCarSumMoney= this.ShopCarSumMoney+this.goodsSelection[i].sumMoney
                }

            },
            clickgoods (value){
                this.$router.push({path:'/gooddetail',query:{goodsUUID:value}})
            },
            clickShop (value){
                this.$router.push({path:'/shop',query:{shopUUID:value}})
            },
            Calculation(value){
                for(let i=0;i<this.ShopCarList.length;i++){
                    if(value==this.ShopCarList[i].goodsUUID){
                        this.ShopCarList[i].sumMoney=this.ShopCarList[i].goodsDiscountPrice*this.ShopCarList[i].goodsNum
                        for(let j=0;j<this.goodsSelection.length;j++){
                            if(value==this.goodsSelection[j].goodsUUID){
                                this.calculationMoney()
                            }
                            break
                        }
                    }
                }
            },
            onSubmit(){
                this.Canbuy()
                if(this.goodsSelection.length>0){
                    this.$confirm('是否提交订单', '提交订单', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let dc=true
                        for(let i=0;i<this.goodsSelection.length;i++){
                            let formData=new FormData();
                            formData.append("goodsUUID",this.goodsSelection[i].goodsUUID);
                            formData.append("shopUUID",this.goodsSelection[i].shopUUID);
                            formData.append("commonId",this.UserData.UserId);
                            formData.append("dealCount",this.goodsSelection[i].goodsNum);
                            DealAPI.insetDeal(formData).then(res=>{
                                if(res.data.code!=219){
                                    dc = false
                                }
                            })
                        }
                        if (dc==true){
                            this.showMessage('订单提交成功','success')
                            WalletAPI.subMoney(this.UserData.Username,this.ShopCarSumMoney).then(res=>{
                                console.log(res)
                            })
                            this.reload()
                        }
                       
                        
                    }).catch(() => {
                        this.showMessage('已取消','info')});
                }else{
                    this.showMessage('请选择商品','info')
                }




            },
            handleDelete(index, row) {
                ShopCarAPI.updateGoods(row.goodsUUID,this.UserData.UserId,-1).then(res=>{
                   if(res.data.code==226){
                       this.showMessage('该商品移除购物车','success')
                       this.reload()
                   }else{
                       this.showMessage('该商品移除失败','info')
                   }
                })
            },
            showMessage(data,status){
                this.$message({
                    type: status,
                    message: data
                });
            },
            Canbuy(){
                if(this.ShopCarSumMoney>this.UserData.currentMondy){
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

</style>
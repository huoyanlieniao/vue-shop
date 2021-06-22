<!--
 * @Author: sun
 * @Date: 2021/6/17 10:42
 * @title: DealShow
 * @Description:
 * @version: 1.0
 -->
<template>
    <div v-if="DealEmpty">
        <p>订单为空</p>
    </div>
    <div v-if="!DealEmpty">
        <div id="shopCarListShow">
            <el-table
                    :data="DealList"
                    style="width: 100%">
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
                        label="购买数量"
                        width="120">
                    <template #default="scope">
                        <div>
                            {{ scope.row.dealCount}}
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
                        label="总价格"
                        show-overflow-tooltip>
                    <template #default="scope">
                        <div>
                            <p>{{scope.row.sumMoney}}</p>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column
                        label="评价"
                        show-overflow-tooltip>
                    <template #default="scope">
                        <div>
                            <el-rate
                                    v-model="scope.row.assess"
                                    disabled
                                    show-score
                                    text-color="#ff9900"
                                    score-template="{value}">
                            </el-rate>

                        </div>
                    </template>
                </el-table-column>

                <el-table-column
                        label="状态"
                        show-overflow-tooltip>
                    <template #default="scope"  >
                        <div v-if="scope.row.status==0">
                            <p>正在交易</p>
                            </div>
                        <div v-if="scope.row.status==1">
                            <p>订单已退货</p>
                        </div>
                        <div v-if="scope.row.status==-1">
                            <p>订单完成</p>
                        </div>
                        <div v-if="scope.row.status==2">
                            <p>商品已签收</p>
                        </div>

                    </template>
                </el-table-column>

                <el-table-column label="操作">
                    <template #default="scope">
                        <div v-if="scope.row.status==0">
                            <el-button
                                    size="mini"
                                    type="primary"
                                    @click="SignFor(scope.$index, scope.row)">签收</el-button>
                        </div>

                        <div v-if="scope.row.status==2">
                            <el-button
                                    size="mini"
                                    type="primary"
                                    @click="returnGoods(scope.$index, scope.row)">退货</el-button>
                        </div>

                        <el-button
                                size="mini"
                                type="primary"
                                @click="comment(scope.$index, scope.row)">评论</el-button>

                    </template>




                </el-table-column>

            </el-table>

            <div>
                <el-dialog title="评价" v-model="qiancommentNode">
                    <p>请对商品或服务进行评价</p>
                    <el-rate v-model="assess"></el-rate>
                    <template #footer>

            <span class="dialog-footer">
              <el-button type="primary" @click="qian()">确定</el-button>
            </span>

                    </template>
                </el-dialog>

                <el-dialog title="评价" v-model="tuicommentNode">
                    <p>请对商品或服务进行评价</p>
                    <el-rate v-model="assess"></el-rate>
                    <template #footer>

            <span class="dialog-footer">
              <el-button type="primary" @click="tuishi()">确定</el-button>
            </span>

                    </template>
                </el-dialog>
            </div>


        </div>


    </div>
</template>


<script>
    import * as UserAPI from '../api/user/index.js'
    import * as ShopCarAPI from '../api/shopCar/index.js'
    import * as GoodAPI from '../api/good/index.js'
    import * as ShopAPI from '../api/shop/index.js'
    import * as WalletAPI from '../api/wallet/index.js'
    import * as DealAPI from '../api/deal/index.js'
export default{
    inject:['reload'],
    data(){
        return{
            qiancommentNode:false,
            tuicommentNode:false,
            index:0,
            row:0,
            assess:0,
            DealEmpty:true,
            UserData:{
                UserId:"",
                Username:"",
            },
            DealList:[],
        }
    },
    created(){
        this.UserData.UserId=UserAPI.getCookie("userId:")
        //用户信息获取
        UserAPI.getUserId(this.UserData.UserId).then(res=>{
            let data=res.data.result[0]
            this.UserData.Username=data.username
        })

        //订单信息获取
        DealAPI.getUserAllDeal(this.UserData.UserId).then(res=>{
            this.DealList=res.data.result[0]
            //数据异步问题必须写在这里
            if(this.DealList.length>0){
                this.DealEmpty=false
                for (let i=0;i<this.DealList.length;i++){
                    // 处理商品名称和商店名称
                    GoodAPI.getGoodDetail(this.DealList[i].goodsUUID).then(res=>{
                        let d=res.data.result[0]
                        this.DealList[i]['goodsName']=d.goodsName
                        this.DealList[i]["goodsPrice"]=d.goodsDiscountPrice
                        this.DealList[i]["sumMoney"]= this.DealList[i]["goodsPrice"]*this.DealList[i].dealCount
                    })
                    //商店信息处理
                    ShopAPI.getShopDetail(this.DealList[i].shopUUID).then(res=>{
                        let c=res.data.result[0][0]
                        this.DealList[i]["shopName"]=c.shopName
                    })
                }
            }else{
                this.DealEmpty=true
            }

            console.log(this.DealList)
        })



    },
    methods:{

        //订单签收
        SignFor(index, row){
            this.qiancommentNode=true
            this.index=index
            this.row=row
        },
        qian(){
            DealAPI.receip(this.row.dealUUID,this.assess).then(res=>{
                if(res.data.code==220){
                    DealAPI.UpdateDeal(this.row.dealUUID,2).then(res =>{
                        if(res.data.code==223){
                            this.DealList[this.index].status=2
                            this.DealList[this.index].assess=this.assess
                            this.qiancommentNode=false
                            this.showMessage("签收成功",'success')
                        }
                    })
                }else{
                    this.showMessage("签收失败",'info')
                }
            })
        },

        showMessage(data,status){
            this.$message({
                type: status,
                message: data
            });
        },
        //退货
        returnGoods(index, row){
                this.$confirm('是否退货', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.tuicommentNode=true
                    this.index=index
                    this.row=row
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
        tuishi(index, row){
            DealAPI.returnDeal(this.row.dealUUID,this.assess).then(res=>{
                console.log(res)
                if(res.data.code==222){
                    //退货成功
                    this.DealList[this.index].status=-1
                    this.tuicommentNode=false
                    this.showMessage("退货成功",'success')
                    this.DealList[this.index].assess=this.assess

                }else{
                    this.showMessage("退货失败",'info')
                }
            })
        },
        clickgoods (value){
            this.$router.push({path:'/gooddetail',query:{goodsUUID:value}})
        },
        clickShop (value){
            this.$router.push({path:'/shop',query:{shopUUID:value}})
        },
        //评论
        comment(index, row){
            this.$router.push({path:'/gooddetail',query:{goodsUUID:row.goodsUUID}})
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
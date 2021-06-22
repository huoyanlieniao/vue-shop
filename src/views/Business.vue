<!--
 * @Author: sun
 * @Date: 2021/6/18 14:49
 * @title: Business
 * @Description:
 * @version: 1.0
 -->
<template>
    <div class="common-layout">

        <el-container>
            <el-header>
                <el-menu
                        :default-active="activeIndex2"
                        class="el-menu-demo"
                        mode="horizontal"
                        @select="handleSelect"
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b">
                    <el-submenu index="2">
                        <template #title>店铺</template>
                        <div v-for="(item,index) in ShopList">
                                <el-menu-item :index="index+''">{{item.shopName}}</el-menu-item>
                        </div>
                    </el-submenu>
                    <el-menu-item index="3" @click="getGoodsData">商品</el-menu-item>

                    <el-menu-item index="4" @click="getShopData">商家信息</el-menu-item>
                    <el-menu-item index="5" @click="getDealList(-1)">订单</el-menu-item>
                    <el-menu-item index="6" @click="getCommentList(-1)">评论</el-menu-item>
                    <el-menu-item index="7" v-if="!admin">添加商品</el-menu-item>
                </el-menu>
            </el-header>

            <el-main>
                <div v-if="Node.ShowNode==3">
                    <div v-if="GoodsList.length==0">
                        <p>无商品</p>
                    </div>
                    <div v-if="GoodsList.length!=0">
                        <el-table
                                :data="GoodsList"
                                style="width: 100%"
                        >
                            <el-table-column
                                    label="商品名称"
                                    width="120">
                                <template #default="scope">
                                    <div>
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
                                    label="折扣"
                                    width="120">
                                <template #default="scope">
                                    <div>
                                        {{scope.row.discount}}
                                    </div>
                                </template>
                            </el-table-column>

                            <el-table-column
                                    label="折后价格"
                                    width="120">
                                <template #default="scope">
                                    <div>
                                        {{scope.row.goodsDiscountPrice}}
                                    </div>
                                </template>

                            </el-table-column>

                            <el-table-column
                                    label="总量"
                                    show-overflow-tooltip>
                                <template #default="scope">
                                    <div>
                                        {{scope.row.goodsCount}}
                                    </div>
                                </template>
                            </el-table-column>

                            <el-table-column
                                    label="已售量"
                                    show-overflow-tooltip>
                                <template #default="scope">
                                    <div>
                                        {{scope.row.goodsDealCount}}
                                    </div>
                                </template>
                            </el-table-column>

                            <el-table-column
                                    label="状态"
                                    show-overflow-tooltip>
                                <template #default="scope">
                                    <div v-if="scope.row.status==0">
                                        已下架
                                    </div>
                                    <div v-if="scope.row.status==1">
                                        售卖
                                    </div>
                                </template>
                            </el-table-column>

                            <el-table-column label="操作">
                                <template #default="scope">
                                    <el-button
                                            size="mini"
                                            type="danger"
                                            @click="adjustment(scope.$index, scope.row)">操作</el-button>
                                </template>
                            </el-table-column>

                        </el-table>

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
                    </div>
                </div>
                <div v-if="Node.ShowNode==4">
                    <el-descriptions title="商店详情列表" direction="vertical" :column="4" border>
                        <el-descriptions-item label="商品名称">{{ShopList[Node.ShowShop].shopName}}
                            <el-button type="danger" @click="Node.ChangeShopNameNode=true">修改商铺名称</el-button>
                        </el-descriptions-item>
                        <el-descriptions-item label="商品数量">{{Node.GoodsCount}}</el-descriptions-item>
                        <el-descriptions-item label="订单数量">{{ShopList[Node.ShowShop].dealCount}}</el-descriptions-item>
                        <el-descriptions-item label="商店等级">{{ShopList[Node.ShowShop].level}}级</el-descriptions-item>
                        <el-descriptions-item label="好评数量">{{ShopList[Node.ShowShop].praiseCount}}</el-descriptions-item>
                        <el-descriptions-item label="好评度">{{ShopList[Node.ShowShop].praiseRate}}</el-descriptions-item>
                        <el-descriptions-item label="开店时间">{{ShopList[Node.ShowShop].createTime}}</el-descriptions-item>
                        <el-descriptions-item label="店铺状态">
                            <div v-if="ShopList[Node.ShowShop].status==1">
                                营业
                                <el-button type="danger" @click="changeStatus">停业</el-button>
                            </div>
                            <div v-if="ShopList[Node.ShowShop].status==0">
                                停业
                                <el-button type="primary" @click="changeStatus">营业</el-button>
                            </div>
                            <div v-if="ShopList[Node.ShowShop].status==-1">
                                待审核
                            </div>
                        </el-descriptions-item>
                    </el-descriptions>

                </div>
                <div v-if="Node.ShowNode==5">
                    <div v-if="Node.DealEmpty">
                        无订单
                    </div>
                    <div v-if="!Node.DealEmpty">
                        <el-table
                                :data="DealList"
                                style="width: 100%">
                            <el-table-column
                                    label="商品名称"
                                    width="120">
                                <template #default="scope">
                                    <div>
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

                            <el-table-column
                                    label="客户"
                                    width="120">
                                <template #default="scope">
                                    <div>
                                        {{ scope.row.userName}}
                                    </div>
                                </template>

                            </el-table-column>

                        </el-table>
                    </div>
                </div>
                <div v-if="Node.ShowNode==6">
                    <div v-if="Commentlist.length==0">
                        无评论
                    </div>
                    <div v-if="Commentlist.length!=0">
                        <div v-for="item in Commentlist" :key="item.Commentlist">
                            <p>商品名称：{{item.GoodsName}}</p>
                            <p>用户Id：{{item.commentId}}</p>
                            <p>用户名称：{{item.Username}}</p>
                            <p>用户评论：{{item.commentContent}}</p>
                            <div v-if="item.reply!=null">
                                <p>-------------------------------------</p>
                                <p>{{item.reply.Username}}回复:{{item.Username}}</p>
                                <p>{{item.reply.commentContent}}</p>
                                <p>-------------------------------------</p>
                            </div>
                            <div v-if="item.reply==null">
                                <el-button type="primary" @click="reply(item)">回复</el-button>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="Node.ShowNode==7">
                    <el-form :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="商品名称" prop="goodsName">
                            <el-input  v-model="ruleForm.goodsName" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="商品描述" prop="goodsDescription">
                            <el-input  v-model="ruleForm.goodsDescription" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="商品大小" prop="size">
                            <el-input  v-model="ruleForm.size" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="商品种类" prop="region">
                            <el-select v-model="ruleForm.goodsType" placeholder="请选择商品种类">
                                <el-option label="书籍" value="1"></el-option>
                                <el-option label="文具" value="2"></el-option>
                                <el-option label="数码" value="3"></el-option>
                                <el-option label="代码代写" value="4"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="允许商讨价格" prop="delivery">
                            <el-switch v-model="ruleForm.isBargain"></el-switch>
                        </el-form-item>
                        <el-form-item label="商品价格" prop="goodsPrice">
                            <el-input  v-model="ruleForm.goodsPrice" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="商品数量" prop="goodsCount">
                            <el-input  v-model="ruleForm.goodsCount" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="商品折扣" prop="discount">
                            <el-input v-model="ruleForm.discount" autocomplete="off"></el-input>
                        </el-form-item>

                        <el-form-item label="照片1">

                            <el-upload
                                    class="upload-demo"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemove"
                                    :before-remove="beforeRemove"
                                    multiple
                                    :auto-upload="false"
                                    :limit="1"
                                    :on-exceed="handleExceed"
                                    :file-list="Picture1"
                                    :on-change="fileChange1"
                            >
                                <el-button size="small" type="primary">点击上传</el-button>
                                <template #tip>
                                    <div class="el-upload__tip">只能上传 jpg/png 文件，且不超过 500kb</div>
                                </template>

                            </el-upload>

                        </el-form-item>
                        <el-form-item label="照片2">

                            <el-upload
                                    class="upload-demo"
                                    action=""
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemove"
                                    :before-remove="beforeRemove"
                                    :auto-upload="false"
                                    multiple
                                    :limit="1"
                                    :on-exceed="handleExceed"
                                    :file-list="Picture2"
                                    :on-change="fileChange2"
                            >
                                <el-button size="small" type="primary">点击上传</el-button>
                                <template #tip>
                                    <div class="el-upload__tip">只能上传 jpg/png 文件，且不超过 500kb</div>
                                </template>
                            </el-upload>
                        </el-form-item>

                        <el-form-item label="照片3">

                            <el-upload
                                    class="upload-demo"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemove"
                                    :before-remove="beforeRemove"
                                    :auto-upload="false"
                                    multiple
                                    :limit="1"
                                    :on-exceed="handleExceed"
                                    :file-list="Picture3"
                                    :on-change="fileChange3"
                            >
                                <el-button size="small" type="primary">点击上传</el-button>
                                <template #tip>
                                    <div class="el-upload__tip">只能上传 jpg/png 文件，且不超过 500kb</div>
                                </template>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="照片4">

                            <el-upload
                                    class="upload-demo"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemove"
                                    :before-remove="beforeRemove"
                                    :auto-upload="false"
                                    multiple
                                    :limit="1"
                                    :on-exceed="handleExceed"
                                    :file-list="Picture4"
                                    :on-change="fileChange4"
                            >
                                <el-button size="small" type="primary">点击上传</el-button>
                                <template #tip>
                                    <div class="el-upload__tip">只能上传 jpg/png 文件，且不超过 500kb</div>
                                </template>
                            </el-upload>
                        </el-form-item>


                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                            <el-button @click="resetForm('ruleForm')">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>

            </el-main>


            <el-footer>

            </el-footer>
        </el-container>


    </div>

    <el-dialog title="商品调整" v-model="Node.ShowadjustNode">
        <p>商品操作</p>
        <el-button type="primary" @click="changeChangeShow(0)" v-if="!admin">调整商品数量</el-button>
        <el-button type="warning" @click="changeChangeShow(1)" v-if="Goods.status==1">下架商品</el-button>

        <el-button type="info" @click="changeChangeShow(5)" v-if="Goods.status==0">上架商品</el-button>


        <el-button type="success" @click="changeChangeShow(2)" v-if="!admin">调整价格</el-button>
        <el-button type="info" @click="changeChangeShow(3)" v-if="!admin">调整折扣</el-button>
        <el-button type="info" @click="changeChangeShow(4)" v-if="!admin">调整名称</el-button>
        <el-button type="info" @click="LookeComment">查看评论</el-button>
        <el-button type="info" @click="LookDeal">查看订单</el-button>

        <template #footer>
                                <span class="dialog-footer">
                                  <el-button @click="Node.ShowadjustNode=false">确定</el-button>
                                </span>
        </template>
    </el-dialog>

    <el-dialog title="修改商店名称" v-model="Node.ChangeShopNameNode">

        <el-input v-model="input" placeholder="输入商店名称"></el-input>

        <template #footer>
                                <span class="dialog-footer">
                                  <el-button @click="Node.ChangeShopNameNode=false">取消</el-button>
                                    <el-button @click="ChangeShopName">确定</el-button>
                                </span>
        </template>
    </el-dialog>

    <el-dialog title="商品调整" v-model="Node.ChangeShow">
        <p>商品调整</p>
        <div v-if="Node.ChangeNode==0">
            <el-input v-model="input" placeholder="输入调整后的商品数量"></el-input>
        </div>

        <div v-if="Node.ChangeNode==1">
            <p>是否下架商品</p>
        </div>

        <div v-if="Node.ChangeNode==5">
            <p>是否上架该商品</p>
        </div>

        <div v-if="Node.ChangeNode==2">
            <el-input v-model="input" placeholder="输入调整后的价格"></el-input>
        </div>

        <div v-if="Node.ChangeNode==3">
            <el-input v-model="input" placeholder="输入调整后的折扣"></el-input>
        </div>

        <div v-if="Node.ChangeNode==4">
            <el-input v-model="input" placeholder="输入调整后的名称"></el-input>
        </div>



        <template #footer>
            <span class="dialog-footer">
                <el-button @click="quxiao">取消</el-button>

                <div v-if="Node.ChangeNode==0">
                    <el-button @click="addCount">确定</el-button>
                </div>

                <div v-if="Node.ChangeNode==1">
                    <el-button @click="downGood">确定</el-button>
                </div>

                 <div v-if="Node.ChangeNode==2">
                  <el-button @click="changePrice">确定</el-button>
                </div>

                 <div v-if="Node.ChangeNode==3">
                     <el-button @click="changediscount">确定</el-button>
                </div>

                <div v-if="Node.ChangeNode==4">
                    <el-button @click="changeName">确定</el-button>
                </div>

                <div v-if="Node.ChangeNode==5">
                    <el-button @click="upGood">确定</el-button>
                </div>

            </span>


        </template>


    </el-dialog>

    <el-dialog title="评论" v-model="Node.setGoodsCommentNode">
        <el-form :model="form">
            <el-form-item label="添加评论" :label-width="formLabelWidth">
                <el-input v-model="goodsComment" autocomplete="off"></el-input>
            </el-form-item>

        </el-form>
        <template #footer>
                                <span class="dialog-footer">
                                  <el-button @click="Node.setGoodsCommentNode=false">取 消</el-button>
                                  <el-button type="primary" @click="insetGoodsComment()">确 定</el-button>
                                </span>
        </template>
    </el-dialog>

</template>

<script>
    import * as GoodAPI from '../api/good/index.js'
    import * as UserAPI from '../api/user/index.js'
    import * as DealAPI from '../api/deal/index.js'
    import * as ShopAPI from '../api/shop/index.js'
    import * as ShopCarAPI from '../api/shopCar/index.js'
    import * as WalletAPI from '../api/wallet/index.js'
    import { defineComponent } from 'vue'
    import { ElMessage } from 'element-plus'
    import {returnDeal} from "@/api/deal";
    export default {
        inject:['reload'],
        data(){
            var numReg = /^[0-9]*$/

            var numRe = new RegExp(numReg)
            //商品名检验
            var checkGoodsName=(rule,value,callback)=>{
                console.log(value)
                if(!value){
                    this.Istrue=false
                    callback(new Error('商品名称不能为空'));
                }else{
                    this.Istrue=true
                    callback();
                }

            }

            //商品描述检验
            var checkGoodsDescription=(rule,value,callback)=>{
                console.log(value)
                if(!value){
                    this.Istrue=false
                    callback(new Error('商品描述不能为空'));
                }else{
                    this.Istrue=true
                    callback();
                }

            }
            //商品大小描述检验
            var checkGoodsSize=(rule,value,callback)=>{
                console.log(value)
                if(!value){
                    this.Istrue=false
                    callback(new Error('商品大小不能为空'));
                }else{
                    this.Istrue=true
                    callback();
                }
            }
            //商品价格检验
            var checkGoodsPrice=(rule,value,callback)=>{

                if(!value){
                    this.Istrue=false
                    callback(new Error('商品价格不能为空'));
                }else if (value<=0){
                    this.Istrue=false
                    callback(new Error('商品价格不能为小于等于0'));
                }else if (!numRe.test(value)){
                    this.Istrue=false
                    callback(new Error('请输入数字价格'));
                }else{
                    this.Istrue=true
                    callback();
                }

            }
            //商品数量检验
            var checkGoodsCount=(rule,value,callback)=>{
                console.log(value)
                if(!value){
                    this.Istrue=false
                    callback(new Error('商品数量不能为空'));
                }else if (value<0){
                    this.Istrue=false
                    callback(new Error('商品价格不能为小于0'));
                }else if (!numRe.test(value)){
                    this.Istrue=false
                    callback(new Error('请输入数字价格'));
                }else{
                    this.Istrue=true
                    callback()
                }

            }
            //商品折扣检验
            var checkGoodsdiscount=(rule,value,callback)=>{
                console.log(value)
                if(!value){
                    this.Istrue=false
                    callback(new Error('商品折扣不能为空'));
                }else if (!numRe.test(value)){
                    this.Istrue=false
                    callback(new Error('请输入数字价格'));
                }else{
                    this.Istrue=true
                    callback()
                }
            }
            return{
                Picture1: [],
                Picture2: [],
                Picture3: [],
                Picture4: [],
                Istrue:false,
                ruleForm: {
                    goodsName:'',
                    goodsDescription: '',
                    size: '',
                    goodsType:0,
                    isBargain:false,
                    goodsPrice:0,
                    goodsCount:0,
                    discount:0,
                    goodsPictures:[]

                },
                input:"",
                goodsComment:"",
                replyobject:Object,
                Node:{
                    setGoodsCommentNode:false,
                    //当前展示哪一个店铺
                    ShowShop:0,
                    //店铺数量
                    ShopCount:0,
                    //商品数量
                    GoodsCount:0,
                    //当前展示的哪一个界面 0什么也没有，3商品
                    ShowNode:0,
                    ShowadjustNode:false,
                    //改哪种 -1不改，0修改商品数量,1下架商品,2价格，3折扣，4名字
                    ChangeShow:false,
                    ChangeNode:-1,
                    DealEmpty:true,
                    GoodShow:-1,
                    ChangeShopNameNode:false,
                },
                admin:false,
                Goods:Object,
                businessId:0,
                BusinessData:[],
                ShopList:[],
                Wallet:[],
                GoodsList:[],
                DealList:[],
                Commentlist:[],
                Page:{
                    GoodsCount:0,
                    //页面大小
                    PageSize:10,
                    //页码数目
                    PageCount:0,
                    //当前页数
                    CurrentPage:0
                },
                rules: {
                   goodsName:[
                        { validator:  checkGoodsName, trigger: 'blur' }
                    ],
                    size:[
                        { validator:  checkGoodsSize, trigger: 'blur' }
                    ],
                    goodsDescription:[
                        { validator:  checkGoodsDescription, trigger: 'blur' }
                    ],
                    goodsPrice:[
                        { validator:  checkGoodsPrice, trigger: 'blur' }
                    ],
                    goodsCount:[
                        { validator:  checkGoodsCount, trigger: 'blur' }
                    ],
                    discount:[
                        { validator:  checkGoodsdiscount, trigger: 'blur' }
                    ],

                }
            }
        },
        created() {
            if(UserAPI.getCookie("businessId:")==""){
                let admin=this.$route.query.admin
                if(admin==""){
                    this.showMessage("您不是商家",'info')
                    this.$router.push('/login');
                }else{
                    //this.admin=true
                    this.businessId=this.$route.query.businessId
                }

            }else{

                this.businessId=UserAPI.getCookie("businesssId:")
                console.log(this.BusinessData.businessId)
            }

            //获取商家数据
            UserAPI.getUserId(this.businessId).then(res=>{
                this.BusinessData=res.data.result[0]
                //console.log(this.BusinessData)
                // this.BusinessData["Picture"]=[]
                // let identificationFront=this.BusinessData.identificationFront.split("\"")[1]
                // this.BusinessData.Picture.push(identificationFront)
                //
                // let identificationBack=this.BusinessData.identificationBack.split("\"")[1]
                // this.BusinessData.Picture.push(identificationBack)
                //
                // let license=this.BusinessData.license.split("\"")[1]
                // this.BusinessData.Picture.push(license)
                //
                // console.log(this.BusinessData.Picture)
            })
            //钱包数据
            WalletAPI.getWallet(this.businessId).then(res=>{
                let data=res.data.result[0]
                this.Wallet = data
            })

            //店铺多少
            ShopAPI.getShopCount(this.businessId).then(res=>{
                this.Node.ShopCount=res.data.result[0].shopCount
                ShopAPI.getShopDetail1(this.businessId,this.Node.ShopCount).then(res=>{
                    //店铺信息
                    this.ShopList=res.data.result[0]
                    //console.log(this.ShopList)
                    if(this.ShopList.length>0){
                        ShopAPI.getGoodsCount(this.ShopList[0].shopUUID).then(res=>{
                            //console.log(res)
                            let GoodsCount=res.data.result[0].GoodsCount
                            this.Node.GoodsCount=GoodsCount
                            console.log(this.Node.GoodsCount)
                            if(this.Node.GoodsCount!=0){
                                this.Page.PageCount=(this.Page.GoodsCount/10)+1
                                //默认获取第一页数据
                                ShopAPI.getGoodsDetail(this.ShopList[0].shopUUID,1).then(res=>{
                                    this.GoodsList=res.data.result[0]
                                    //console.log(this.GoodsList)
                                })
                            }else{
                                this.GoodsList=[]
                            }

                        })
                    }

                })
            })



        },
        methods: {
            showMessage(data,status){
                this.$message({
                    type: status,
                    message: data
                });
            },
            handleSelect(key, keyPath) {
                if(keyPath[0]==2){
                    //切换商店
                    this.Node.ShowShop=keyPath[1]
                }else{
                    this.Node.ShowNode=key
                }
            },
            handleCurrentChange(){
                //换页则请求当前页
                ShopAPI.getGoodsDetail(this.ShopList[this.Node.ShowShop].shopUUID,this.Page.CurrentPage).then(res=>{
                    if(res.data.code==206){
                        this.GoodsList=res.data.result[0]
                        }else{
                            this.showMessage("访问错误",'info')
                        }
                    })
            },
            adjustment(index, row){
                this.Node.ShowadjustNode=true
                this.Goods = row
            },
            addCount(){
                if(this.Node.ChangeNode==0){
                    if(this.input>this.Goods.goodsDealCount){
                        let formData=this.setformdata("goodsCount",this.input)
                        ShopAPI.changeGoods(formData).then(res=>{
                            if(res.data.code==216){
                                this.showResult("商品数量调整成功")
                            }
                        })
                    }else{
                        this.showMessage("商品数量不得小于已售数量,已售出"+this.Goods.goodsDealCount,'info')
                    }
                }

            },
            downGood(){
                if(this.Node.ChangeNode==1){
                    if(this.Goods.status==0){
                        this.showMessage("商品已下架",'info')
                        this.quxiao()
                    }else{
                        let formData=this.setformdata("status",0)
                        ShopAPI.changeGoods(formData).then(res=>{
                            if(res.data.code==216){
                                this.showResult("商品成功下架")
                            }

                        })
                    }
                }
                
            },
            upGood(){
                if(this.Node.ChangeNode==5){
                    if(this.Goods.status==1){
                        this.showMessage("商品已上架",'info')
                        this.quxiao()
                    }else{
                        let formData=this.setformdata("status",1)
                        ShopAPI.changeGoods(formData).then(res=>{
                            if(res.data.code==216){
                                this.showResult("商品成功上架")
                            }

                        })
                    }
                }

            },
            changePrice(){
                if(this.Node.ChangeNode==2){
                    if(this.input<0){
                        this.showMessage("商品价格不的为负数",'info')
                        this.quxiao()
                    }else{
                        let formData=new FormData();
                        formData.append("goodsUUID",this.Goods.goodsUUID);
                        formData.append("goodsPrice",this.input);
                        formData.append("discount",this.Goods.discount);

                        ShopAPI.changeGoods(formData).then(res=>{
                            if(res.data.code==216){
                                this.showResult("商品价格调整成功")
                            }else{
                                this.showMessage("调整失败",'info')
                                this.quxiao()
                            }

                        })
                    }
                }
            },
            changediscount(){
                if(this.Node.ChangeNode==3){
                    if(this.input<0){
                        this.showMessage("商品折扣不为负数",'info')
                        this.quxiao()
                    }else{
                        let formData=new FormData();
                        formData.append("goodsUUID",this.Goods.goodsUUID);
                        formData.append("goodsPrice",this.Goods.goodsPrice);
                        formData.append("discount",this.input);

                        ShopAPI.changeGoods(formData).then(res=>{
                            if(res.data.code==216){
                                this.showResult("商品折扣调整成功")
                            }else{
                                this.showMessage("调整失败",'info')
                                this.quxiao()
                            }

                        })
                    }
                }
            },
            changeName(){
                if(this.Node.ChangeNode==4){
                    if(this.input==""){
                        this.showMessage("商品名称不为空",'info')
                        this.quxiao()
                    }else{
                        let formData=this.setformdata("goodsName",this.input)

                        ShopAPI.changeGoods(formData).then(res=>{
                            if(res.data.code==216){
                                this.showResult("商品名称修改成功")
                            }else{
                                this.showMessage("调整失败",'info')
                                this.quxiao()
                            }

                        })
                    }
                }
            },
            changeChangeShow(value){
                this.Node.ChangeShow=true
                this.Node.ChangeNode = value

            },
            setformdata(name,data){
                let formData=new FormData();
                formData.append("goodsUUID",this.Goods.goodsUUID);
                formData.append("goodsPrice",this.Goods.goodsPrice);
                formData.append("discount",this.Goods.discount);
                formData.append(name,data);
                return formData
            },
            showResult(data){
                    this.showMessage(data,'success')
                    this.quxiao()
                    this.reload()
            },
            quxiao(){
                this.Node.ChangeShow=false,
                    this.Node.ChangeNode=-1
            },
            getDealList(value){
                if(value ==-1){
                    DealAPI.getShopAllDeal(this.ShopList[this.Node.ShowShop].shopUUID).then(res=>{
                        this.DealList=res.data.result[0]
                        //console.log(this.DealList)
                        if(this.DealList.length>0){
                            this.Node.DealEmpty=false
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
                                //购买者信息处理
                                UserAPI.getUserId(this.DealList[i].commonId).then(res=>{
                                    let data=res.data.result[0]
                                    let a=JSON.stringify(data.username)
                                    this.DealList[i]["userName"]=a.split("\"")[1]
                                })
                            }
                        }else{
                            this.DealEmpty=true
                        }
                    })
                }else{
                    console.log(value)
                    DealAPI.getGoodAllDeal(value).then(res=>{
                        this.DealList=res.data.result[0]
                        //console.log(this.DealList)
                        if(this.DealList.length>0){
                            this.Node.DealEmpty=false
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
                                //购买者信息处理
                                UserAPI.getUserId(this.DealList[i].commonId).then(res=>{
                                    let data=res.data.result[0]
                                    let a=JSON.stringify(data.username)
                                    this.DealList[i]["userName"]=a.split("\"")[1]
                                })
                            }
                        }else{
                            this.DealEmpty=true
                        }
                    })
                }

            },
            getCommentList(value){
                this.Commentlist=[]
                if(value==-1){
                    //console.log(this.GoodsList)
                    if(this.GoodsList!=null){
                        for(let i=0;i<this.GoodsList.length;i++){
                            GoodAPI.getComment(this.GoodsList[i].goodsUUID).then(res => {
                                let data=res.data.result[0]
                                for(let y=0;y<data.length;y++){
                                    // console.log(data[y])
                                    GoodAPI.getGoodDetail(data[y].goodsUUID).then(res=>{
                                        let d=res.data.result[0]
                                        data[y]['GoodsName']=d.goodsName
                                        //

                                        if(data[y].userId==this.businessId){
                                            // data[y]["Username"]=this.BusinessData
                                            // console.log(this.BusinessData)
                                            data[y]["Username"]=this.ShopList[this.Node.ShowShop].shopName
                                            if(data[y].replyId!=null){
                                                console.log(data[y].replyId)
                                                for(let z=0;z<this.Commentlist.length;z++){
                                                    if(data[y].replyId==this.Commentlist[z].commentId){
                                                        this.Commentlist[z]["reply"]=data[y]
                                                        console.log(this.Commentlist[z])
                                                    }
                                                }
                                            }else{
                                                this.Commentlist.push(data[y])
                                            }


                                        }else{
                                            UserAPI.getUserId(data[y].userId).then(res =>{
                                                // console.log(res)
                                                // console.log(res.data.result[0].username)
                                                //console.log(data[y])
                                                let username=res.data.result[0].username
                                                data[y]["Username"]=username

                                                if(data[y].replyId!=null) {
                                                    for(let z=0;z<this.Commentlist.length;z++){
                                                        if(data[y].replyId==this.Commentlist[z].commentId){
                                                            this.Commentlist[z]["reply"]=data[y]
                                                            console.log(this.Commentlist[z])
                                                        }
                                                    }
                                                }else{
                                                    this.Commentlist.push(data[y])
                                                }


                                            })
                                        }

                                    })
                                }

                            })
                        }
                    }

                    console.log(this.Commentlist)
                }else{
                   console.log("aaaaa")
                    GoodAPI.getComment(value).then(res => {
                        console.log("aaaaa")
                        let data=res.data.result[0]
                        for(let y=0;y<data.length;y++){
                            // console.log(data[y])
                            GoodAPI.getGoodDetail(data[y].goodsUUID).then(res=>{
                                let d=res.data.result[0]
                                data[y]['GoodsName']=d.goodsName
                                //

                                if(data[y].userId==this.businessId){
                                    // data[y]["Username"]=this.BusinessData
                                    // console.log(this.BusinessData)
                                    data[y]["Username"]=this.ShopList[this.Node.ShowShop].shopName
                                    if(data[y].replyId!=null){
                                        console.log(data[y].replyId)
                                        for(let z=0;z<this.Commentlist.length;z++){
                                            if(data[y].replyId==this.Commentlist[z].commentId){
                                                this.Commentlist[z]["reply"]=data[y]
                                                console.log(this.Commentlist[z])
                                            }
                                        }
                                    }else{
                                        this.Commentlist.push(data[y])
                                    }


                                }else{
                                    UserAPI.getUserId(data[y].userId).then(res =>{
                                        // console.log(res)
                                        // console.log(res.data.result[0].username)
                                        //console.log(data[y])
                                        let username=res.data.result[0].username
                                        data[y]["Username"]=username

                                        if(data[y].replyId!=null) {
                                            for(let z=0;z<this.Commentlist.length;z++){
                                                if(data[y].replyId==this.Commentlist[z].commentId){
                                                    this.Commentlist[z]["reply"]=data[y]
                                                    console.log(this.Commentlist[z])
                                                }
                                            }
                                        }else{
                                            this.Commentlist.push(data[y])
                                        }


                                    })
                                }

                            })
                        }

                    })
                }


            },
            LookeComment(){
                this.getCommentList(this.Goods.goodsUUID)
                this.Node.ShowadjustNode=false
                this.Node.ShowNode=6
            },
            LookDeal(){
                this.getDealList(this.Goods.goodsUUID)
                this.Node.ShowadjustNode=false
                this.Node.ShowNode=5
            },
            reply(data){
                this.replyobject=data
                this.Node.setGoodsCommentNode=true
            },
            insetGoodsComment(){
                let formData = new FormData();
                formData.append("goodsUUID",this.replyobject.goodsUUID)
                formData.append("userId", this.businessId)
                formData.append("commentContent", this. goodsComment)
                formData.append("replyId", this.replyobject.commentId)

                // console.log(this.UserId)
                // console.log(this.goodsComment)
                GoodAPI.insertComment(formData).then(res => {
                    console.log(res.data.code)
                    if (res.data.code == 229) {
                        this.Node.setGoodsCommentNode=false
                        this.showMessage("回复成功",'success')
                        this.reload()
                    } else {
                        this.showMessage("回复失败",'info')
                    }
                })
            },
            changeStatus(){
                if(this.ShopList[this.Node.ShowShop].status==1){
                    ShopAPI.isOpen(this.ShopList[this.Node.ShowShop].shopUUID,'false').then(res =>{
                        if(res.data.code == 212){
                            this.showMessage("停业成功",'success')
                            this.reload()
                        }else{
                            this.showMessage("停业失败",'info')
                        }
                    })
                }else if (this.ShopList[this.Node.ShowShop].status==0){
                    ShopAPI.isOpen(this.ShopList[this.Node.ShowShop].shopUUID,'true').then(res =>{
                        if(res.data.code == 212){
                            this.showMessage("营业成功",'success')
                            this.reload()
                        }else{
                            this.showMessage("营业失败",'info')
                        }
                    })
                }
            },
            ChangeShopName(){
                ShopAPI.changeShopName(this.ShopList[this.Node.ShowShop].shopUUID,this.input).then(res=>{
                    if(res.data.code == 213){
                        this.showMessage("店铺名称修改成功",'success')
                        this.Node.ChangeShopNameNode=false
                        this.reload()
                    }else{
                        this.showMessage("店铺名称失败",'info')
                    }
                })
            },
            submitForm(formName) {
                if(this.Istrue==true){
                    let formData = new FormData();
                    formData.append("shopUUID",this.ShopList[this.Node.ShowShop].shopUUID)
                    formData.append("goodsName",this.ruleForm.goodsName)
                    formData.append("goodsDescription",this.ruleForm.goodsDescription)
                    formData.append("size",this.ruleForm.size)
                    formData.append("goodsType",this.ruleForm.goodsType)
                    if(formName.isBargain){
                        formData.append("isBargain",0)
                    }else{
                        formData.append("isBargain",1)
                    }
                    formData.append("goodsPrice",this.ruleForm.goodsPrice)
                    formData.append("goodsCount",this.ruleForm.goodsCount)
                    formData.append("discount",this.ruleForm.discount)
                    formData.append("goodsPictures",this.Picture1[0])
                    formData.append("goodsPictures",this.Picture2[0])
                    formData.append("goodsPictures",this.Picture3[0])
                    formData.append("goodsPictures",this.Picture4[0])
                    GoodAPI.insetGoods(formData).then(res=>{
                        console.log(res)
                        if(res.data.code==215){
                            this.showMessage("商品添加成功",'success')
                            this.reload()
                        }else{
                            this.showMessage("商品添加失败",'info')
                        }
                    })

                }else{
                    window.alert("表单数据存在错误");
                }

            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            getGoodsData(){

            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file){
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${file.name}？`);
            },
            fileChange1(file){
                this.Picture1=[]
                this.Picture1.push(file.raw)
            },
            fileChange2(file){
                this.Picture2=[]
                this.Picture2.push(file.raw)
            },
            fileChange3(file){
                this.Picture3=[]
                this.Picture3.push(file.raw)
            },
            fileChange4(file){
                this.Picture4=[]
                this.Picture4.push(file.raw)
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
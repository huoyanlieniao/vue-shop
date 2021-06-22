<!--
 * @Author: sun
 * @Date: 2021/6/19 19:06
 * @title: Root
 * @Description:
 * @version: 1.0
 -->
<template>

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
            <el-submenu index="1">
                <template #title>审核用户</template>
                <div>
                    <el-menu-item :index="1.1">审核普通用户</el-menu-item>
                    <el-menu-item :index="1.2">审核待通过普通用户</el-menu-item>
                    <el-menu-item :index="1.3">审核拉黑普通用户</el-menu-item>
                    <el-menu-item :index="1.4">审核通过商家</el-menu-item>
                    <el-menu-item :index="1.5">审核待通过商家</el-menu-item>
                    <el-menu-item :index="1.6">审核拉黑商家</el-menu-item>
                </div>
            </el-submenu>
                <el-submenu index="2">
                    <template #title>审核相关信息</template>
                    <div>
                        <el-menu-item :index="2.1">审核营业商店</el-menu-item>
                        <el-menu-item :index="2.2">审核未营业商店</el-menu-item>
                    </div>
                </el-submenu>
                <el-menu-item index="3">订单查看</el-menu-item>
        </el-menu>
        </el-header>

        <el-main>
            <div v-if="Node.ShowNode==1">
<!--                审核界面-->
                <div v-if="Node.ShowNodeSelect==1.1">
                    <div v-if="AllowUserList.length==0">
                        <p>无通过用户</p>
                    </div>
                    <div v-if="AllowUserList.length!=0">
                        <el-table
                                :data="AllowUserList"
                                style="width: 100%"
                        >
                            <el-table-column
                                    label="用户Id"
                                    width="120">
                                <template #default="scope">
                                    <div>
                                        {{ scope.row.userId}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="用户名称"
                                    width="120">
                                <template #default="scope">
                                    <div>
                                        {{ scope.row.username}}
                                    </div>
                                </template>
                            </el-table-column>

                            <el-table-column
                                    label="用户真名"
                                    width="120">
                                <template #default="scope">
                                    <div>
                                        {{scope.row.name}}
                                    </div>
                                </template>
                            </el-table-column>

                            <el-table-column
                                    label="状态"
                                    show-overflow-tooltip>
                                <template #default="scope">
                                    <div v-if="scope.row.status==0">
                                        已通过
                                    </div>
                                    <div v-if="scope.row.status==1">
                                        拉黑
                                    </div>
                                    <div v-if="scope.row.status==-1">
                                        待批准
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
                    </div>
                </div>
                <div v-if="Node.ShowNodeSelect==1.2">
                    <div v-if="NotAllowUserList.length==0">
                        <p>无待通过用户</p>
                    </div>
                    <div v-if="NotAllowUserList.length>0">
                        <el-table
                                :data="NotAllowUserList"
                                style="width: 100%"
                        >
                            <el-table-column
                                    label="用户Id"
                                    width="120">
                                <template #default="scope">
                                    <div>
                                        {{ scope.row.userId}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="用户名称"
                                    width="120">
                                <template #default="scope">
                                    <div>
                                        {{ scope.row.username}}
                                    </div>
                                </template>
                            </el-table-column>

                            <el-table-column
                                    label="用户真名"
                                    width="120">
                                <template #default="scope">
                                    <div>
                                        {{scope.row.name}}
                                    </div>
                                </template>
                            </el-table-column>

                            <el-table-column
                                    label="状态"
                                    show-overflow-tooltip>
                                <template #default="scope">
                                    <div v-if="scope.row.status==0">
                                        已通过
                                    </div>
                                    <div v-if="scope.row.status==1">
                                        拉黑
                                    </div>
                                    <div v-if="scope.row.status==-1">
                                        待批准
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
                    </div>
                </div>
                <div v-if="Node.ShowNodeSelect==1.3">
                    <div v-if=" DisableUserList.length==0">
                        <p>无拉黑用户</p>
                    </div>
                    <div v-if=" DisableUserList.length!=0">
                        <el-table
                                :data="DisableUserList"
                                style="width: 100%"
                        >
                            <el-table-column
                                    label="用户Id"
                                    width="120">
                                <template #default="scope">
                                    <div>
                                        {{ scope.row.userId}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="用户名称"
                                    width="120">
                                <template #default="scope">
                                    <div>
                                        {{ scope.row.username}}
                                    </div>
                                </template>
                            </el-table-column>

                            <el-table-column
                                    label="用户真名"
                                    width="120">
                                <template #default="scope">
                                    <div>
                                        {{scope.row.name}}
                                    </div>
                                </template>
                            </el-table-column>

                            <el-table-column
                                    label="状态"
                                    show-overflow-tooltip>
                                <template #default="scope">
                                    <div v-if="scope.row.status==0">
                                        已通过
                                    </div>
                                    <div v-if="scope.row.status==1">
                                        拉黑
                                    </div>
                                    <div v-if="scope.row.status==-1">
                                        待审核
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
                    </div>

                </div>

                <div v-if="Node.ShowNodeSelect==1.4">
                    <div v-if="AllowBusinessList.length==0">
                        <p>无通过商家</p>
                    </div>
                    <div v-if="AllowBusinessList.length!=0">
                        <el-table
                                :data="AllowBusinessList"
                                style="width: 100%"
                        >
                            <el-table-column
                                    label="商家Id"
                                    width="120">
                                <template #default="scope">
                                    <div>
                                        {{ scope.row.userId}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="商家名称"
                                    width="120">
                                <template #default="scope">
                                    <div>
                                        {{ scope.row.username}}
                                    </div>
                                </template>
                            </el-table-column>

                            <el-table-column
                                    label="商家真名"
                                    width="120">
                                <template #default="scope">
                                    <div>
                                        {{scope.row.name}}
                                    </div>
                                </template>
                            </el-table-column>

                            <el-table-column
                                    label="状态"
                                    show-overflow-tooltip>
                                <template #default="scope">
                                    <div v-if="scope.row.status==0">
                                        已通过
                                    </div>
                                    <div v-if="scope.row.status==1">
                                        拉黑
                                    </div>
                                    <div v-if="scope.row.status==-1">
                                       待批准
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
                    </div>
                </div>
                <div v-if="Node.ShowNodeSelect==1.5">
                    <div v-if="NotAllowBusinessList.length==0">
                        <p>无待通过商家</p>
                    </div>
                    <div v-if="NotAllowBusinessList.length!=0">
                        <el-table
                                :data="NotAllowBusinessList"
                                style="width: 100%"
                        >
                            <el-table-column
                                    label="商家Id"
                                    width="120">
                                <template #default="scope">
                                    <div>
                                        {{ scope.row.userId}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="商家名称"
                                    width="120">
                                <template #default="scope">
                                    <div>
                                        {{ scope.row.username}}
                                    </div>
                                </template>
                            </el-table-column>

                            <el-table-column
                                    label="商家真名"
                                    width="120">
                                <template #default="scope">
                                    <div>
                                        {{scope.row.name}}
                                    </div>
                                </template>
                            </el-table-column>

                            <el-table-column
                                    label="状态"
                                    show-overflow-tooltip>
                                <template #default="scope">
                                    <div v-if="scope.row.status==0">
                                        已通过
                                    </div>
                                    <div v-if="scope.row.status==1">
                                        待审核
                                    </div>
                                    <div v-if="scope.row.status==-1">
                                        拉黑
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
                    </div>
                </div>
                <div v-if="Node.ShowNodeSelect==1.6">
                    <div v-if=" DisableBusinessList.length==0">
                        <p>无拉黑商家</p>
                    </div>
                    <div v-if=" DisableBusinessList.length!=0">
                        <el-table
                                :data="DisableBusinessList"
                                style="width: 100%"
                        >
                            <el-table-column
                                    label="商家Id"
                                    width="120">
                                <template #default="scope">
                                    <div>
                                        {{ scope.row.userId}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="商家名称"
                                    width="120">
                                <template #default="scope">
                                    <div>
                                        {{ scope.row.username}}
                                    </div>
                                </template>
                            </el-table-column>

                            <el-table-column
                                    label="商家真名"
                                    width="120">
                                <template #default="scope">
                                    <div>
                                        {{scope.row.name}}
                                    </div>
                                </template>
                            </el-table-column>

                            <el-table-column
                                    label="状态"
                                    show-overflow-tooltip>
                                <template #default="scope">
                                    <div v-if="scope.row.status==0">
                                        已通过
                                    </div>
                                    <div v-if="scope.row.status==1">
                                        拉黑
                                    </div>
                                    <div v-if="scope.row.status==-1">
                                        待审核
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
                    </div>

                </div>
            </div>
            <div v-if="Node.ShowNode==2">
                <div v-if="Node.ShowNodeSelect==2.1">
                    <div v-if="ShopOpenList.length==0">
                        <p>无营业商店</p>
                    </div>
                    <div v-if="ShopOpenList.length!=0">
                            <el-table
                                    :data="ShopOpenList"
                                    style="width: 100%"
                            >
                                <el-table-column
                                        label="商店Id"
                                        width="120">
                                    <template #default="scope">
                                        <div>
                                            {{ scope.row.businessId}}
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="商店名称"
                                        width="120">
                                    <template #default="scope">
                                        <div>
                                            {{ scope.row.shopName}}
                                        </div>
                                    </template>
                                </el-table-column>

                                <el-table-column
                                        label="创建时间"
                                        width="120">
                                    <template #default="scope">
                                        <div>
                                            {{scope.row.createTime}}
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="等级"
                                        width="120">
                                    <template #default="scope">
                                        <div>
                                            {{scope.row.level}}级
                                        </div>
                                    </template>
                                </el-table-column>

                                <el-table-column
                                        label="订单数目"
                                        width="120">
                                    <template #default="scope">
                                        <div>
                                            {{scope.row.dealCount}}
                                        </div>
                                    </template>
                                </el-table-column>

                                <el-table-column
                                        label="状态"
                                        show-overflow-tooltip>
                                    <template #default="scope">
                                        <div v-if="scope.row.status==0">
                                            停业
                                        </div>
                                        <div v-if="scope.row.status==1">
                                            营业
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
                        </div>


                </div>
                <div v-if="Node.ShowNodeSelect==2.2">
                    <div v-if="ShopClouseList.length==0">
                        <p>无停业商店</p>
                    </div>
                    <div v-if="ShopClouseList.length!=0">
                        <el-table
                                :data="ShopClouseList"
                                style="width: 100%"
                        >
                            <el-table-column
                                    label="商店Id"
                                    width="120">
                                <template #default="scope">
                                    <div>
                                        {{ scope.row.businessId}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="商店名称"
                                    width="120">
                                <template #default="scope">
                                    <div>
                                        {{ scope.row.shopName}}
                                    </div>
                                </template>
                            </el-table-column>

                            <el-table-column
                                    label="创建时间"
                                    width="120">
                                <template #default="scope">
                                    <div>
                                        {{scope.row.createTime}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="等级"
                                    width="120">
                                <template #default="scope">
                                    <div>
                                        {{scope.row.level}}级
                                    </div>
                                </template>
                            </el-table-column>

                            <el-table-column
                                    label="订单数目"
                                    width="120">
                                <template #default="scope">
                                    <div>
                                        {{scope.row.dealCount}}
                                    </div>
                                </template>
                            </el-table-column>

                            <el-table-column
                                    label="状态"
                                    show-overflow-tooltip>
                                <template #default="scope">
                                    <div v-if="scope.row.status==0">
                                        停业
                                    </div>
                                    <div v-if="scope.row.status==1">
                                        营业
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
                    </div>


                </div>
            </div>

            <div v-if="Node.ShowNode==3">
                <div v-if="DealList.length==0">
                    <p>无订单</p>
                </div>
                <div v-if="DealList.length!=0">
                    <el-table
                            :data="DealList"
                            style="width: 100%"
                    >
                        <el-table-column
                                label="商家名称"
                                width="120">
                            <template #default="scope">
                                <div @click="clickShop(scope.row.shopUUID)">
                                    {{ scope.row.shopName}}
                                </div>
<!--                                <h5>aaaaaaa</h5>-->
                            </template>
                        </el-table-column>


                        <el-table-column
                                label="商品名称"
                                width="120">
                            <template #default="scope">
                                <div  @click="clickgoods(scope.row.goodsUUID)">
                                    {{ scope.row.goodsName}}
                                </div>
                            </template>
                        </el-table-column>

                        <el-table-column
                                label="单价"
                                width="120">
                            <template #default="scope">
                                <div>
                                    {{scope.row.goodsPrice}}
                                </div>
                            </template>
                        </el-table-column>

                        <el-table-column
                                label="购买数量"
                                width="120">
                            <template #default="scope">
                                <div>
                                    {{scope.row.dealCount}}
                                </div>
                            </template>
                        </el-table-column>

                        <el-table-column
                                label="总价"
                                width="120">
                            <template #default="scope">
                                <div>
                                    {{scope.row.sumMoney}}
                                </div>
                            </template>
                        </el-table-column>

                        <el-table-column
                                label="下单时间"
                                width="120">
                            <template #default="scope">
                                <div>
                                    {{scope.row.dealTime}}
                                </div>
                            </template>
                        </el-table-column>

                        <el-table-column
                                label="状态"
                                show-overflow-tooltip>
                            <template #default="scope">
                                <div v-if="scope.row.status==0">
                                    正在交易
                                </div>
                                <div v-if="scope.row.status==1">
                                    已退货
                                </div>
                                <div v-if="scope.row.status==-1">
                                    点单完成
                                </div>

                                <div v-if="scope.row.status==2">
                                    签收
                                </div>
                            </template>
                        </el-table-column>

                        <el-table-column
                                label="客户"
                                width="120">
                            <template #default="scope">
                                <div>
                                    {{scope.row.userName}}
                                </div>
                            </template>
                        </el-table-column>

                    </el-table>
                </div>
            </div>
        </el-main>
        <el-footer>Footer</el-footer>
    </el-container>

    <el-dialog title="用户操作" v-model="Node.ShowadjustNode">
        <p>用户操作</p>
        <el-button type="primary" @click="lookUser" v-if="Node.ShowNode==1">查看</el-button>
        <el-button type="primary" @click="disableUser" v-if="User.status==0&&Node.ShowNode==1">拉黑</el-button>
        <el-button type="primary" @click="allowUser" v-if="User.status==-1&&Node.ShowNode==1">通过</el-button>
        <el-button type="primary" @click="restoreUser" v-if="User.status==1&&Node.ShowNode==1">恢复</el-button>

        <el-button type="primary" @click="lookShop" v-if="Node.ShowNode==2">查看</el-button>
        <el-button type="primary" @click="disableShop" v-if="User.status==1&&Node.ShowNode==2">停业</el-button>
        <el-button type="primary" @click="openShop" v-if="User.status==0&&Node.ShowNode==2">营业</el-button>
        <el-button type="primary" @click="changelevel(0)" v-if="Node.ShowNode==2">店铺等级升级</el-button>
        <el-button type="primary" @click="changelevel(1)" v-if="Node.ShowNode==2">店铺等级降级</el-button>

        <template #footer>
            <span class="dialog-footer">
              <el-button @click="Node.ShowadjustNode=false">确定</el-button>
            </span>
        </template>

    </el-dialog>
</template>

<script>
    import * as GoodAPI from '../api/good/index.js'
    import * as UserAPI from '../api/user/index.js'
    import * as RootAPI from '../api/root/index.js'
    import * as DealAPI from '../api/deal/index.js'
    import * as ShopAPI from '../api/shop/index.js'
    import * as ShopCarAPI from '../api/shopCar/index.js'
    import * as WalletAPI from '../api/wallet/index.js'
    import { defineComponent } from 'vue'
    import { ElMessage } from 'element-plus'
    import {returnDeal} from "@/api/deal";
    export default {
        inject:['reload'],
        data () {
            return{
                User:Object,
                admin:"",
                Node:{
                    ShowadjustNode:false,
                    ShowNode:0,
                    ShowNodeSelect:0
                },
                UserCount:0,
                AllowUserList:[],
                AllowBusinessList:[],
                NotAllowUserList:[],
                NotAllowBusinessList:[],
                DisableUserList:[],
                DisableBusinessList:[],
                ShopOpenList:[],
                ShopClouseList:[],
                ShopCount:0,
                DealList:[]
            }
        },
        created () {
            if(UserAPI.getCookie("admin:")==""){
                this.showMessage("您不是管理员",'info')
                this.$router.push('/login');
            }else{
                this.admin=UserAPI.getCookie("admin:")
            }

            RootAPI.getAllUserCount().then(res =>{
                this.UserCount=res.data.result[0].userCount
                //获取已通过普通用户数据
                
                RootAPI.getUserData(0,this.UserCount,0).then(res =>{
                    console.log(res)
                    this.AllowUserList=res.data.result[0]
                    console.log(this.AllowUserList.length)
                    console.log(this.AllowUserList)
                })
                //获得待通过用户数据
                RootAPI.getUserData(0,this.UserCount,-1).then(res =>{
                    this.NotAllowUserList=res.data.result[0]
                    console.log(this.NotAllowUserList)
                })
                //获得拉黑用户数据
                RootAPI.getUserData(0,this.UserCount,1).then(res =>{
                    this.DisableUserList=res.data.result[0]
                    //console.log(this.DisableUserList)
                })



                //获得已通过商家数据
                RootAPI.getUserData(1,this.UserCount,0).then(res =>{
                    this.AllowBusinessList=res.data.result[0]
                    //console.log(this.AllowBusinessList)
                })
                //获得待通过商家数据
                RootAPI.getUserData(1,this.UserCount,-1).then(res =>{
                    this.NotAllowBusinessList=res.data.result[0]
                    //console.log(this.NotAllowBusinessList)
                })
                //获得拉黑商家数据
                RootAPI.getUserData(1,this.UserCount,1).then(res =>{
                    this.DisableBusinessList=res.data.result[0]
                    //console.log(this.DisableBusinessList)
                })

            })

            RootAPI.getAllShopCount().then(res => {
                this.ShopCount = res.data.result[0].shopCount
                RootAPI.getShopData(this.ShopCount).then(res => {
                    this.ShopList=res.data.result[0]
                    for(let i=0;i<this.ShopList.length;i++){
                        if(this.ShopList[i].status==0){
                            this.ShopClouseList.push(this.ShopList[i])
                        }else{
                            this.ShopOpenList.push(this.ShopList[i])
                        }
                    }
                    //console.log(this.ShopList)
                })
            })
            
            RootAPI.getAlldeal().then(res=>{
                this.DealList=res.data.result[0]

                if(this.DealList.length>0){
                    for(let i=0;i<this.DealList.length;i++){
                        UserAPI.getUserId(this.DealList[i].commonId).then(res=>{
                            let data=res.data.result[0]
                            this.DealList[i]['userName']=data.username
                        })

                        ShopAPI.getShopDetail(this.DealList[i].shopUUID).then(res=>{
                            let c=res.data.result[0][0]
                            this.DealList[i]["shopName"]=c.shopName
                        })

                        GoodAPI.getGoodDetail(this.DealList[i].goodsUUID).then(res=>{
                            let d=res.data.result[0]
                            this.DealList[i]['goodsName']=d.goodsName
                            this.DealList[i]["goodsPrice"]=d.goodsDiscountPrice
                            this.DealList[i]["sumMoney"]= this.DealList[i]["goodsPrice"]*this.DealList[i].dealCount
                        })

                    }
                }


               // console.log(this.DealList)


            })



        },
        methods: {
            handleSelect(key, keyPath) {
                this.Node.ShowNode=Number(keyPath[0])
                if(this.Node.ShowNode==1){
                    this.Node.ShowNodeSelect=keyPath[1]
                }else if (this.Node.ShowNode==2){
                    this.Node.ShowNodeSelect=keyPath[1]
                }else{
                    this.Node.ShowNodeSelect=0
                }

                // console.log(key)
                // console.log(keyPath)
                console.log(this.Node.ShowNode)
                console.log(this.Node.ShowNodeSelect)
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
            adjustment(index, row){
                console.log("vvv")
                this.Node.ShowadjustNode=true
                this.User= row
            },
            lookUser(){
                this.$router.push({path:'/userdetail',query:{useId:this.User.userId,admin:0}})
            },
            showMessage(data,status){
                this.$message({
                    type: status,
                    message: data
                });
            },
            lookShop(){
                this.$router.push({path:'/business',query:{businessId:this.User.businessId,admin:0}})
            },
            disableUser(){
                RootAPI.changeUserStatus(this.User.username,1).then(res=>{
                    console.log(res)
                    if(res.data.code==210){
                        this.showMessage("拉黑成功",'success')
                        this.reload()
                    }else{
                        this.showMessage("拉黑失败",'info')
                    }
                })
            },
            disableShop(){
                RootAPI.changeShopstatus(this.User.shopUUID,false).then(res=>{
                    if(res.data.code==212){
                                this.showMessage("停业成功",'success')
                                this.reload()
                            }else{
                                this.showMessage("停业失败",'info')
                            }
                })
            },
            openShop(){
                RootAPI.changeShopstatus(this.User.shopUUID,true).then(res=>{
                    if(res.data.code==212){
                        this.showMessage("开张成功",'success')
                        this.reload()
                    }else{
                        this.showMessage("开张失败",'info')
                    }
                })
            },
            changelevel(va){
                if(va==0){
                    RootAPI.changeShoplevel(this.User.shopUUID,true).then(res=>{
                        if(res.data.code==211){
                            this.showMessage("修改成功",'success')
                            this.reload()
                        }else{
                            this.showMessage("修改失败",'info')
                        }
                    })
                }else{
                    RootAPI.changeShoplevel(this.User.shopUUID,false).then(res=>{
                        if(res.data.code==211){
                            this.showMessage("修改成功",'success')
                            this.reload()
                        }else{
                            this.showMessage("修改失败",'info')
                        }
                    })
                }

            },
            allowUser(){
                    RootAPI.changeUserStatus(this.User.username,0).then(res=>{
                        console.log(res)
                        if(res.data.code==210){
                            this.showMessage("通过成功",'success')
                            this.reload()
                        }else{
                            this.showMessage("通过失败",'info')
                        }
                    })
            },
            restoreUser(){
                    RootAPI.changeUserStatus(this.User.username,0).then(res=>{
                        console.log(res)
                        if(res.data.code==210){
                            this.showMessage("恢复成功",'success')
                            this.reload()
                        }else{
                            this.showMessage("恢复失败",'info')
                        }
                    })

            },
            clickgoods (value){
                this.$router.push({path:'/gooddetail',query:{goodsUUID:value}})
            },
            clickShop (value){
                this.$router.push({path:'/shop',query:{shopUUID:value}})
            },


        }
    }
</script>

<style scoped>

</style>
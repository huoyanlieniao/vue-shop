<!--
 * @Author: sun
 * @Date: 2021/5/23 18:21
 * @title: Login
 * @Description:
 * @version: 1.0
 -->
<template>

    <div class="login">
        <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" width="10px"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
            <el-input v-model="form.password"></el-input>
        </el-form-item>

        <el-form-item label="验证码" prop="incode">
            <el-button type="info" @click="getCode">获取验证码</el-button>
            <el-input class="input" maxlength="8" placeholder="请输入验证码" v-model="code.incode"></el-input>
            <img :src="code.picture">
        </el-form-item>

            <el-form-item label="身份" prop="role">
                <el-radio v-model="form.role" label="0">用户</el-radio>
                <el-radio v-model="form.role" label="1">商家</el-radio>
                <el-radio v-model="form.role" label="2">管理员</el-radio>
            </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="onSubmit">登录</el-button>
            <el-button @click="cancel">返回</el-button>
        </el-form-item>

    </el-form>
    </div>

</template>

<script>
    import * as UserAPI from '../api/user/index.js'
    import { h } from 'vue';
    export default {
        data() {
            //用户名检验
            var checkUsername=(rule,value,callback)=>{
                if(!value){
                    return callback(new Error('用户名不能为空'));
                }
                callback();
            }

            //密码检验
            var checkPassword=(rule,value,callback)=>{
                if(!value){
                    return callback(new Error('密码不能为空'));
                }
                callback();
            }

            var checkCode=(rule,value,callback)=>{
                if(!value){
                    return callback(new Error('验证码不能为空'));
                }
                callback();
            }

            return {
                form: {
                    username: "",
                    role: "0",
                    password: "",
                },
                code:{
                  picture:'',
                  incode: "",
                },
                rules: {
                    username:[
                        { validator: checkUsername, trigger: 'blur' }
                    ],
                    password:[
                        { validator: checkPassword, trigger: 'blur' }
                    ],

                    incode:[
                        { validator: checkCode, trigger: 'blur' }
                    ]
                }

            }
        },
        methods: {
            cancel(){
                this.$router.push('/');
            },
            getCode() {
             UserAPI.getCode().then(res=>{
                 //这里需要进行blob转url
                 const {data,headers}=res
                 const blob=new Blob([data],{type:headers['content-type']})
                 this.code.picture=window.URL.createObjectURL(blob)
                 console.log( this.code.picture)
             } )
            },
            onSubmit() {

                //console.log(this.form);
                UserAPI.login(this.form).then(res=> {
                    console.log(res)
                    var box={
                        title: 'aaa',
                        messagetitle: 'bbb',
                        messagemain: 'ccc',
                        type: 'ddd'
                    }
                    //console.log(res);
                    if (res.data.code === 204){
                        box.title='消息';
                        box.messagetitle='成功';
                        box.messagemain='欢迎'+this.form.username;
                        box.type='success';
                        console.log(box);
                    }else{
                            box.title='消息',
                            box.messagetitle='错误',
                            box.messagemain=res.data.message,
                            box.type='error'
                        //console.log(this.box);
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
                                        let data=res.data.result[0];
                                        //这里只能用这个json的这个方法
                                        let userId=UserAPI.remdou(JSON.stringify(data.userId))
                                        document.cookie="userId:"+"="+userId
                                        //更新为cookie
                                        // localStorage.setItem('userId',this.form.userId);
                                        this.$msgbox.close();
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
                                    done();

                                }else{
                                    done();
                                }
                            }
                        })
                }


                    )





        }
    }
        }

</script>

<style scoped>


</style>
<!--
 * @Author: sun
 * @Date: 2021/5/23 18:21
 * @title: Login
 * @Description:
 * @version: 1.0
 -->
<template>
<!--    <div class="header">-->
<!--        <div class="logo-con w clearfix">-->
<!--            <a href="http://localhost:8080" class="logo "></a>-->
<!--            <div class="logo-title">欢迎登陆</div>-->
<!--            <a href="//surveys.jd.com/index.php?r=survey/index/sid/568245/lang/zh-Hans" target="_blank" class="q-link"-->
<!--               style="outline: rgb(109, 109, 109) none 10px;"><b></b>登录页面，调查问卷</a>-->
<!--        </div>-->
<!--    </div>-->
    <div class="body">
    <div class="login">
        <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" width="10px"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
            <el-input v-model="form.password"></el-input>
        </el-form-item>

        <el-form-item label="验证码" prop="incode">
            <el-input class="input" maxlength="8" placeholder="请输入验证码" v-model="code.incode"></el-input>
            <el-button type="info" @click="getCode">获取验证码</el-button>
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
    </div>
    <div class="bottom">

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
                    this.Istrue=false
                    callback(new Error('用户名不能为空'));
                }else{
                        callback();
                }

            }

            //密码检验
            var checkPassword=(rule,value,callback)=>{
                console.log(value)
                if(!value){
                    this.Istrue=false
                    callback(new Error('密码不能为空'));
                }else{
                    callback();
                }

            }

            var checkCode=(rule,value,callback)=>{
                console.log(this.code.incode)
                if(this.code.incode==""){
                    this.Istrue=false
                   callback(new Error('验证码不能为空'));
                }else if (this.codeNode!=this.code.incode){
                    this.Istrue=false
                    callback(new Error('验证码错误'))
                }else{
                    this.Istrue=true
                    callback("验证码正确");
                }

            }

            return {
                Istrue:false,
                codeNode:"",
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
            cancel() {
                this.$router.push('/');
            },
            getCode() {
                UserAPI.getCode().then(res => {
                    //这里需要进行blob转url
                    console.log(res)
                    const {data, headers} = res
                    const blob = new Blob([data], {type: headers['content-type']})
                    this.code.picture = window.URL.createObjectURL(blob)
                    this.codeNode = res.headers.code
                    console.log(this.codeNode)
                })
            },
            onSubmit() {
                if (this.Istrue) {
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
                                            if(this.form.role==0){
                                                //普通用户
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
                                                    this.$router.push('/');
                                                }else{
                                                    this.$router.push('/');
                                                }
                                            }else if(this.form.role==1){
                                                console.log(res)
                                                let data=res.data.result[0];
                                                //这里只能用这个json的这个方法
                                                let userId=UserAPI.remdou(JSON.stringify(data.userId))
                                                console.log(userId)
                                                document.cookie="businesssId:"+"="+userId
                                                //更新为cookie
                                                // localStorage.setItem('userId',this.form.userId);
                                                this.$msgbox.close();
                                                // this.$router.push('/');
                                                this.$router.push({path:'/business',query:{businessId:userId}});
                                            }else if(this.form.role==2){
                                                console.log(res)
                                                let data=res.data.result[0];
                                                //这里只能用这个json的这个方法
                                                let userId=UserAPI.remdou(JSON.stringify(data.userId))
                                                console.log(userId)
                                                document.cookie="admin:"+"="+"admin"
                                                //更新为cookie
                                                // localStorage.setItem('userId',this.form.userId);
                                                this.$msgbox.close();
                                                this.$router.push({path:'/root'});
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
    .title {
        position: relative;
        text-align: center;
        overflow: hidden;
        font-size: 14px;
        color: #999;
    }

    .title::before,
    .title::after {
        content: '';
        display: inline-block;
        width: 100%;
        height: 1px;
        position: absolute;
        background: #ccc;
        top: 50%;
    }

    .title::before {
        margin-left: -10px;
        transform: translateX(-100%);
    }

    .title::after {
        margin-left: 10px;
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
        background-size:cover;
    }

    .clearfix:after {
        content: ".";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }

    .header .logo-title {
        float: left;
        height: 34px;
        line-height: 34px;
        font-size: 34px;
        color: #333;
        margin-top: 54px;
    }

    .q-link {
        position: relative;
        color: #999;
        float: right;
        top: 40px;
    }

    .body {
        width: auto;
        height: 650px;
        margin: 60px;
        background: url(../assets/log.jpeg);
        padding-top: 40px;
        background-repeat: no-repeat;
        background-size: cover;
    }

    .login {
        -webkit-border-radius: 5px;
        border-radius: 10px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        margin: auto auto;
        height: 300px;
        width: 350px;
        padding: 50px 50px 50px 50px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }

    .el-button--info {
        background-color: #20B2AA;
        border-color: #20B2AA;
        color: #EAEAEA;
    }

    .input {
        width: 50%;

        border: 1px solid #ccc;

        float: left;

        box-sizing: border-box;
    }

</style>
<template>
  <div id="nav" class="ma">
    <my-alert ref="myAlert"></my-alert>
    <el-container>
      <el-header>
        <div class="header">
          <div class="logo-con w clearfix">
            <a href="http://localhost:8080" class="logo "></a>
            <div class="logo-title" v-if="!Islogin" @click="gotologin()">欢迎登陆</div>
            <a target="_blank" class="q-link" style="outline: rgb(109, 109, 109) none 10px;" v-if="Islogin" @click="dialogVisible=true"><b></b>退出登录</a>
<!--            购物车-->

            <i class="el-icon-shopping-cart-1" @click="this.$router.push('/shopCar')"></i>
            <i class="el-icon-user" @click="this.$router.push('/userdetail')"  ></i>
            <i class="el-icon-coordinate" @click="this.$router.push('/register')" ></i>
            <i class="el-icon-s-order" @click="this.$router.push('/dealView')"  ></i>
            <router-link to="/root" v-if="Islogin">
              <el-button type="primary" v-if="admin=='admin'">管理员</el-button>
            </router-link>
          </div>
        </div>


      </el-header>

      <el-main>
        <router-view v-if="isRouterAlive"/>
      </el-main>


      <el-footer>
        <div class="w">
          <div class="links">
            <a rel="nofollow" target="_blank" href="//about.jd.com/">
              关于我们
            </a>
            |
            <a rel="nofollow" target="_blank" href="//www.jd.com/contact/">
              联系我们
            </a>
            |
            <a rel="nofollow" target="_blank" href="//zhaopin.jd.com/">
              人才招聘
            </a>
            |
            <a rel="nofollow" target="_blank" href="//lai.jd.com/">
              商家入驻
            </a>
            |
            <a rel="nofollow" target="_blank" href="//jzt.jd.com/">
              广告服务
            </a>
            |
            <a rel="nofollow" target="_blank" href="//app.jd.com/">
              手机购物
            </a>
            |
            <a target="_blank" href="//club.jd.com/links.aspx">
              友情链接
            </a>
            |
            <a target="_blank" href="//media.jd.com/">
              销售联盟
            </a>
            |
            <a href="//pro.jd.com/mall/active/3WA2zN8wkwc9fL9TxAJXHh5Nj79u/index.html" target="_blank">
              交易社区
            </a>
            |
            <a href="//gongyi.jd.com" target="_blank">
              平台公益
            </a>
            |
            <a target="_blank" href="//www.joybuy.com/" clstag="pageclick|keycount|20150112ABD|9">English
              Site</a>
          </div>
        </div>
        <div class="copyright">
          Copyright&nbsp;©&nbsp;2004-2021&nbsp;&nbsp;购物GW.com&nbsp;版权所有
        </div>

      </el-footer>
    </el-container>

    <el-dialog
            title="提示"
            v-model="dialogVisible"
            width="30%"
            :before-close="handleClose">
      <span>确定退出登录</span>
      <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="goout">确 定</el-button>
    </span>
      </template>
    </el-dialog>


  </div>

</template>

<script>
  import * as UserAPI from './api/user/index.js'
  export default{
    inject:['reload'],
    provide(){
      return{
        reload:this.reload,
      }
    },
    data() {
      return {
        goodUUid: 'c6118fa9-063f-4b34-a3f0-56cc3b2d7236',
        isRouterAlive:true,
        userId:"",
        businesssId:"",
        admin:"",
        Islogin:false,
        dialogVisible:false,

      }
    },
    created() {
      this.userId=UserAPI.getCookie("userId:")
      this.businesssId=UserAPI.getCookie("businesssId:")
      this.admin=UserAPI.getCookie("admin:")
      if(this.userId!=""||this.businesssId!=""||this.admin!=""){
        this.Islogin=true
      }else{
        this.Islogin=false
      }

    },
    methods:{
      //页面刷新功能
      reload(){
        this.isRouterAlive=false
        this.$nextTick(function () {
          this.isRouterAlive=true
        })
      },
      gotologin(){
        this.$refs.myAlert.setAlert("xiao","success","tishi")
        console.log("aa")
        this.$router.push('/login');
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
      },
    }
  }
</script>
<!--<style>-->
<!--#app {-->
<!--  font-family: Avenir, Helvetica, Arial, sans-serif;-->
<!--  -webkit-font-smoothing: antialiased;-->
<!--  -moz-osx-font-smoothing: grayscale;-->
<!--  text-align: center;-->
<!--  color: #2c3e50;-->

<!--}-->
<!--.ma{-->
<!--  margin:0 auto;width:1000px-->
<!--}-->

<!--#nav {-->
<!--  padding: 30px;-->
<!--}-->

<!--#nav a {-->
<!--  font-weight: bold;-->
<!--  color: #2c3e50;-->
<!--}-->

<!--#nav a.router-link-exact-active {-->
<!--  color: #42b983;-->
<!--}-->
<!--</style>-->
<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;

  }

  .ma {
    background-color: #e7f7ff;
    margin: 0 auto;
    width: 1400px;
  }

  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }

  .w {
    /* width: px; */
    margin: 0 auto;
  }

  .links {
    padding-top: 10px;
  }
  .el-icon-my-export{
    background: url(./assets/login.png) center no-repeat;
    background-size: cover;
  }
  .el-icon-my-export:before{
    content: "替";
    font-size: 16px;
    visibility: hidden;
  }
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
    background: url(./assets/logo1.png) no-repeat;
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
    background: url(./assets/log.jpeg);
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
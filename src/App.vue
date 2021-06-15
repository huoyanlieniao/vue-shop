<template>
  <div id="nav" class="ma">
    <el-container>
      <el-header>
        <router-link to="/login">
          <el-button type="primary">登录</el-button>
        </router-link>
        <router-link to="/about">
          <el-button type="primary">关于</el-button>
        </router-link>
        <router-link to="/register">
          <el-button type="primary">普通注册</el-button>
        </router-link>
        <router-link to="/registerbusiness">
          <el-button type="primary">商家注册</el-button>
        </router-link>
        <router-link to="/userdetail">
          <el-button type="primary">用户详细信息</el-button>
        </router-link>
<!--        <router-link to="/gooddetail">-->
<!--        <el-button type="primary">商品详情页</el-button>-->
<!--      </router-link>-->

        <router-link :to="{path:'/gooddetail',query:{goodsUUID:this.goodUUid}}">
          <el-button type="primary">商品详情页</el-button>
        </router-link>

      </el-header>

      <el-main>
        <router-view/>
      </el-main>


      <el-footer>Footer</el-footer>
    </el-container>

  </div>

</template>

<script>
  export default{
    provide(){
      return{
        reload:this.reload
      }
    },
    data() {
      return {
        goodUUid: 'c6118fa9-063f-4b34-a3f0-56cc3b2d7236',
        isRouterAlive:true
      }
    },
    methods:{
      //页面刷新功能
      reload(){
        this.isRouterAlive=false
        this.$nextTick(function () {
          this.isRouterAlive=true

        })
      }
    }
  }
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
.ma{
  margin:0 auto;width:1000px
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
</style>

<template>
  <div id="nav">
    <el-container>
      <el-header>
        <router-link to="/login">
          <el-button type="primary">主要按钮</el-button>
        </router-link>
        <router-link to="/registerbusiness">About</router-link>
      </el-header>

      <el-main>
        <router-view/>
      </el-main>


      <el-footer>Footer</el-footer>
    </el-container>

  </div>

</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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

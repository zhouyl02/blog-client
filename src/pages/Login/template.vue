<template>
  <div id="login">
    <h4>用户名</h4>
    <input  placeholder="用户名" type="username" v-model="username">
    <h4>密码</h4>
    <input  placeholder="密码" type="password" v-model="password" @keyup.13="onlogin">
    <el-button size="small" @click="onlogin">立即登录</el-button>
    <p class="notice">没有账号 ? <router-link to="/register">注册新用户</router-link></p>
  </div>
</template>
<script src="./template.js"></script>
<style scoped lang="less" src="./template.less"></style>

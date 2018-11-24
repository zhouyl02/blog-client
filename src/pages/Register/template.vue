<template>
  <div id="register">
    <h4>用户名</h4>
    <input  placeholder="用户名" style="username" v-model="username">
    <h4>密码</h4>
    <input  placeholder="密码" style="password" v-model="password" @keyup.enter="onRegister">
    <el-button size="small" @click="onRegister">立即注册</el-button>
    <p class="notice">已有账号 ? <router-link to="/login">立即登录</router-link></p>
  </div>
</template>
<script src="./template.js"></script>
<style scoped lang="less" src="./template.less"></style>

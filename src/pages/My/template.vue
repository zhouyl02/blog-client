<template>
  <div id="my">
    <section class="user-info">
      <img :src="user.avatar" :alt="user.username">
      <h3>{{user.username}}</h3>
    </section>
    <section class="contents">
      <router-link class="item" v-for="blog in blogs" :to="`/detail/${blog.id}`" :key="blog.id">
        <div class="date">
          <p class="day">{{splitDate(blog.createdAt).date}}</p>
          <p class="mouth">{{splitDate(blog.createdAt).month}}月</p>
          <p class="year">{{splitDate(blog.createdAt).year}}</p>
        </div>
        <h3>{{blog.title}}</h3>
        <p>{{blog.description}}</p>
        <div class="actions">
          <router-link :to="`/edit/${blog.id}`" class="edit">编辑</router-link>
          <a href="#" @click.prevent="onDelete(blog.id)" class="delete">删除</a>
        </div>
      </router-link>
    </section>
    <section class="changePage">
      <el-pagination  layout="prev, pager, next"  :total="total" @current-change="pageChange" :current-page.sync="page"></el-pagination>
    </section>
  </div>
</template>
<script src="./template.js"></script>
<style scoped lang="less" src="./template.less"></style>

<template>
  <div id="index">
    <section>
      <div class="item" v-for="blog in blogs" :key="blog.id">
        <figure class="avatar">
          <router-link :to="`/user/${blog.user.id}`">
            <img :src="blog.user.avatar" alt="">
            <figcaption>{{blog.user.username}}</figcaption>
          </router-link>
        </figure>
        <router-link :to="`/detail/${blog.id}`" class="content"><h3>{{blog.title}} <span>{{changeTime(blog.createdAt)}}</span></h3></router-link>
        <router-link :to="`/detail/${blog.id}`" class="content"><p>{{blog.description}}</p></router-link>
      </div>
    </section>
    <section class="changePage">
      <el-pagination layout="prev, pager, next" :total="total" @current-change="pageChange" :current-page.sync="page">
  </el-pagination>
    </section>
  </div>
</template>
<script src="./template.js"></script>
<style scoped lang="less" src="./template.less"></style>

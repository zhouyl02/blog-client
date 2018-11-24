# Vue-Blog-Client
> Vue 2.5 开发共享博客客户端。

## 项目涉及到技术栈：
- Vue：Vue、Vue-router、Vuex、Vue-cli
- CSS的预处理框架：less
- 插件：ElementUI、axios、marked
- 接口：auth.js、blog.js

# 项目记录
## 安装 / 导入 ElementUI
```
npm i element-ui -S
```

```JavaScript
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)
```

## 静态页布局
大量使用 `Grid` 网格布局
```LESS
.item {
  display: grid;
  grid: auto auto / 80px 1fr;  // grid: 行 / 列
  margin: 20px 0;

  .avatar {
    grid-column: 1 / 2;   //列 范围取：  1 - 2 线之间
    grid-row: 1 / span 2;      //行 范围取：  1 - 3 线之间（span 2 横跨 2）
    justify-self: center;
    margin-left: 0;
    text-align: center;
  }
}
```

## helper request.js
将 `axios` 再一次进行封装

## Vuex
创建 `store`，并拆分 `modules`。将用户相关放入 `auth.js` ，博客内容相关放入 `blog.js` 。
使用 `Vuex` 实现 登录/注册 。

### 完善动态路由 和 权限
修改 `router` 中 `index.js` 结构。先 `new Router`，最后 `export default router` 导出。
```JavaScript
// 每次路由切换执行对应函数 判断用户是否登录 没有登录则跳转 login
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    store.dispatch('checkLogin').then(isLogin => {
      if (!isLogin) {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      } else {
        next()
      }
    })
  } else {
    next() // 确保一定要调用 next()
  }
})
```

## 完善 pages
### 创建页
使用 `el-switch`，搭配 `atIndex` 选择是否展示。
```HTML
<p>
  <label>是否展示到首页</label>
  <el-switch v-model="atIndex" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
</p>
```

```JavaScript
methods: {
  onCreate () {
    blog.createBlog({ title: this.title, content: this.content, description: this.description, atIndex: this.atIndex })
      .then(res => {
        this.$message.success(res.msg)
        this.$router.push({ path: `/detail/${res.data.id}`})
      })
  }
}
```

### 首页
分页组件
```HTML
<section>
  <el-pagination layout="prev, pager, next" :total="total" @current-change="onPageChange"></el-pagination>
</section>
```

### 详情页
安装 `marked`，在 `computed` 中声明，并在模板中使用。
```JavaScript
computed: {
  markdown () {
    return marked(this.rawContent)
  }
}
```
```HTML
<section class="article" v-html="markdown">
  {{markdown}}
</section>
```

**添加 util.js 插件，并使用 `export default` 导出使其成为全局方法，作为 `friendlyDate` 显示'友好'时间**
```JavaScript
export default {
  install(Vue, options) {
    Vue.prototype.friendlyDate = friendlyDate
  }
}
```


### 用户页
使用 `splitDate` 函数格式化年月日事件并在模板中使用。
```JavaScript
// 格式化 年 月 日
splitDate (dataStr) {
  let dateObj = typeof dataStr === 'object' ? dataStr : new Date(dataStr)
  return {
    date: dateObj.getDate(),
    month: dateObj.getMonth() + 1,
    year: dateObj.getFullYear()
  }
}
```
```HTML
<div class="data">
  <span class="day">{{splitDate(blog.createdAt).date}}</span>
  <span class="month">{{splitDate(blog.createdAt).month}}</span>
  <span class="year">{{splitDate(blog.createdAt).year}}</span>
</div>
```

### 我的页面
和用户页雷同，清除所有和 `user` 数据相关的逻辑。增加 `router-link` 跳转到编辑页，并新增删除功能接口
```JavaScript
onDelete (blogId) {
  console.log(blogId)
  this.$confirm('此操作将永久删除该博客，是否继续?','提示',{
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    blog.deleteBlog({ blogId }).then(() => {
      this.$message({
        type: 'success',
        message: '删除成功!'
      })
      this.blogs = this.blogs.filter(blog => blog.id != blogId)  //删除后立即刷新 DOM
    })
  })
}
```

### 编辑页
和创建页逻辑结构和逻辑相似，但需要获取编辑页已有数据。
```JavaScript
// 利用 created 生命周期钩子来获取编辑页的数据
created () {
  this.blogId = this.$route.params.blogId
  blog.getDetail({ blogId: this.blogId }).then(res => {
    this.title = res.data.title
    this.description = res.data.description
    this.content = res.data.content
    this.atIndex = res.data.atIndex
  })
}
```

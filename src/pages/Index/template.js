import blog from '@/api/blog.js'

export default {
    data(){
      return {
        blogs: [],
        total: 0,
        page: 1
      }
    },
    created(){
      this.page = parseInt(this.$route.query.page) || 1
      blog.getBlogs({page: this.page}).then(res=>{
        this.blogs = res.data
        this.total = res.total
        this.page = res.page
      })
    },
    methods: {
      pageChange(newPage){
        blog.getBlogs({page: newPage}).then(res=>{
          this.blogs = res.data
          this.total = res.total
          this.page = res.page
          this.$router.push({path: '/', query: {page: newPage}})
        })
      }
    }
  }
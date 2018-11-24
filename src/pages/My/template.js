import blog from '@/api/blog'
import {mapGetters} from 'vuex'

export default {
  data () {
    return {
      blogs: [],
      total: 0,
      page: 1
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  created(){
    this.page = parseInt(this.$route.query.page) || 1
    blog.userBlogs(this.user.id, this.page).then((res)=>{
      this.blogs = res.data
      this.total = res.total
      this.page = res.page
    })
  },
  methods: {
    pageChange(newPage){
      blog.userBlogs(this.user.id, newPage).then((res)=>{
        this.blogs = res.data
        this.page = res.page
        this.$router.push({path: '/my', query: {page: newPage}})
      })
    },
    splitDate(time){
      let dataTime = typeof time === 'object' ? time : new Date(time)
      return{
        date: dataTime.getDate(),
        month: dataTime.getMonth() + 1,
        year: dataTime.getFullYear()
      }
    },
    async onDelete(blogId){
      await this.$confirm('此操作将永久删除该博客, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      await blog.delete(blogId)
      this.$message.success('删除成功!')
      this.blogs = this.blogs.filter(blog => blog.id != blogId)
    }
  }
}
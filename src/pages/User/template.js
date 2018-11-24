import blog from '@/api/blog'

export default {
  data () {
    return {
      user: {},
      blogs: [],
      page: 1,
      total: 0
    }
  },
  created(){
    this.userId = this.$route.params.userId
    this.page = parseInt(this.$route.query.page) || 1
    blog.userBlogs(this.userId, this.page).then((res)=>{
      this.blogs = res.data
      this.page = res.page
      this.total = res.total
      if(res.data.length > 0){
        this.user = res.data[0].user
      }
    })
  }, 
  methods: {
    pageChange(newPage){
      blog.userBlogs(this.userId, newPage).then((res)=>{
        this.page = res.page
        this.blogs = res.data
        this.$router.push({path: `/user/${this.userId}`, query: {page: newPage}})
      })
    },
    splitTime(time){
      let dataTime = typeof(time) === 'object' ? time : new Date(time)
      return {
        date: dataTime.getDate(),
        month: dataTime.getMonth() + 1,
        year: dataTime.getFullYear() 
      }
    }
  }
}
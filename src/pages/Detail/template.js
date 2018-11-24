import blog from '@/api/blog'
import marked from 'marked'

export default {
    name: 'HelloWorld',
    data () {
      return {
        title: '',
        user: {},
        rawContent: '',
        createdAt: ''
      }
    },
    created(){
      blog.getDetail(this.$route.params.blogId).then( res=>{
        this.title = res.data.title
        this.user = res.data.user
        this.rawContent = res.data.content
        this.createdAt = res.data.createdAt
      })
    },
    computed: {
      markdown(){
        return marked(this.rawContent)
      }
    }
  }
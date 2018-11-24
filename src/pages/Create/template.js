import blog from '@/api/blog'

export default {
    data () {
      return {
        atIndex: false,
        title: '',
        description: '',
        content: ''
      }
    },
    methods: {
      onCreate(){
        blog.create({title: this.title, content: this.content, description: this.description, atIndex: this.atIndex})
        .then(res => {
          this.$message.success(res.msg)
          this.$router.push({path: `/detail/${res.data.id}`})
        })
      }
    }
}
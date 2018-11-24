<template>
  <header :class="{'login': isLogin, 'no-login': !isLogin}">
    <template v-if="!isLogin">
      <h1><router-link to="/">Let's share</router-link></h1>
      <p>精品博客汇聚</p>
      <div class="bts">
        <router-link to="/login"><el-button>立即登录</el-button></router-link>
        <router-link to="/register"><el-button>注册账号</el-button></router-link>
      </div>
    </template>
    <template v-if="isLogin">
      <h1><router-link to="/">Let's share</router-link></h1>
      <router-link to="/create"><i class="edit el-icon-edit-outline"></i></router-link>
      <div class="avatar">
        <img :src="user.avatar" :alt="user.username">
        <ul>
          <li><router-link to="/my">我的</router-link></li>
          <li><a href="#" @click="onclick">注销</a></li>
        </ul> 
      </div>      
    </template>
  </header>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      'user',
      'isLogin'
    ])
  },
  created(){
      this.checkLogin()
  },
  methods: {
    ...mapActions([
      'checkLogin',
      'logout'
    ]),
    onclick(){
      this.logout()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  @import '../assets/base.less';
  #header.no-login{
    padding: 0 12% 30px 12%;
    background: @bgColor;
    display: grid;
    justify-items: center;

    h1{
      font-size: 40px;
      margin: 60px 0 0;
      text-transform: uppercase;

      a{
        color: #fff;
      }
    }

    p{
      margin: 15px 0 0;
      color: #fff;
    }

    button{
      margin: 40px 5px 0;
    }
  }

  #header.login{
    background: @bgColor;
    display: flex;
    align-items: center;
    h1{
      font-size: 40px;
      margin: 0;
      padding: 0;
      flex: 1;
      text-transform: uppercase;

      a{
        color: #fff;
      }
    }
    .edit{
      color: #fff;
      font-size: 30px;
    }
    .avatar{
      position: relative;
      img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-left: 15px;
        border: 1px solid #fff;
      }

      ul{
        display: none;
        list-style: none;
        padding: 0;
        margin: 0;
        position: absolute;
        top: 100%;
        right: 0;
        border: 1px solid #eaeaea;
        background-color: #fff;

        a{
          text-decoration: none;
          color: #333;
          font-size: 12px;
          padding: 5px 10px;
          display: block
        }

        li:nth-child(1){
          border-bottom: 1px solid #eaeaea;
        }

        li:nth-child(1):hover,
        li:nth-child(2):hover{
          background-color: #eaeaea;
        }
      }

      &:hover ul{
        display:block
      }
    }
  }
</style>

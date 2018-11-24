import Vue from 'vue'
import Router from 'vue-router'
import Store from '../store'

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/pages/Index/template.vue')
    },
    {
      path: '/login',
      component: () => import('@/pages/Login/template.vue')
    },
    {
      path: '/register',
      component: () => import('@/pages/Register/template.vue')
    },
    {
      path: '/my',
      component: () => import('@/pages/My/template.vue'),
      meta: {requiresAuth: true}
    },
    {
      path: '/user/:userId',
      component: () => import('@/pages/User/template.vue')
    },
    {
      path: '/edit/:blogId',
      component: () => import('@/pages/Edit/template.vue'),
      meta: {requiresAuth: true}
    },
    {
      path: '/detail/:blogId',
      component: () => import('@/pages/Detail/template.vue')
    },
    {
      path: '/create',
      component: () => import('@/pages/Create/template.vue'),
      meta: {requiresAuth: true}
    }
  ]
})

router.beforeEach((to, from, next)=>{
  if(to.matched.some(record => record.meta.requiresAuth)){
    Store.dispatch('checkLogin').then(isLogin => {
      if(!isLogin){
        next({
          path: '/login',
          query: {redirect: to.fullPath}
        })
      }else{
        next()
      }
    })
  }else{
    next()
  }
})

export default router

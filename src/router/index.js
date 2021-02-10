import Vue from 'vue'
import VueRouter from 'vue-router'
import Signup from '@/components/Signup'
import Signin from '@/components/Signin'
import Todo from '@/components/Todo'
import firebase from 'firebase'
import store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: "/signup",
      name: "signup",
      component: Signup
    },
    {
      path: "/signin",
      name: "signin",
      component: Signin
    },
    {
      path: '/',
      name: 'todo',
      component: Todo,
      meta: { requiresAuth: true }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        const userInfo = {
          uid: user.uid,
          email: user.email
        }
        store.commit('setUser', userInfo)
        console.log('vuexにユーザーセット完了')
        next()
      } else {
        console.log('まだログインされてないです')
        next({
          path: '/signin'
        })
      }
    })
  } else {
    next()
  }
})

export default router
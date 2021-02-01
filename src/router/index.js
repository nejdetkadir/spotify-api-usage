import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Auth from '../views/Auth'
import store from "@/store";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter(to, from, next) {
      if (store.getters.isAuthenticated) {
        next()
      } else {
        next("/auth")
      }
    }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    beforeEnter(to, from, next) {
      if (store.getters.isAuthenticated) {
        next("/")
      } else {
        next()
      }
    }
  },
  {
    path: '/auth/callback/*',
    beforeEnter(to, from, next) {
      if (to.query.code !== "" && to.query.code !== undefined) {
        store.commit("setCode", to.query.code)
        store.dispatch("initUser").then(() => {
          next("/")
        }).catch(() => {
          next("/auth")
        })
      } else {
        next("/auth")
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

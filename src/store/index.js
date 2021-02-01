import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import user from "@/store/modules/user";
import track from "@/store/modules/track";
import artist from "@/store/modules/artist";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    track,
    artist
  },
  plugins: [createPersistedState()]
})

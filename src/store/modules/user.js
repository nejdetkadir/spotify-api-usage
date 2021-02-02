import Vue from "vue";
import * as querystring from "querystring";
import router from "@/router";

const state = {
  code: '',
  tokens: {},
  user: {
    images: [
      {
        url: ""
      }
    ]
  }
};

const getters = {
  getCode(state) {
    return state.code
  },
  getTokens(state) {
    return state.tokens
  },
  getUser(state) {
    return state.user
  },
  isAuthenticated(state) {
    return state.code !== ''
  }
};

const mutations = {
  setCode(state, data) {
    state.code = data
  },
  setToken(state, data) {
    state.tokens = data
  },
  setUser(state, data) {
    state.user = data
  },
  clearState(state) {
    state.code = ''
    state.tokens = {}
    state.user = {
      images: [
        {
          url: ""
        }
      ]
    }

    // track
    state.recentlyPlayed = []
    state.currentPlayback = {}
  }
};

const actions = {
  initUser({getters, commit, dispatch}) {
    Vue.axios.post("https://accounts.spotify.com/api/token", querystring.stringify({
      code: getters.getCode,
      redirect_uri: process.env.VUE_APP_SPOTIFY_REDIRECT_URL,
      grant_type: 'authorization_code'
    }), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        'Authorization': 'Basic ' + (new Buffer(process.env.VUE_APP_SPOTIFY_CLIENT_ID + ':' + process.env.VUE_APP_SPOTIFY_CLIENT_SECRET).toString('base64'))
      }
    }).then(res => {
        if (res.status === 200) {
          commit("setToken", res.data)
          dispatch("getUser")
          dispatch("getRecentlyPlayedTracks")
          dispatch("getCurrentPlayback")
          dispatch("getUserTop")
        } else {
          dispatch("logoutUser")
        }
      })
      .catch(() => {
        dispatch("logoutUser")
    });
  },
  getUser({getters, commit}) {
    Vue.axios.get("https://api.spotify.com/v1/me", {
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + getters.getTokens['access_token']
      }
    }).then(res => {
      commit("setUser", res.data)
    })
  },
  logoutUser({commit}) {
    commit("clearState")
    router.replace("/auth")
  },
};

export default {
  state,
  getters,
  mutations,
  actions
};

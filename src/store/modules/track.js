import Vue from "vue";

const state = {
  recentlyPlayed: []
};

const getters = {
  getRecentlyPlayed(state) {
    return state.recentlyPlayed
  }
};

const mutations = {
  setRecentlyPlayed(state, data) {
    state.recentlyPlayed = data
  }
};

const actions = {
  getRecentlyPlayedTracks({getters, commit}) {
    Vue.axios.get("https://api.spotify.com/v1/me/player/recently-played", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        'Authorization': 'Bearer ' + getters.getTokens["access_token"]
      }
    }).then(res => {
      if (res.status === 200) {
        commit("setRecentlyPlayed", res.data.items);
      } else {
        console.log("getRecentlyPlayedTracksError")
      }
    }).catch((err) => {
      console.log("getRecentlyPlayedTracksError : " + err)
    })
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};

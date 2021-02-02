import Vue from "vue";

const state = {
  recentlyPlayed: [],
  currentPlayback: {},
  searchData: {
    artists: {
      items: []
    },
    tracks: {
      items: []
    }
  },
  userTop: {}
};

const getters = {
  getRecentlyPlayed(state) {
    return state.recentlyPlayed
  },
  getCurrentPlayback(state) {
    return state.currentPlayback
  },
  getSearchData(state) {
    return state.searchData
  },
  getUserTop(state) {
    return state.userTop
  }
};

const mutations = {
  setRecentlyPlayed(state, data) {
    state.recentlyPlayed = data
  },
  setCurrentPlayback(state, data) {
    state.currentPlayback = data
  },
  setSearchData(state, data) {
    state.searchData = data
  },
  setUserTop(state, data) {
    state.userTop = data
  }
};

const actions = {
  getRecentlyPlayedTracks({getters, commit}) {
    Vue.axios.get("https://api.spotify.com/v1/me/player/recently-played", {
      headers: {
        "Content-Type": "application/json",
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
  },
  getCurrentPlayback({getters, commit}) {
    Vue.axios.get("https://api.spotify.com/v1/me/player", {
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + getters.getTokens["access_token"]
      }
    }).then(res => {
      if (res.status === 200) {
        commit("setCurrentPlayback", res.data);
      } else {
        console.log("getCurrentPlaybackError")
      }
    }).catch((err) => {
      console.log("getCurrentPlayback : " + err)
    })
  },
  nextTrack({getters, dispatch}) {
    Vue.axios.post(`https://api.spotify.com/v1/me/player/next?device_id=${getters.getCurrentPlayback.device.id}`, {}, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + getters.getTokens["access_token"]
      }
    }).then(() => {
      dispatch("getCurrentPlayback");
    })
  },
  previousTrack({getters, dispatch}) {
    Vue.axios.post(`https://api.spotify.com/v1/me/player/previous?device_id=${getters.getCurrentPlayback.device.id}`, {}, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + getters.getTokens["access_token"]
      }
    }).then(() => {
      dispatch("getCurrentPlayback");
    })
  },
  playTrack({getters, dispatch}, uri) {
    console.log(uri)
    Vue.axios.put(`https://api.spotify.com/v1/me/player/play?device_id=${getters.getCurrentPlayback.device.id}`, JSON.stringify({
      "context_uri": uri,
      "offset": {
        "position": 5
      },
      "position_ms": 0
    }), {
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + getters.getTokens["access_token"]
      }
    }).then(() => {
      dispatch("getCurrentPlayback");
    })
  },
  pauseTrack({getters, dispatch}) {
    Vue.axios.put(`https://api.spotify.com/v1/me/player/pause?device_id=${getters.getCurrentPlayback.device.id}`, {}, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + getters.getTokens["access_token"]
      }
    }).then(() => {
      dispatch("getCurrentPlayback");
    })
  },
  setVolume({getters}, volume) {
    Vue.axios.put(`https://api.spotify.com/v1/me/player/volume?volume_percent=${volume}`, {}, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + getters.getTokens["access_token"]
      }
    }).then(res => {
      if (res.status !== 204) {
        console.log("setVolumeError")
      }
    })
  },
  searchData({getters, commit}, val) {
    Vue.axios.get(`https://api.spotify.com/v1/search?q=${encodeURI(val)}&type=track,artist&market=${getters.getUser.country}`, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + getters.getTokens["access_token"]
      }
    }).then((res) => {
      if (res.status === 200) {
        commit("setSearchData", res.data)
      } else {
        console.log("searchError")
      }
    }).catch(() => {
      console.log("searchError")
    })
  },
  getUserTop({getters, commit}) {
    Vue.axios.get("https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=20", {
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + getters.getTokens["access_token"]
      }
    }).then((res) => {
      if (res.status === 200) {
        commit("setUserTop", res.data)
        console.log(res.data)
      } else {
        console.log("getUserTopError")
      }
    }).catch(() => {
      console.log("getUserTopError")
    })
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};

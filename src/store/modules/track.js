import Vue from "vue";

const state = {
  recentlyPlayed: [],
  currentPlayback: {}
};

const getters = {
  getRecentlyPlayed(state) {
    return state.recentlyPlayed
  },
  getCurrentPlayback(state) {
    return state.currentPlayback
  }
};

const mutations = {
  setRecentlyPlayed(state, data) {
    state.recentlyPlayed = data
  },
  setCurrentPlayback(state, data) {
    return state.currentPlayback = data
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
        console.log(res.data)
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
        console.log("ERROR")
      }
    })
  },
};

export default {
  state,
  getters,
  mutations,
  actions
};

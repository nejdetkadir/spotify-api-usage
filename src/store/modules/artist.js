import Vue from "vue";

const state = {
  artist: {},
  artistTopTracks: [],
  artistAlbums: []
};

const getters = {
  getArtistTopTracks(state) {
    return state.artistTopTracks
  },
  getArtist(state) {
    return state.artist
  },
  getArtistAlbums(state) {
    return state.artistAlbums
  }
};

const mutations = {
  setArtist(state, data) {
    state.artist = data
  },
  setArtistTopTracks(state, data) {
    state.artistTopTracks = data
  },
  clearArtistTopTracks(state) {
    state.artistTopTracks = []
  },
  clearArtist(state) {
    state.artist = {}
  },
  setArtistAlbums(state, data) {
    state.artistAlbums = data
  },
  clearArtistAlbums(state) {
    state.artistAlbums = {}
  }
};

const actions = {
  initArtist({dispatch}, id) {
    if (id !== undefined) {
      dispatch("getArtist", id)
      dispatch("getArtistTopTracks", id)
      dispatch("getArtistAlbums", id)
    }
  },
  getArtistTopTracks({getters, commit}, id) {
    Vue.axios.get(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=${getters.getUser.country}`, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + getters.getTokens["access_token"]
      }
    }).then(res => {
      if (res.status === 200) {
        commit("clearArtistTopTracks")
        commit("setArtistTopTracks", res.data.tracks)
      } else {
        console.log("getArtistTopTracksError")
      }
    }).catch((err) => {
      console.log("getArtistTopTracksError : " + err)
    })
  },
  getArtist({getters, commit}, id) {
    Vue.axios.get(`https://api.spotify.com/v1/artists/${id}`, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + getters.getTokens["access_token"]
      }
    }).then(res => {
      if (res.status === 200) {
        commit("clearArtist")
        commit("setArtist", res.data)
      } else {
        console.log("getRecentlyPlayedTracksError")
      }
    }).catch((err) => {
      console.log("getRecentlyPlayedTracksError : " + err)
    })
  },
  getArtistAlbums({getters, commit}, id) {
    Vue.axios.get(`https://api.spotify.com/v1/artists/${id}/albums`, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + getters.getTokens["access_token"]
      }
    }).then(res => {
      if (res.status === 200) {
        commit("clearArtistAlbums")
        commit("setArtistAlbums", res.data.items)
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

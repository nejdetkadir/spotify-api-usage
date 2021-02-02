import Vue from "vue";
import router from "@/router";

const state = {
  artist: {},
  artistTopTracks: [],
  artistAlbums: [],
  artistAlbum: {}
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
  },
  getArtistAlbum(state) {
    return state.artistAlbum
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
  },
  setArtistAlbum(state, data) {
    state.artistAlbum = data
  },
  clearArtistAlbum(state) {
    state.artistAlbum = {}
  }
};

const actions = {
  initArtist({dispatch}, id) {
    console.log(router.currentRoute.fullPath)
    if (id !== undefined && (router.currentRoute.fullPath.split("/")[1] === "artist" || router.currentRoute.fullPath === "/"  || router.currentRoute.fullPath === "/profile")) {
      console.log("initArtist")
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
        console.log("getArtistError")
      }
    }).catch((err) => {
      console.log("getArtistError : " + err)
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
        console.log("getArtistAlbumsError")
      }
    }).catch((err) => {
      console.log("getArtistAlbumsError : " + err)
    })
  },
  getArtistAlbum({getters, commit, dispatch}, id) {
    Vue.axios.get(`https://api.spotify.com/v1/albums/${id}`, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + getters.getTokens["access_token"]
      }
    }).then(res => {
      if (res.status === 200) {
        commit("clearArtistAlbum")
        commit("setArtistAlbum", res.data)
        dispatch("getArtistAlbums", res.data.artists[0].id)
      } else {
        console.log("getArtistAlbumError")
      }
    }).catch((err) => {
      console.log("getArtistAlbumError : " + err)
    })
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};

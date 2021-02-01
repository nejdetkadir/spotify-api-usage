<template lang="pug">
  div
    Header
    .container-fluid
      .row
        Sidebar
        main.col-md-9.ms-sm-auto.col-lg-10.px-md-4
          .d-flex.justify-content-between.flex-wrap.flex-md-nowrap.align-items-center.pt-3.pb-2.mb-3.border-bottom
            h1.h2.text-white.page-title Recently played tracks
          table.table.table-borderless.text-white
            thead
              tr
                th(scope='col') #
                th(scope='col') Name
                th(scope='col') Album
                th(scope='col').played_at Played at
                th(scope='col')
                  font-awesome-icon(icon="clock")
            tbody
              tr(v-for="(t, index) in this.$store.getters.getRecentlyPlayed" :key="index")
                th(scope='row') {{ index }}
                td
                  .track-details
                    img(:src="t.track.album.images[2].url")
                    div
                      a(@click="playTrack(t)")
                        | {{ t.track.name }}
                      br
                      router-link.artist-name(:to="'/artist/' + artist.id" v-for="(artist, index) in t.track.album.artists" tag="a" :key="index") {{index > 0 ? "," : ""}} {{ artist.name }}
                td
                  router-link(:to="'/album/' + t.track.album.id" tag="a").text-white {{ t.track.name }}
                td.played_at {{ t.played_at }}
                td
                  font-awesome-icon(icon="heart", color="#3cd75f").liked-icon
                  | &nbsp;{{ Math.floor((t.track.duration_ms/1000/60) << 0)}}:{{Math.floor((t.track.duration_ms/1000) % 60)}}
    Footer

</template>

<script>
  import Header from "/src/components/shared/Header"
  import Sidebar from "@/components/shared/Sidebar";
  import Footer from "@/components/shared/Footer";

  export default {
    components: {
      Header,
      Sidebar,
      Footer
    },
    methods: {
      playTrack(t) {
        this.$store.dispatch("playTrack", t.track.album.uri)
      }
    }
  }
</script>

<style scoped>
footer {
  position: fixed;
  height: 100px;
  bottom: 0;
  width: 100%;
}
main{
  background-color: #2b1c5f !important;
}
.page-title{
  font-weight: bold;
  font-size: 70px;
}
a{
  text-decoration: none;
}
a:hover{
  text-decoration: underline;
}
.artist-name{
  color: #97a0a9;
}
.track-details{
  display: flex;
}
.track-details div {
  padding: 0.5rem;
}
table{
  margin-bottom: 100px;
}
@media only screen and (max-width: 600px) {
  main{
    overflow-x: auto !important;
    margin-bottom: 1rem;
  }
  .played_at{
    display: none;
  }
  .liked-icon{
    display: none;
  }
  .table{
    margin-bottom: 50px;
  }
}
</style>

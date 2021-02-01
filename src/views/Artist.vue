<template lang="pug">
  div
    Header
    .container-fluid
      .row
        Sidebar
        main.col-md-9.ms-sm-auto.col-lg-10.px-md-4
          .d-flex.flex-wrap.flex-md-nowrap.align-items-center.pt-3.pb-2.mb-3
            img(:src="this.$store.getters.getArtist.images[1].url")
            .d-block.p-2.text-white
              h1.h2.text-white.page-title {{this.$store.getters.getArtist.name}}
              p
                b Followers :&nbsp;
                | {{ this.$store.getters.getArtist.followers.total }}
              .d-flex
                p
                  b Genres :     &nbsp;
                  a.text-white(v-for="(i, index) in this.$store.getters.getArtist.genres" :key="index") {{ index >  0 ? `, ${i}` : i  }}
          // burada
          .row.text-white
            h1.h1 Popular
            hr.text-white
          table.table.table-borderless.text-white
            thead
              tr
                th(scope='col') #
                th(scope='col') Name
                th(scope='col') Album
                th(scope='col')
                  font-awesome-icon(icon="clock")
            tbody
              tr(v-for="(t, index) in this.$store.getters.getArtistTopTracks" :key="index")
                th(scope='row') {{ index }}
                td
                  .track-details
                    img(:src="t.album.images[2].url")
                    div
                      a(@click="playTrack(t)")
                        | {{ t.name }}
                      br
                      router-link.artist-name(:to="'/artist/' + artist.id" v-for="(artist, index) in t.artists" tag="a" :key="index") {{index > 0 ? "," : ""}} {{ artist.name }}
                td
                  router-link(:to="'/album/' + t.album.id" tag="a").text-white {{ t.name }}
                td {{ Math.floor((t.duration_ms/1000/60) << 0)}}:{{Math.floor((t.duration_ms/1000) % 60)}}
          .row.text-white
            h1.h1 Albums
            hr.text-white
            .col-md-2(v-for="(a, index) in this.$store.getters.getArtistAlbums" :key="index")
              router-link(:to="'/album/' + a.id").album.text-white
                img(:src="a.images[1].url")
                .card-body
                  b.card-text {{a.name}}
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
      this.$store.dispatch("playTrack", t.album.uri)
    }
  },
  created() {
    this.$watch(
        () => this.$route.params,
        (toParams) => {
          if (toParams.id !== undefined) {
            this.$store.dispatch("initArtist", toParams.id)
          }
        }
    )
  },
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
  font-size: 80px;
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
.album{
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-clip: border-box;
  border-radius: .25rem;
}
</style>

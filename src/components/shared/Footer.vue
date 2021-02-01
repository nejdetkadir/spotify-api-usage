<template lang="pug">
  footer.footer.mt-auto.py-3.bg-dark.fixed-bottom
    .row.p-2
      .col-md-2.text-white
        .d-flex
          img(:src="this.$store.getters.getCurrentPlayback.item.album.images[2].url")
          .d-block.p-2
            h6 {{ this.$store.getters.getCurrentPlayback.item.name }}
            router-link.artist-name(:to="'/artist/' + artist.id" v-for="(artist, index) in this.$store.getters.getCurrentPlayback.item.album.artists" tag="a" :key="index") {{index > 0 ? "," : ""}} {{ artist.name }}
      .col-md-1
      .col-md-6
        .d-block.text-center.text-white
          span(@click.prevent="stepBackward()")
            font-awesome-icon(icon="step-backward" size="2x")
          span(@click.prevent="onPlayClick()")
            font-awesome-icon(icon="play-circle" size="2x")
          span(@click.prevent="onPauseClick()" )
            font-awesome-icon(icon="pause-circle" size="2x")
          span(@click.prevent="stepForward()")
            font-awesome-icon(icon="step-forward" size="2x")
        hr.text-white
      .col-md-1
      .col-md-2.text-center
        p.text-white {{ volume }}
        input(v-model='volume' type='range' min='1' max='100' value='50')

</template>

<script>
  export default {
    name: "Footer",
    data() {
      return{
        volume: 50
      }
    },
    methods: {
      stepBackward() {
        this.$store.dispatch("previousTrack")
      },
      onPlayClick() {
        this.$store.dispatch("playTrack", this.$store.getters.getCurrentPlayback.item.album.uri)
      },
      onPauseClick() {
        this.$store.dispatch("pauseTrack")
      },
      stepForward() {
        this.$store.dispatch("nextTrack")
      }
    },
    watch: {
      volume: function (val) {
        if (val >= 0 && val <= 100) {
          this.$store.dispatch("setVolume", parseInt(val));
        }
      }
    }
  }
</script>

<style scoped>
.artist-name{
  color: #97a0a9;
}
</style>

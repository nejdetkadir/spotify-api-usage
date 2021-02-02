<template lang="pug">
  .d-flex.deneme.text-center.h100.text-white.my-bg-dark
    .cover-container.d-flex.w-100.h-100.p-3.mx-auto.flex-column
      header.mb-auto
        div
          img.float-md-start.mb-0(src="@/assets/logo.png")
          nav.nav.nav-masthead.justify-content-center.float-md-end
            a.nav-link.active(aria-current='page' href='https://www.spotify.com/premium/') Premium
            a.nav-link(href='https://support.spotify.com/') Support
            a.nav-link(href='https://www.spotify.com/download/') Download
            a.nav-link(href='https://www.spotify.com/signup/') Sign up
      main.px-3
        h1 Listening is everything
        p.lead Millions of songs and podcasts. No credit card needed.
        button.btn.btn-lg.btn-secondary.fw-bold.mt-2(@click.prevent="signIn()") Sign in&nbsp;
          img#sign-in(src="@/assets/logo.png")
      footer.mt-auto.text-white-50
      | 2021 © Spotify AB
</template>

<script>
  import querystring from "querystring";
  export default {
    methods: {
      signIn() {
        let url = "https://accounts.spotify.com/authorize?" + querystring.stringify({
          response_type: 'code',
          client_id: process.env.VUE_APP_SPOTIFY_CLIENT_ID,
          scope: 'user-read-private user-read-email user-read-recently-played user-read-playback-state user-modify-playback-state user-read-currently-playing user-top-read',
          redirect_uri: process.env.VUE_APP_SPOTIFY_REDIRECT_URL,
        });
        window.location.href = url
      }
    }
  }
</script>

<style scoped>
.btn-secondary,
.btn-secondary:hover,
.btn-secondary:focus {
  background-color: #1ED760 !important;
  color: white;
  text-shadow: none; /* Prevent inheritance from `body` */
  border-color: #1ED760 !important;
}
.cover-container {
  max-width: 42em;
}
.nav-masthead .nav-link {
  padding: .25rem 0;
  font-weight: 700;
  color: rgba(255, 255, 255, .5);
  background-color: transparent;
  border-bottom: .25rem solid transparent;
}
.nav-masthead .nav-link:hover,
.nav-masthead .nav-link:focus {
  border-bottom-color: rgba(255, 255, 255, .25);
}
.nav-masthead .nav-link + .nav-link {
  margin-left: 1rem;
}
.nav-masthead .active {
  color: #fff;
  border-bottom-color: #fff;
}
.h100{
  height: 100vh;
}
img{
  height: 50px;
}
h1{
  font-weight: bold;
}
#sign-in{
  height: 25px;
}
</style>

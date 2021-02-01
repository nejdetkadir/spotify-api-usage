<template lang="pug">
  div
    Header
    .container-fluid
      .row
        Sidebar
        main.col-md-9.ms-sm-auto.col-lg-10.px-md-4
          .d-flex.justify-content-between.flex-wrap.flex-md-nowrap.align-items-center.pt-3.pb-2.mb-3.border-bottom
            h1.h2 Welcome to Spotify
</template>

<script>
  import Header from "/src/components/Header"
  import Sidebar from "@/components/Sidebar";

  export default {
    components: {
      Header,
      Sidebar
    }
  }
</script>

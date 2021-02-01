<template lang="pug">
  nav#sidebarMenu.col-md-3.col-lg-2.d-md-block.my-bg-dark.sidebar.collapse
    .position-sticky.pt-5
      ul.nav.flex-column
        li.nav-item
          router-link(to="/").nav-link
            font-awesome-icon(icon='home')
            | &nbsp;Homepage
        li.nav-item
          router-link(to="/search").nav-link
            font-awesome-icon(icon='search')
            | &nbsp;Search
        li.nav-item
          a.nav-link(href='#')
            font-awesome-icon(icon='list')
            | &nbsp;My Library
      h6.sidebar-heading.d-flex.justify-content-between.align-items-center.px-3.mt-4.mb-1.text-muted
        span YOUR PLAYLISTS
      ul.nav.flex-column.mb-2
        li.nav-item
          a.nav-link(href='#')
            font-awesome-icon(icon='plus-square')
            | &nbsp;Create Playlist
        li.nav-item
          a.nav-link(href='#')
            font-awesome-icon(icon='heart')
            | &nbsp;Liked Songs
</template>

<script>
export default {
name: "Sidebar"
}
</script>

<style scoped>
.sidebar .nav-link {
  color: grey !important;
}

.sidebar .nav-link:hover {
  color: white !important;
}
</style>

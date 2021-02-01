<template lang="pug">
  header.navbar.navbar-dark.sticky-top.my-bg-dark.flex-md-nowrap.p-0.shadow
    a.navbar-brand.col-md-3.col-lg-2.me-0.px-3(href='#')
      img(src="@/assets/logo.png")
    button.navbar-toggler.position-absolute.d-md-none.collapsed(type='button' data-bs-toggle='collapse' data-bs-target='#sidebarMenu' aria-controls='sidebarMenu' aria-expanded='false' aria-label='Toggle navigation')
      span.navbar-toggler-icon
    div.w-100.bg-dark
    ul.navbar-nav.px-3
      li.nav-item.text-nowrap
        button.nav-link.btn.btn-default.text-white(@click.prevent="logout")
          img.profile-img(:src="this.$store.getters.getUser.images[0].url")
          | &nbsp;Sign out ({{this.$store.getters.getUser.display_name}})
</template>

<script>
  export default {
    methods: {
      logout() {
        this.$store.dispatch("logoutUser")
      }
    }
  }
</script>

<style scoped>
img{
  height: 50px;
}
.profile-img{
  height: 40px !important;
  border-radius: 50%;
}
</style>

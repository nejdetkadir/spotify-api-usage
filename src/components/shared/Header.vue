<template lang="pug">
  header.navbar.navbar-dark.sticky-top.my-bg-dark.flex-md-nowrap.p-0.shadow
    a.navbar-brand.col-md-3.col-lg-2.me-0.px-3(href='#')
      img(src="@/assets/logo.png")
    button.navbar-toggler.position-absolute.d-md-none.collapsed(type='button' data-bs-toggle='collapse' data-bs-target='#sidebarMenu' aria-controls='sidebarMenu' aria-expanded='false' aria-label='Toggle navigation')
      span.navbar-toggler-icon
    div.w-100.bg-dark
    ul.navbar-nav.px-3
      li.nav-item.text-nowrap
        button.nav-link.btn.btn-default.text-white(@click.prevent="logout") Sign out
</template>

<script>
  export default {
    methods: {
      logout() {
        this.$store.dispatch("logoutUser").then(() => {

        })
      }
    }
  }
</script>

<style scoped>
img{
  height: 50px;
}
</style>

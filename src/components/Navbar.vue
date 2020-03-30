<template>
  <div class="navbar">

    <nav>
      <div class="nav-wrapper mr-2 indigo darken-2">
        <router-link class="brand-logo" to="/">
          <span>Smoothies</span>
        </router-link>
        <a class="btn-floating btn-large halfway-fab waves-effect waves-light pink">
          <router-link to="/add-smoothie">
            <i class="material-icons">add</i>
          </router-link>
        </a>
      </div>
    </nav>

  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data: () => ({

  })
}
</script>
<style>
  nav .nav-wrapper{
    padding: 0 20px;
  }

</style>

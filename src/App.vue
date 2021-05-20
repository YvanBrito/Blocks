<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view />
  </div>
</template>

<script>
export default {
  created() {
    const html = document.querySelector("html");
    if (html) html.dataset.theme = `theme-light`;
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";
</style>

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
import { ipcRenderer } from "electron";

export default {
  created() {
    const html = document.querySelector("html");
    if (html) html.dataset.theme = `theme-light`;
  },
  mounted() {
    ipcRenderer.on("change-theme", (event, arg) => {
      const html = document.querySelector("html");
      if (html) html.dataset.theme = `theme-${arg}`;
    });
    ipcRenderer.on("change-locale", (event, arg) => {
      this.$i18n.locale = arg;
    });
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";
</style>

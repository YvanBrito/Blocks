<template>
  <div class="middle">
    <button @click.prevent="changeTheme()">Change Theme</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "DatagenEditor",
  components: {},
  methods: {
    changeTheme() {
      const html = document.querySelector("html");
      if (html) {
        if (html.dataset.theme === "theme-dark")
          html.dataset.theme = "theme-light";
        else html.dataset.theme = "theme-dark";
      }
    }
  }
});
</script>

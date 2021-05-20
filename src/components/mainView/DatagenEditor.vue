<template>
  <div class="middle">
    <button @click.prevent="changeTheme()">Change Theme</button>
  </div>
</template>

<script>
export default {
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
    },
  },
};
</script>

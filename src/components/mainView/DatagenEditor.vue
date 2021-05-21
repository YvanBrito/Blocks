<template>
  <div class="middle">
    <button @click.prevent="changeTheme()">{{ $t("menu.changeTheme") }}</button>
    <button @click.prevent="changeLocale()">
      {{ $t("menu.changeLocale") }}
    </button>
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
    changeLocale() {
      this.$i18n.locale = this.$i18n.locale === "pt-br" ? "en-us" : "pt-br";
    },
  },
};
</script>

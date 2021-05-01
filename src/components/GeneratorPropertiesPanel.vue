<template>
  <div class="sidebar right">
    <Resize dir="left" class="resize-x" @resizing="resizingSidebar" />
    <div>GeneratorPropertiesPanel</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Resize from "./Resize.vue";

export default defineComponent({
  name: "GeneratorPropertiesPanel",
  components: { Resize },
  methods: {
    resizingSidebar() {
      const widthSidebarLeft =
        document.querySelector(".sidebar.left")?.clientWidth || 0;
      const widthSidebarRight =
        document.querySelector(".sidebar.right")?.clientWidth || 0;
      const middleWidth =
        window.innerWidth - (widthSidebarLeft + widthSidebarRight);
      document
        .querySelector(".middle")
        ?.setAttribute("style", `width:${middleWidth - 6}px`);
    },
  },
});
</script>

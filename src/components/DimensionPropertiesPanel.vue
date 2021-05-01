<template>
  <div class="sidebar left">
    <div>DimensionPropertiesPanel</div>
    <Resize dir="right" class="resize-x" @resizing="resizingSidebar" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Resize from "@/components/Resize.vue";

export default defineComponent({
  name: "DimensionPropertiesPanel",
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

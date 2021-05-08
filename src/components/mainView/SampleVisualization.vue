<template>
  <div class="bottom">
    <Resize dir="up" class="resize-y" @resizing="resizingSidebar" />
    <div>SampleVisualization</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Resize from "../misc/Resize.vue";

export default defineComponent({
  name: "SampleVisualization",
  components: { Resize },
  methods: {
    resizingSidebar() {
      const heightBottom = document.querySelector(".bottom")?.clientHeight || 0;
      const topHeight = window.innerHeight - heightBottom;
      document
        .querySelector(".top")
        ?.setAttribute("style", `height:${topHeight - 6}px`);
    },
  },
});
</script>

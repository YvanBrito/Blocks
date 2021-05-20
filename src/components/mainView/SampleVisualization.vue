<template>
  <div class="bottom">
    <Resize dir="up" class="resize-y" @resizing="resizingSidebar" />
    <div>SampleVisualization</div>
  </div>
</template>

<script>
import Resize from "../misc/Resize.vue";
export default {
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
};
</script>

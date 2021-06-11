<template>
  <div class="bottom">
    <Resize dir="up" class="resize-y" @resizing="resizingSidebar" />
    <div>SampleVisualization</div>
  </div>
</template>

<script>
import Resize from "@/components/misc/Resize";
export default {
  name: "SampleVisualization",
  components: { Resize },
  methods: {
    resizingSidebar() {
      const heightBottom = document.querySelector(".bottom")?.clientHeight || 0;
      const topHeight = window.innerHeight - heightBottom;
      document
        .querySelector(".top")
        ?.setAttribute("style", `height:${topHeight}px`);
    },
  },
};
</script>

<style src="./style.scss" lang="scss" scoped />

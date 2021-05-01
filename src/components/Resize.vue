<template>
  <div @mousedown="mouseDownResize"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "DimensionPropertiesPanel",
  components: {},
  props: {
    dir: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      sizeY: 0,
      sizeX: 0,
      parentWidth: 0,
    };
  },
  methods: {
    mouseDownResize(e: MouseEvent) {
      this.parentWidth = +this.$parent?.$el.style.width.replace("px", "");
      this.sizeX = e.clientX;
      document.addEventListener("mousemove", this.mouseMoveResize);
      document.addEventListener("mouseup", this.mouseUpResize);
    },
    mouseUpResize() {
      this.sizeX = 0;
      document.removeEventListener("mousemove", this.mouseMoveResize);
    },
    mouseMoveResize(e: MouseEvent) {
      if (this.sizeX) {
        let diff = (this.sizeX - e.clientX) * (this.dir === "right" ? 1 : -1);
        const parent = this.$parent?.$el;
        const width = Math.max(180, this.parentWidth - diff);
        parent.style.width = `${width}px`;

        this.$emit("resizing");
      }
    },
  },
});
</script>

<template>
  <div @mousedown="mouseDownResize"></div>
</template>

<script>
export default {
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
      parentHeight: 0,
    };
  },
  methods: {
    mouseDownResize(e) {
      this.parentWidth = this.$parent?.$el.offsetWidth;
      this.parentHeight = this.$parent?.$el.offsetHeight;
      this.sizeX = this.dir === "right" || this.dir === "left" ? e.clientX : 0;
      this.sizeY = this.dir === "up" || this.dir === "down" ? e.clientY : 0;
      document.addEventListener("mousemove", this.mouseMoveResize);
      document.addEventListener("mouseup", this.mouseUpResize);
    },
    mouseUpResize() {
      this.sizeX = 0;
      this.sizeY = 0;
      document.removeEventListener("mousemove", this.mouseMoveResize);
    },
    mouseMoveResize(e) {
      this.sizeX ? this.horizontalResize(e) : this.verticalResize(e);
      this.$emit("resizing");
    },
    horizontalResize(e) {
      let diff = (this.sizeX - e.clientX) * (this.dir === "right" ? 1 : -1);
      const parent = this.$parent?.$el;
      const width = Math.max(180, this.parentWidth - diff);
      parent.style.width = `${width}px`;
    },
    verticalResize(e) {
      let diff = (this.sizeY - e.clientY) * (this.dir === "down" ? 1 : -1);
      const parent = this.$parent?.$el;
      const height = Math.max(100, this.parentHeight - diff);
      parent.style.height = `${height}px`;
    },
  },
};
</script>

<template>
  <div @mousedown="mouseDownResize"></div>
</template>

<script lang="ts">
import { defineComponent, ref, getCurrentInstance } from "vue";

export default defineComponent({
  name: "DimensionPropertiesPanel",
  components: {},
  props: {
    dir: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const sizeY = ref(0);
    const sizeX = ref(0);
    const parentWidth = ref(0);
    const parentHeight = ref(0);
    const instance = getCurrentInstance();

    function mouseDownResize(e: MouseEvent) {
      parentWidth.value = instance?.parent?.vnode.el?.offsetWidth;
      parentHeight.value = instance?.parent?.vnode.el?.offsetHeight;
      sizeX.value =
        props.dir === "right" || props.dir === "left" ? e.clientX : 0;
      sizeY.value = props.dir === "up" || props.dir === "down" ? e.clientY : 0;
      document.addEventListener("mousemove", mouseMoveResize);
      document.addEventListener("mouseup", mouseUpResize);
    }

    function mouseUpResize() {
      sizeX.value = 0;
      sizeY.value = 0;
      document.removeEventListener("mousemove", mouseMoveResize);
    }

    function mouseMoveResize(e: MouseEvent) {
      sizeX.value ? horizontalResize(e) : verticalResize(e);
      emit("resizing");
    }

    function horizontalResize(e: MouseEvent) {
      let diff = (sizeX.value - e.clientX) * (props.dir === "right" ? 1 : -1);
      const parent = instance?.parent?.vnode.el;
      const width = Math.max(180, parentWidth.value - diff);
      if (parent) parent.style.width = `${width}px`;
    }

    function verticalResize(e: MouseEvent) {
      let diff = (sizeY.value - e.clientY) * (props.dir === "down" ? 1 : -1);
      const parent = instance?.parent?.vnode.el;
      const height = Math.max(100, parentHeight.value - diff);
      if (parent) parent.style.height = `${height}px`;
    }

    return {
      mouseDownResize,
    };
  },
});
</script>

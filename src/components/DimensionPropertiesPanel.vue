<template>
  <div class="sidebar left">
    <div @mousedown="teste">DimensionPropertiesPanel</div>
    <Resize dir="right" class="resize-x" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Resize from "@/components/Resize.vue";

export default defineComponent({
  name: "DimensionPropertiesPanel",
  components: { Resize },
});
</script>

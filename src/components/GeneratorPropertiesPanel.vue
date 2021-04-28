<template>
  <div class="sidebar right">
    <Resize dir="left" class="resize-x" />
    <div>GeneratorPropertiesPanel</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Resize from "./Resize.vue";

export default defineComponent({
  name: "GeneratorPropertiesPanel",
  components: { Resize },
});
</script>

<template>
  <div class="main">
    <div class="top">
      <DimensionPropertiesPanel />
      <DatagenEditor class="middle" />
      <GeneratorPropertiesPanel />
    </div>
    <SampleVisualization class="bottom" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import GeneratorPropertiesPanel from "@/components/GeneratorPropertiesPanel.vue";
import DimensionPropertiesPanel from "@/components/DimensionPropertiesPanel.vue";
import DatagenEditor from "@/components/DatagenEditor.vue";
import SampleVisualization from "@/components/SampleVisualization.vue";

export default defineComponent({
  name: "Main",
  components: {
    GeneratorPropertiesPanel,
    DimensionPropertiesPanel,
    DatagenEditor,
    SampleVisualization,
  },
});
</script>

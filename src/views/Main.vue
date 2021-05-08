<template>
  <div class="main">
    <div class="top">
      <DimensionPropertiesPanel />
      <DatagenEditor />
      <GeneratorPropertiesPanel />
    </div>
    <SampleVisualization />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import GeneratorPropertiesPanel from "@/components/mainView/GeneratorPropertiesPanel.vue";
import DimensionPropertiesPanel from "@/components/mainView/DimensionPropertiesPanel.vue";
import DatagenEditor from "@/components/mainView/DatagenEditor.vue";
import SampleVisualization from "@/components/mainView/SampleVisualization.vue";

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

<template>
  <div class="main">
    <DimensionPropertiesPanel class="sidebar left" />
    <DatagenEditor class="middle" />
    <GeneratorPropertiesPanel class="sidebar right" />
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

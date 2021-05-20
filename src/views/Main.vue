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

<script>
import GeneratorPropertiesPanel from "@/components/mainView/GeneratorPropertiesPanel.vue";
import DimensionPropertiesPanel from "@/components/mainView/DimensionPropertiesPanel.vue";
import DatagenEditor from "@/components/mainView/DatagenEditor.vue";
import SampleVisualization from "@/components/mainView/SampleVisualization.vue";
export default {
  name: "Main",
  components: {
    GeneratorPropertiesPanel,
    DimensionPropertiesPanel,
    DatagenEditor,
    SampleVisualization,
  },
};
</script>

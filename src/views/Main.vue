<template>
  <div class="main">
    <div class="top">
      <DimensionPropertiesPanel />
      <DataModelEditor />
      <GeneratorPropertiesPanel />
    </div>
    <SampleVisualization />
  </div>
</template>

<script>
import GeneratorPropertiesPanel from "@/components/mainView/GeneratorPropertiesPanel";
import DimensionPropertiesPanel from "@/components/mainView/DimensionPropertiesPanel";
import DataModelEditor from "@/components/mainView/DataModelEditor";
import SampleVisualization from "@/components/mainView/SampleVisualization";
export default {
  name: "Main",
  components: {
    GeneratorPropertiesPanel,
    DimensionPropertiesPanel,
    DataModelEditor,
    SampleVisualization,
  },
};
</script>

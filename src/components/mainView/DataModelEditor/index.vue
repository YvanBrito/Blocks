<template>
  <div class="middle">
    <Tab />
    <Table />
  </div>
</template>

<script>
import Table from "./Table.vue";
import Tab from "./Tab.vue";

export default {
  name: "DataModelEditor",
  components: {
    Table,
    Tab,
  },
};
</script>

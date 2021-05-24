<template>
  <div class="middle">
    <div class="tabs">
      <Tab
        v-for="(dm, index) in dataModels"
        :dataModel="dm"
        :index="index"
        :key="index"
      />
      <button @click.prevent="addDataModel()">Add DataModel</button>
    </div>
    <Table />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

import Table from "./Table.vue";
import Tab from "./Tab.vue";

export default {
  name: "DataModelEditor",
  components: {
    Table,
    Tab,
  },
  computed: {
    ...mapGetters(["dataModels"]),
    dataModelID() {
      return this.dataModels.map((dm) => dm.ID);
    },
  },
  methods: {
    ...mapMutations(["addDataModel"]),
  },
};
</script>

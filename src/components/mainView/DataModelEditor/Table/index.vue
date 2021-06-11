<template>
  <div class="table">
    {{ columnsID }}
    <button
      v-if="dataModels.length"
      @click.prevent="addColumnAtDataModelIndex(activeDataModelIndex)"
    >
      Add Column
    </button>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "Table",
  computed: {
    ...mapGetters(["dataModels", "activeDataModelIndex"]),
    activeDataModel() {
      return this.dataModels[this.activeDataModelIndex];
    },
    columnsID() {
      return this.activeDataModel?.columns.map((col) => col.ID);
    },
  },
  methods: {
    ...mapMutations(["addColumnAtDataModelIndex"]),
  },
};
</script>

<style src="./style.scss" lang="scss" scoped />

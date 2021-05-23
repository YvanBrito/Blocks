<template>
  <div class="tab">
    <button @click.prevent="removeDataModel()">Remove DataModel</button>
    {{ dataID }}
    <button @click.prevent="addDataModel()">Add DataModel</button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "Tab",
  computed: {
    ...mapGetters(["dataModels"]),
    dataID() {
      return this.dataModels.map((dm) => dm.ID);
    },
  },
  methods: {
    ...mapMutations(["addDataModel", "removeDataModel"]),
  },
};
</script>

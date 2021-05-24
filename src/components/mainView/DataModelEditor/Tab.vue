<template>
  <div @click.prevent="changeActiveDataModel(index)" class="tab">
    {{ dataModel.ID }}
    <button @click.prevent="removeDataModel(index)">Remove DataModel</button>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import DataModel from "@/utils/DataModel";

export default {
  name: "Tab",
  props: {
    dataModel: {
      type: DataModel,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  methods: {
    ...mapMutations(["removeDataModel", "changeActiveDataModel"]),
  },
};
</script>

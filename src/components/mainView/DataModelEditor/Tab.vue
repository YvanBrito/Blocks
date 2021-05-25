<template>
  <div
    @click.prevent="changeActiveDataModel(index)"
    class="tab"
    :class="{ active: index === activeDataModelIndex }"
  >
    {{ dataModel.name }}
    <button @click.prevent="removeDataModel(index)">
      <font-awesome-icon icon="times" />
    </button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import DataModel from "@/utils/DataModel";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
library.add(faTimes);

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
  computed: {
    ...mapGetters(["activeDataModelIndex"]),
  },
  methods: {
    ...mapMutations(["removeDataModel", "changeActiveDataModel"]),
  },
};
</script>

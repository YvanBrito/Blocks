<template>
  <div
    @click.prevent="selectTab"
    class="tab"
    :class="{ active: index === activeDataModelIndex }"
  >
    {{ dataModel.name }}
    <button @click.prevent="closeDataModel(index)">
      <font-awesome-icon icon="times" />
    </button>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
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
    ...mapMutations(["changeActiveDataModel"]),
    ...mapActions(["closeDataModel"]),
    selectTab(e) {
      if (e.target.classList.contains("tab"))
        this.changeActiveDataModel(this.index);
    },
  },
};
</script>

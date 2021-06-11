<template>
  <div
    @click.left.prevent="selectTab"
    @click.middle.prevent="closeDataModel(index)"
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
      console.log(e.button);
      if (e.target.classList.contains("tab"))
        this.changeActiveDataModel(this.index);
    },
  },
};
</script>

<style src="./style.scss" lang="scss" scoped />

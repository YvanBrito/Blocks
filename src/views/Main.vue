<template>
  <div class="main">
    <div class="top">
      <div class="sidebar left"></div>
      <div class="middle"></div>
      <div class="sidebar right"></div>
    </div>
    <div class="bottom"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Main",
  components: {},
});
</script>

<style lang="scss">
.main {
  display: flex;
  flex-direction: column;
  height: 99vh;
  border: 1px solid cyan;
}

.top {
  display: flex;
  border: 1px solid orange;
  height: 70%;

  .sidebar {
    min-width: 20%;

    &.left {
      border: 1px solid red;
    }

    &.right {
      border: 1px solid blue;
    }
  }

  .middle {
    border: 1px solid black;
    width: 60%;
  }
}

.bottom {
  border: 2px solid yellow;
  height: 30%;
}
</style>

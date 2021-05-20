<template>
  <div class="sidebar left">
    <div class="sidebarContent">
      <span class="sidebarTitle">Dimension Properties</span>
      <div class="infos">
        <table>
          <tr>
            <td>
              <label for="dimensionName">Name</label>
            </td>
            <td>
              <input type="text" name="dimensionName" id="dimensionName" />
            </td>
          </tr>
          <tr>
            <td>
              <span>Type</span>
            </td>
            <td>
              <span>Numeric</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>ID</span>
            </td>
            <td>
              <span>ColumnId</span>
            </td>
          </tr>
          <tr>
            <td>
              <label for="display">Display</label>
            </td>
            <td>
              <input type="checkbox" id="display" />
            </td>
          </tr>
        </table>
      </div>
      <div class="footer">Footer</div>
    </div>
    <Resize dir="right" class="resize-x" @resizing="resizingSidebar" />
  </div>
</template>

<script>
import Resize from "@/components/misc/Resize.vue";
export default {
  name: "DimensionPropertiesPanel",
  components: { Resize },
  methods: {
    resizingSidebar() {
      const widthSidebarLeft =
        document.querySelector(".sidebar.left")?.clientWidth || 0;
      const widthSidebarRight =
        document.querySelector(".sidebar.right")?.clientWidth || 0;
      const middleWidth =
        window.innerWidth - (widthSidebarLeft + widthSidebarRight);
      document
        .querySelector(".middle")
        ?.setAttribute("style", `width:${middleWidth - 6}px`);
    },
  },
};
</script>

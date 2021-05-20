<template>
  <div class="sidebar right">
    <Resize dir="left" class="resize-x" @resizing="resizingSidebar" />
    <div class="sidebarContent">
      <span class="sidebarTitle">Generator Properties</span>
      <div class="infos">
        <table>
          <tr>
            <td>
              <label for="generatorType">Type</label>
            </td>
            <td>
              <select id="generatorType">
                <option value="Gaussian Generator">Gaussian Generator</option>
                <option value="Constant Value">Constant Value</option>
                <option value="Missing Value">Missing Value</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <label for="operator">Operator</label>
            </td>
            <td>
              <select id="operator">
                <option value="sum">sum</option>
                <option value="multiply">multiply</option>
                <option value="subtract">subtract</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <label for="min">Min</label>
            </td>
            <td>
              <input type="text" id="min" />
            </td>
          </tr>
          <tr>
            <td>
              <label for="max">Max</label>
            </td>
            <td>
              <input type="text" id="max" />
            </td>
          </tr>
          <tr>
            <td>
              <label for="disc">Disc</label>
            </td>
            <td>
              <input type="checkbox" id="disc" />
            </td>
          </tr>
        </table>
      </div>
      <div class="footer">Footer</div>
    </div>
  </div>
</template>

<script>
import Resize from "../misc/Resize.vue";
export default {
  name: "GeneratorPropertiesPanel",
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

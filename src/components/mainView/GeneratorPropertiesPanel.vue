<template>
  <div class="sidebar right">
    <Resize dir="left" class="resize-x" @resizing="resizingSidebar" />
    <div class="sidebarContent">
      <span class="sidebarTitle">{{
        $t("generatorProperties.generatorProperties")
      }}</span>
      <div class="infos">
        <table>
          <tr>
            <td>
              <label for="generatorType">{{
                $t("generatorProperties.type")
              }}</label>
            </td>
            <td>
              <select id="generatorType">
                <option value="gaussianGenerator">
                  {{ $t("generatorProperties.gaussianGenerator") }}
                </option>
                <option value="constantValue">
                  {{ $t("generatorProperties.constantValue") }}
                </option>
                <option value="missingValue">
                  {{ $t("generatorProperties.missingValue") }}
                </option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <label for="operator">{{
                $t("generatorProperties.operator")
              }}</label>
            </td>
            <td>
              <select id="operator">
                <option value="sum">{{ $t("generatorProperties.sum") }}</option>
                <option value="multiply">
                  {{ $t("generatorProperties.multiply") }}
                </option>
                <option value="subtract">
                  {{ $t("generatorProperties.subtract") }}
                </option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <label for="min">{{ $t("generatorProperties.min") }}</label>
            </td>
            <td>
              <input type="text" id="min" />
            </td>
          </tr>
          <tr>
            <td>
              <label for="max">{{ $t("generatorProperties.max") }}</label>
            </td>
            <td>
              <input type="text" id="max" />
            </td>
          </tr>
          <tr>
            <td>
              <label for="disc">{{ $t("generatorProperties.discrete") }}</label>
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

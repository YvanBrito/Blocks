import Resize from "@/components/misc/Resize.vue";

describe("Resize.vue", () => {
  it("receives a string as dir prop", () => {
    expect(Resize.props.dir.type.name).toBe("String");
  });
});

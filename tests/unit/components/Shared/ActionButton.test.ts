import { mount } from "@vue/test-utils";
import ActionButton from "@/components/Shared/ActionButton.vue";

describe("ActionButton", () => {
  it("renders text", () => {
    const wrapper = mount(ActionButton, {
      props: {
        text: "Im so clickable",
        type: "primary",
      },
    });
    expect(wrapper.text()).toMatch("Im so clickable");
  });

  it("applies one of several styles", () => {
    const wrapper = mount(ActionButton, {
      props: {
        text: "Im so clickable",
        type: "primary",
      },
    });
    const button = wrapper.find("button");
    expect(button.classes("primary")).toBe(true);
  });
});

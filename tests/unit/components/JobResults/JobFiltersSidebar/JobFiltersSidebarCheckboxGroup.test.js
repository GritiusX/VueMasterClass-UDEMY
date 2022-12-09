import { mount } from "@vue/test-utils"; //here we use mount because this component NEEDS from a child component: accordion
import JobFiltersSidebarCheckboxGroup from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue";

import { useStore } from "vuex";
jest.mock("vuex");
import { useRouter } from "vue-router";
jest.mock("vue-router");

describe("JobFiltersSidebarCheckboxGroup", () => {
  const createConfig = (props = {}) => ({
    global: {
      stubs: {
        FontAwesomeIcon: true, //we stub this here, because child component accordion has an icon
      },
    },
    props: {
      header: "Some Header",
      uniqueValues: new Set(["ValueA", "ValueB"]),
      mutation: "Some mutation",
      ...props,
    },
  });

  it("renders unique list of organizations for filtering jobs", async () => {
    const props = {
      uniqueValues: new Set(["ValueA", "ValueB"]),
    };
    const wrapper = mount(JobFiltersSidebarCheckboxGroup, createConfig(props));
    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");
    const inputLabels = wrapper.findAll("[data-test='value']");
    const inputValues = inputLabels.map((node) => node.text());
    expect(inputValues).toEqual(["ValueA", "ValueB"]);
  });

  describe("when user clicks checkbox", () => {
    it("comunicates that user has selected checkbox for value", async () => {
      const commit = jest.fn();
      useStore.mockReturnValue({ commit });

      const $router = { push: jest.fn() };
      useRouter.mockReturnValue($router);

      const props = {
        mutation: "SOME_MUTATION",
        uniqueValues: new Set(["Full-time"]),
      };
      const wrapper = mount(
        JobFiltersSidebarCheckboxGroup,
        createConfig(props)
      );
      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger("click");
      const googleInput = wrapper.find("[data-test='Full-time']");
      await googleInput.setChecked();
      expect(commit).toHaveBeenCalledWith("SOME_MUTATION", ["Full-time"]);
    });

    it("navigates user to job results page to see fresh batch of filtered jobs", async () => {
      useStore.mockReturnValue({ commit: jest.fn() });

      const $router = { push: jest.fn() };
      useRouter.mockReturnValue($router);

      const props = {
        uniqueValues: new Set(["Full-time"]),
      };
      const wrapper = mount(
        JobFiltersSidebarCheckboxGroup,
        createConfig(props)
      );
      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger("click");
      const googleInput = wrapper.find("[data-test='Full-time']");
      await googleInput.setChecked();

      expect($router.push).toHaveBeenCalledWith({ name: "JobResults" });
    });
  });
});

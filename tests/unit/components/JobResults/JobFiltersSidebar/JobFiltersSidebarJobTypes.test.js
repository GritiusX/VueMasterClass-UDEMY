import { mount } from "@vue/test-utils";
import JobFiltersSidebarJobTypes from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarJobTypes.vue";

//here we use mount because this component NEEDS from a child component: accordion

describe("JobFiltersSidebarJobTypes", () => {
  const createConfig = ($store, $router) => ({
    global: {
      mocks: {
        $store,
        $router,
      },
      stubs: {
        FontAwesomeIcon: true, //we stub this here, because child component accordion has an icon
      },
    },
  });
  it("renders unique list of job types for filtering jobs", async () => {
    //this $store will make as it is the real one, so to check on the computed property we have
    //inside the component, the only thing we need is that the $store has a getter that can be called
    // with a specific name, and that it gives us what we need that is a set with an array of mocks
    // in this case they will be an array of mocked strings
    const $store = {
      getters: {
        UNIQUE_JOB_TYPES: new Set(["Full-time", "Part-time"]),
      },
    };
    const $router = {
      push: jest.fn(),
    };
    // here in the wrapper besides mounting our component we are also provide a configuration object
    // with a global object that has the mocks property in it with the $store global property inside of it
    // this make sure that $store is whatever we provide inside of this object by mocking it
    const wrapper = mount(
      JobFiltersSidebarJobTypes,
      createConfig($store, $router)
    );
    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");
    const jobTypeLabels = wrapper.findAll("[data-test='job-type']");
    const jobTypes = jobTypeLabels.map((node) => node.text());
    expect(jobTypes).toEqual(["Full-time", "Part-time"]);
  });
  describe("when user clicks checkbox", () => {
    it("comunicates that user has selected checkbox for job type", async () => {
      const commit = jest.fn();
      const $store = {
        getters: {
          UNIQUE_JOB_TYPES: new Set(["Full-time", "Part-time"]),
        },
        commit,
      };
      const $router = {
        push: jest.fn(),
      };
      const wrapper = mount(
        JobFiltersSidebarJobTypes,
        createConfig($store, $router)
      );
      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger("click");
      const fullTimeInput = wrapper.find("[data-test='Full-time']"); //we just bind on the component the organization
      await fullTimeInput.setChecked(); //makes checkboxes as it they were checked ASYNC
      expect(commit).toHaveBeenCalledWith("ADD_SELECTED_JOB_TYPES", [
        "Full-time",
      ]);
    });
    it("navigate user to job results page to see fresh batch of filtered jobs", async () => {
      const $store = {
        getters: {
          UNIQUE_JOB_TYPES: new Set(["Full-time", "Part-time"]),
        },
        commit: jest.fn(),
      };
      const push = jest.fn();
      const $router = {
        push,
      };
      const wrapper = mount(
        JobFiltersSidebarJobTypes,
        createConfig($store, $router)
      );
      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger("click");
      const fullTimeInput = wrapper.find("[data-test='Full-time']"); //we just bind on the component the organization
      await fullTimeInput.setChecked(); //makes checkboxes as it they were checked ASYNC

      expect(push).toHaveBeenCalledWith({ name: "JobResults" });
    });
  });
});

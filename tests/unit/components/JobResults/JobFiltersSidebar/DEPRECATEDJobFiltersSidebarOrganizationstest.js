// import { mount } from "@vue/test-utils";
// //here we use mount because this component NEEDS from a child component: accordion
// import JobFiltersSidebarOrganizations from "@/components/JobResults/JobFiltersSidebar/DEPRECATEDJobFiltersSidebarOrganizations.vue";

// import { useStore } from "vuex";
// jest.mock("vuex");
// import { useRouter } from "vue-router";
// jest.mock("vue-router");
// import { useUniqueOrganizations } from "@/store/composables";
// jest.mock("@/store/composables");

// describe("JobFiltersSidebarOrganizations", () => {
//   const createConfig = () => ({
//     global: {
//       stubs: {
//         FontAwesomeIcon: true, //we stub this here, because child component accordion has an icon
//       },
//     },
//   });
//   // const createConfig = ($store, $router) => ({
//   //   global: {
//   //     mocks: {
//   //       $store,
//   //       $router,
//   //     },
//   //     stubs: {
//   //       FontAwesomeIcon: true, //we stub this here, because child component accordion has an icon
//   //     },
//   //   },
//   // });
//   it("renders unique list of organizations for filtering jobs", async () => {
//     //this $store will make as it is the real one, so to check on the computed property we have
//     //inside the component, the only thing we need is that the $store has a getter that can be called
//     // with a specific name, and that it gives us what we need that is a set with an array of mocks
//     // in this case they will be an array of mocked strings
//     // const $store = {
//     //   getters: {
//     //     UNIQUE_ORGANIZATIONS: new Set(["Google", "Amazon"]),
//     //   },
//     // };
//     useUniqueOrganizations.mockReturnValue(new Set(["Google", "Amazon"]));
//     // const $router = { push: jest.fn() };
//     // here in the wrapper besides mounting our component we are also provide a configuration object
//     // with a global object that has the mocks property in it with the $store global property inside of it
//     // this make sure that $store is whatever we provide inside of this object by mocking it
//     const wrapper = mount(JobFiltersSidebarOrganizations, createConfig());
//     const clickableArea = wrapper.find("[data-test='clickable-area']");
//     await clickableArea.trigger("click");
//     const organizationLabels = wrapper.findAll("[data-test='organization']");
//     const organizations = organizationLabels.map((node) => node.text());
//     expect(organizations).toEqual(["Google", "Amazon"]);
//   });

//   describe("when user clicks checkbox", () => {
//     it("comunicates that user has selected checkbox for organization", async () => {
//       useUniqueOrganizations.mockReturnValue(new Set(["Google", "Amazon"]));
//       const commit = jest.fn();
//       useStore.mockReturnValue({ commit });
//       // const $store = {
//       //   getters: {
//       //     UNIQUE_ORGANIZATIONS: new Set(["Google", "Amazon"]),
//       //   },
//       //   commit,
//       // };
//       const $router = { push: jest.fn() };
//       useRouter.mockReturnValue($router);
//       const wrapper = mount(JobFiltersSidebarOrganizations, createConfig());
//       const clickableArea = wrapper.find("[data-test='clickable-area']");
//       await clickableArea.trigger("click");
//       const googleInput = wrapper.find("[data-test='Google']"); //we just bind on the component the organization
//       await googleInput.setChecked(); //makes checkboxes as it they were checked ASYNC
//       expect(commit).toHaveBeenCalledWith("ADD_SELECTED_ORGANIZATIONS", [
//         "Google",
//       ]);
//     });

//     it("navigates user to job results page to see fresh batch of filtered jobs", async () => {
//       useUniqueOrganizations.mockReturnValue(new Set(["Google", "Amazon"]));
//       useStore.mockReturnValue({ commit: jest.fn() });
//       // const $store = {
//       //   getters: {
//       //     UNIQUE_ORGANIZATIONS: new Set(["Google", "Amazon"]),
//       //   },
//       //   commit: jest.fn(),
//       // };
//       const $router = { push: jest.fn() };
//       useRouter.mockReturnValue($router);
//       const wrapper = mount(JobFiltersSidebarOrganizations, createConfig());
//       const clickableArea = wrapper.find("[data-test='clickable-area']");
//       await clickableArea.trigger("click");
//       const googleInput = wrapper.find("[data-test='Google']"); //we just bind on the component the organization
//       await googleInput.setChecked(); //makes checkboxes as it they were checked ASYNC

//       expect($router.push).toHaveBeenCalledWith({ name: "JobResults" });
//     });
//   });
// });

import { mount } from "@vue/test-utils";
import { useRouter } from "vue-router";
import JobSearchForm from "@/components/JobSearch/JobSearchForm.vue";
jest.mock("vue-router");
//WITH OPTIONS API, ROUTER USED TO BE MOCKED OUT AS IF IT WAS JUST AN OBJECT
//WITH COMPOSITION API, WE MUST IMPORT USEROUTER COMPOSABLE, AND THEN MOCK IT OUT

const useRouterMock = useRouter as jest.Mock;

describe("JobSearchForm", () => {
  describe("when the user submits form", () => {
    it("directs user to jobs/results page with user's search parameters", async () => {
      const push = jest.fn();

      useRouterMock.mockReturnValue({ push });

      const wrapper = mount(JobSearchForm, {
        attachTo: document.body,
        global: {
          stubs: {
            FontAwesomeIcon: true,
          },
        },
      });

      const roleInput = wrapper.find("[data-test='role-input']");
      await roleInput.setValue("Vue Developer");

      const locationInput = wrapper.find("[data-test='location-input']");
      await locationInput.setValue("Dallas");

      const submitButton = wrapper.find("[data-test='form-submit-button']");
      await submitButton.trigger("click");

      expect(push).toHaveBeenCalledWith({
        name: "JobResults",
        query: {
          role: "Vue Developer",
          location: "Dallas",
        },
      });
    });
  });
});

// ============================== DEPRECATED FROM JAVASCRIPT TO TYPESCRIPT ====================
// describe("JobSearchForm", () => {
//   describe("when the user submits form", () => {
//     it("directs user to jobs/results page with user's search parameters", async () => {
//       const push = jest.fn();
//       //const $router = { push }; //here we are mocking the router so we can use a
//       //similar funtion to push our params in the expect function

//       useRouter.mockReturnValue({ push });

//       const wrapper = mount(JobSearchForm, {
//         attachTo: document.body,
//         global: {
//           // mocks: { //this is commented out because of composition api is no longer needed
//           //   $router,
//           // },
//           stubs: {
//             FontAwesomeIcon: true,
//           },
//         },
//       });

//       const roleInput = wrapper.find("[data-test='role-input']");
//       await roleInput.setValue("Vue Developer");

//       const locationInput = wrapper.find("[data-test='location-input']");
//       await locationInput.setValue("Dallas");

//       const submitButton = wrapper.find("[data-test='form-submit-button']");
//       await submitButton.trigger("click");

//       expect(push).toHaveBeenCalledWith({
//         name: "JobResults",
//         query: {
//           role: "Vue Developer",
//           location: "Dallas",
//         },
//       });
//     });
//   });
// });

//setValue() and trigger() are async, so we need to add async/await to the function

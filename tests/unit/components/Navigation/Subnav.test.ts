import { ref } from "vue";
import { mount } from "@vue/test-utils";
//import { useStore } from "vuex"; //DEPRECATED WE ARE GOING TO MOCK THE STORE COMPOSABLE DIRECTLY
//jest.mock("vuex"); //we are mocking the ENTIRE library
import { useFilteredJobs } from "@/store/composables";
jest.mock("@/store/composables"); //we are mocking the useFilteredJobs composable

import useConfirmRoute from "@/composables/useConfirmRoute";
jest.mock("@/composables/useConfirmRoute"); //we are mocking the useConfirmRoute composable

import Subnav from "@/components/Navigation/Subnav.vue";

const useConfirmRouteMock = useConfirmRoute as jest.Mock;
const useFilteredJobsMock = useFilteredJobs as jest.Mock;

describe("Subnav", () => {
  const createConfig = () => ({
    global: {
      stubs: {
        FontAwesomeIcon: true,
      },
    },
  });
  // // DEPRECATED FUNCTION BECAUSE OF COMPOSITION API WRITING STYLE
  // const createConfig = (routeName, $store = {}) => ({
  //   global: {
  //     mocks: {
  //       $route: { name: routeName },
  //       $store,
  //     }, // we access the "route" mock from the variable
  //     stubs: {
  //       FontAwesomeIcon: true,
  //     },
  //   },
  // });

  describe("when user is on job page", () => {
    it("displays job count", () => {
      //useRoute.mockReturnValue({ name: "JobResults" }); we are not using it because of the COMPOSABLE
      useConfirmRouteMock.mockReturnValue(ref(true));

      //we bring the useRoute ALREADY MOCKED function, and we add the value that we need for the test
      // useStore.mockReturnValue({ //DEPRECATED BERCAUSE WE ARE USING THE FILTEREDJOBS COMPOSABLE
      //   FILTERED_JOBS: [{ id: 1 }, { id: 2 }],
      //   //same here, we call the MOCKED useStore function and we make it have this gettters value for the test
      // });

      useFilteredJobsMock.mockReturnValue([{ id: 1 }, { id: 2 }]); //same here, we call the MOCKED useStore function and we make it have this gettters value for the test

      const wrapper = mount(Subnav, createConfig());
      const jobCount = wrapper.find("[data-test='job-count']");
      expect(jobCount.text()).toMatch("2 jobs matched");
    });
  });

  describe("when user is not on job page", () => {
    it("does NOT display job count", () => {
      //useRoute.mockReturnValue({ name: "Home" });
      useConfirmRouteMock.mockReturnValue(ref(false));

      // useStore.mockReturnValue({ //SAME DEPRECATION, WE ARE MOCKING DE USEFILTEREDJOBS COMPOSABLE DIRECTLY
      //   getters: {
      //     FILTERED_JOBS: [],
      //   },
      // });

      useFilteredJobsMock.mockReturnValue([]); //same here, we call the MOCKED useStore function and we make it have this gettters value for the test

      const wrapper = mount(Subnav, createConfig());
      const jobCount = wrapper.find("[data-test='job-count']");
      expect(jobCount.exists()).toBe(false);
    });
  });

  // //-------------  DEPRECATED TESTS DUE TO USING COMPOSITION API  --------------
  // describe("when user is on job page", () => {
  //   it("displays job count", () => {
  //     // const $route = {
  //     //   name: "JobResults",
  //     // }; //this is going to be the mock of the route we need to acces
  //     // // when we "enter" to this route while testing
  //     const routeName = "JobResults";
  //     const $store = {
  //       getters: {
  //         FILTERED_JOBS: [{ id: 1 }, { id: 2 }],
  //       },
  //     };
  //     const wrapper = mount(
  //       Subnav,
  //       createConfig(routeName, $store)
  //       // { //old test
  //       //   global: {
  //       //     mocks: {
  //       //       $route,
  //       //     }, // we access the "route" mock from the variable
  //       //     stubs: {
  //       //       FontAwesomeIcon: true,
  //       //     },
  //       //   },
  //       //   // data() {
  //       //   //   return {
  //       //   //     onJobsResultsPage: true,
  //       //   //   };
  //       //   // },
  //       // }
  //     );
  //     const jobCount = wrapper.find("[data-test='job-count']");
  //     //expect(jobCount.exists()).toBe(true); //old test
  //     expect(jobCount.text()).toMatch("2 jobs matched");
  //   });
  // });

  // describe("when user is not on job page", () => {
  //   it("does NOT display job count", () => {
  //     const $route = {
  //       name: "Home",
  //     }; //this is going to be the mock of the route we need to acces
  //     // when we "enter" to this route while testing

  //     const wrapper = mount(Subnav, {
  //       global: {
  //         mocks: {
  //           $route,
  //         }, // we access the "route" mock from the variable
  //         stubs: {
  //           FontAwesomeIcon: true,
  //         },
  //       },
  //       // data() {
  //       //   return {
  //       //     onJobsResultsPage: false,
  //       //   };
  //       // },
  //     });
  //     const jobCount = wrapper.find("[data-test='job-count']");
  //     expect(jobCount.exists()).toBe(false);
  //   });
  // });
});

// global(Obj) > stubs(Obj): it transforms any HTML tag into whatever JEST wants to make
// the test pass -> use this when you dont want to test sth not important inside
// the component (line 8+)

// .find and .get are close methods, the difference is that find doesn't get any info
// they will return an undefined/empty object BUT if get doesn't find any info
// it will stop the test and show the error - get is for more critical tests than find
// (line 19 // 32)

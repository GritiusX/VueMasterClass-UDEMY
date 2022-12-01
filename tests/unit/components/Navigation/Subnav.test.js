import { mount } from "@vue/test-utils";
import Subnav from "@/components/Navigation/Subnav.vue";

describe("Subnav", () => {
  const createConfig = (routeName, $store = {}) => ({
    global: {
      mocks: {
        $route: { name: routeName },
        $store,
      }, // we access the "route" mock from the variable
      stubs: {
        FontAwesomeIcon: true,
      },
    },
  });

  describe("when user is on job page", () => {
    it("displays job count", () => {
      // const $route = {
      //   name: "JobResults",
      // }; //this is going to be the mock of the route we need to acces
      // // when we "enter" to this route while testing
      const routeName = "JobResults";
      const $store = {
        getters: {
          FILTERED_JOBS: [{ id: 1 }, { id: 2 }],
        },
      };
      const wrapper = mount(
        Subnav,
        createConfig(routeName, $store)
        // { //old test
        //   global: {
        //     mocks: {
        //       $route,
        //     }, // we access the "route" mock from the variable
        //     stubs: {
        //       FontAwesomeIcon: true,
        //     },
        //   },
        //   // data() {
        //   //   return {
        //   //     onJobsResultsPage: true,
        //   //   };
        //   // },
        // }
      );
      const jobCount = wrapper.find("[data-test='job-count']");
      //expect(jobCount.exists()).toBe(true); //old test
      expect(jobCount.text()).toMatch("2 jobs matched");
    });
  });

  describe("when user is not on job page", () => {
    it("does NOT display job count", () => {
      const $route = {
        name: "Home",
      }; //this is going to be the mock of the route we need to acces
      // when we "enter" to this route while testing

      const wrapper = mount(Subnav, {
        global: {
          mocks: {
            $route,
          }, // we access the "route" mock from the variable
          stubs: {
            FontAwesomeIcon: true,
          },
        },
        // data() {
        //   return {
        //     onJobsResultsPage: false,
        //   };
        // },
      });
      const jobCount = wrapper.find("[data-test='job-count']");
      expect(jobCount.exists()).toBe(false);
    });
  });
});

// global(Obj) > stubs(Obj): it transforms any HTML tag into whatever JEST wants to make
// the test pass -> use this when you dont want to test sth not important inside
// the component (line 8+)

// .find and .get are close methods, the difference is that find doesn't get any info
// they will return an undefined/empty object BUT if get doesn't find any info
// it will stop the test and show the error - get is for more critical tests than find
// (line 19 // 32)

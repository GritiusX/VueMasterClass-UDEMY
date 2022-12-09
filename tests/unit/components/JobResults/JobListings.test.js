import { ref } from "vue";

import { flushPromises, shallowMount, RouterLinkStub } from "@vue/test-utils";

import { useFilteredJobs, useFetchJobsDispatch } from "@/store/composables";
jest.mock("@/store/composables");

import useCurrentPage from "@/composables/useCurrentPage";
jest.mock("@/composables/useCurrentPage");

import usePreviousAndNextPages from "@/composables/usePreviousAndNextPages";
jest.mock("@/composables/usePreviousAndNextPages");

import JobListings from "@/components/JobResults/JobListings.vue";
//THERE IS AN OLDJobListings test, check comments there!!

describe("JobListings", () => {
  // const createRoute = (queryParams = {}) => ({ // === NO LONGER NEEDED
  //   query: {
  //     page: "5",
  //     ...queryParams,
  //   },
  // });

  // const createStore = (config = {}) => ({ // === NO LONGER NEEDED
  //   getters: {
  //     FILTERED_JOBS: [],
  //   },
  //   dispatch: jest.fn(),
  //   ...config,
  // });

  // const createConfig = ($route, $store) => ({ === NO LONGER NEEDED LIKE THIS
  //   global: {
  //     mocks: {
  //       $route,
  //       $store,
  //     },
  //     stubs: {
  //       routerLink: RouterLinkStub,
  //     },
  //   },
  // });
  const createConfig = () => ({
    global: {
      stubs: {
        routerLink: RouterLinkStub,
      },
    },
  });

  describe("when the component mounts", () => {
    it("makes call to fetch jobs from API", () => {
      useFilteredJobs.mockReturnValue({ value: [] });
      useCurrentPage.mockReturnValue({ value: 2 });
      usePreviousAndNextPages.mockReturnValue({ previousPage: 1, nextPage: 2 });
      // const $route = createRoute(); // ===== NONE OF THIS ARE NEEDED ANYMORE
      // const dispatch = jest.fn();
      // const $store = createStore({ dispatch });
      shallowMount(JobListings, createConfig());
      // expect(dispatch).toHaveBeenCalledWith("FETCH_JOBS");
      expect(useFetchJobsDispatch).toHaveBeenCalled();
    });
  });

  it("creates a jobListing for a max of 10 jobs", async () => {
    useFilteredJobs.mockReturnValue({ value: Array(15).fill({}) });
    useCurrentPage.mockReturnValue({ value: 1 });
    usePreviousAndNextPages.mockReturnValue({
      previousPage: undefined,
      nextPage: 2,
    });
    // const pageOneRoute = createRoute({ page: "1" }); //this MUST be 1
    // const config = {
    //   getters: {
    //     FILTERED_JOBS: Array(10).fill({}),
    //   },
    // };
    // const $store = createStore(config);
    // const wrapper = shallowMount(
    //   JobListings,
    //   createConfig(pageOneRoute, $store)
    // );
    const wrapper = shallowMount(JobListings, createConfig());
    await flushPromises();
    const jobListings = wrapper.findAll("[data-test='job-listing']");
    expect(jobListings).toHaveLength(10);
  });

  // describe("when query params exclude page number", () => {
  //   it("displays page number 1", () => {
  //     const $store = createStore();
  //     const queryParams = { page: undefined };
  //     const $route = createRoute(queryParams);
  //     const wrapper = shallowMount(JobListings, createConfig($route, $store));
  //     expect(wrapper.text()).toMatch("Page 1");
  //   });
  // });

  describe("when query params include page number", () => {
    it("displays page number", () => {
      useFilteredJobs.mockReturnValue({ value: [] });
      useCurrentPage.mockReturnValue(ref(5));
      usePreviousAndNextPages.mockReturnValue({
        previousPage: 4,
        nextPage: 6,
      });
      // const $store = createStore();
      // const queryParams = { page: "3" };
      // const $route = createRoute(queryParams);
      // const wrapper = shallowMount(JobListings, createConfig($route, $store));
      const wrapper = shallowMount(JobListings, createConfig());
      expect(wrapper.text()).toMatch("Page 5");
    });
  });

  describe("when user is on first page of job results", () => {
    it("does not show link to previous page", () => {
      useFilteredJobs.mockReturnValue({ value: [] });
      useCurrentPage.mockReturnValue(ref(1));
      usePreviousAndNextPages.mockReturnValue({
        previousPage: undefined,
        nextPage: 1,
      });
      // const queryParams = { page: "1" };
      // const $route = createRoute(queryParams);
      // const $store = createStore();
      // const wrapper = shallowMount(JobListings, createConfig($route, $store));

      const wrapper = shallowMount(JobListings, createConfig());
      const previousPage = wrapper.find("[data-test='previous-page-link']");
      expect(previousPage.exists()).toBe(false);
    });

    it("show link to next page", async () => {
      useFilteredJobs.mockReturnValue({ value: [] });
      useCurrentPage.mockReturnValue(ref(1));
      usePreviousAndNextPages.mockReturnValue({
        previousPage: undefined,
        nextPage: 1,
      });
      // const $store = createStore({
      //   getters: {
      //     FILTERED_JOBS: Array(15).fill({}),
      //   },
      // });
      // const queryParams = { page: "1" };
      // const $route = createRoute(queryParams);

      // const wrapper = shallowMount(JobListings, createConfig($route, $store));
      const wrapper = shallowMount(JobListings, createConfig());
      await flushPromises();
      const nextPage = wrapper.find("[data-test='next-page-link']");
      expect(nextPage.exists()).toBe(true);
    });
  });

  describe("when user is on last page of job results", () => {
    it("doesnt show link to next page", async () => {
      useFilteredJobs.mockReturnValue({ value: [] });
      useCurrentPage.mockReturnValue(ref(2));
      usePreviousAndNextPages.mockReturnValue({
        previousPage: 1,
        nextPage: undefined,
      });
      // const $store = createStore();
      // const queryParams = { page: "2" };
      // const $route = createRoute(queryParams);
      // const wrapper = shallowMount(JobListings, createConfig($route, $store));

      const wrapper = shallowMount(JobListings, createConfig());
      await flushPromises();
      const nextPage = wrapper.find("[data-test='next-page-link']");
      expect(nextPage.exists()).toBe(false);
    });

    it("shows link to previous page", async () => {
      useFilteredJobs.mockReturnValue({ value: [] });
      useCurrentPage.mockReturnValue(ref(2));
      usePreviousAndNextPages.mockReturnValue({
        previousPage: 1,
        nextPage: undefined,
      });
      // const $store = createStore();
      // const queryParams = { page: "2" };
      // const $route = createRoute(queryParams);
      // const wrapper = shallowMount(JobListings, createConfig($route, $store));

      const wrapper = shallowMount(JobListings, createConfig());
      await flushPromises();
      const previousPage = wrapper.find("[data-test='previous-page-link']");
      expect(previousPage.exists()).toBe(true);
    });
  });
});

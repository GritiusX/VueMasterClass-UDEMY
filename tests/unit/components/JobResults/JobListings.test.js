import { flushPromises, shallowMount, RouterLinkStub } from "@vue/test-utils";
import JobListings from "@/components/JobResults/JobListings.vue";
//THERE IS AN OLDJobListings test, check comments there!!

describe("JobListings", () => {
  const createRoute = (queryParams = {}) => ({
    query: {
      page: "5",
      ...queryParams,
    },
  });
  const createStore = (config = {}) => ({
    getters: {
      FILTERED_JOBS: [],
    },
    dispatch: jest.fn(),
    ...config,
  });

  const createConfig = ($route, $store) => ({
    global: {
      mocks: {
        $route,
        $store,
      },
      stubs: {
        routerLink: RouterLinkStub,
      },
    },
  });
  describe("when the component mounts", () => {
    it("makes call to fetch jobs from API", () => {
      const $route = createRoute();
      const dispatch = jest.fn();
      const $store = createStore({ dispatch });
      shallowMount(JobListings, createConfig($route, $store));
      expect(dispatch).toHaveBeenCalledWith("FETCH_JOBS");
    });
  });

  it("creates a jobListing for a max of 10 jobs", async () => {
    const pageOneRoute = createRoute({ page: "1" }); //this MUST be 1
    const config = {
      getters: {
        FILTERED_JOBS: Array(10).fill({}),
      },
    };
    const $store = createStore(config);
    const wrapper = shallowMount(
      JobListings,
      createConfig(pageOneRoute, $store)
    );
    await flushPromises();
    const jobListings = wrapper.findAll("[data-test='job-listing']");
    expect(jobListings).toHaveLength(10);
  });

  describe("when query params exclude page number", () => {
    it("displays page number 1", () => {
      const $store = createStore();
      const queryParams = { page: undefined };
      const $route = createRoute(queryParams);
      const wrapper = shallowMount(JobListings, createConfig($route, $store));
      expect(wrapper.text()).toMatch("Page 1");
    });
  });

  describe("when query params include page number", () => {
    it("displays page number", () => {
      const $store = createStore();
      const queryParams = { page: "3" };
      const $route = createRoute(queryParams);
      const wrapper = shallowMount(JobListings, createConfig($route, $store));
      expect(wrapper.text()).toMatch("Page 3");
    });
  });

  describe("when user is on first page of job results", () => {
    it("does not show link to previous page", () => {
      const queryParams = { page: "1" };
      const $route = createRoute(queryParams);
      const $store = createStore();

      const wrapper = shallowMount(JobListings, createConfig($route, $store));
      const previousPage = wrapper.find("[data-test='previous-page-link']");
      expect(previousPage.exists()).toBe(false);
    });

    it("show link to next page", async () => {
      const $store = createStore({
        getters: {
          FILTERED_JOBS: Array(15).fill({}),
        },
      });
      const queryParams = { page: "1" };
      const $route = createRoute(queryParams);

      const wrapper = shallowMount(JobListings, createConfig($route, $store));
      await flushPromises();
      const nextPage = wrapper.find("[data-test='next-page-link']");
      expect(nextPage.exists()).toBe(true);
    });
  });

  describe("when user is on last page of job results", () => {
    it("doesnt show link to next page", async () => {
      const $store = createStore();
      const queryParams = { page: "2" };
      const $route = createRoute(queryParams);

      const wrapper = shallowMount(JobListings, createConfig($route, $store));
      await flushPromises();
      const nextPage = wrapper.find("[data-test='next-page-link']");
      expect(nextPage.exists()).toBe(false);
    });

    it("shows link to previous page", async () => {
      const $store = createStore();
      const queryParams = { page: "2" };
      const $route = createRoute(queryParams);

      const wrapper = shallowMount(JobListings, createConfig($route, $store));
      await flushPromises();
      const previousPage = wrapper.find("[data-test='previous-page-link']");
      expect(previousPage.exists()).toBe(true);
    });
  });
});

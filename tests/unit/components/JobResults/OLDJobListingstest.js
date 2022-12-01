import { flushPromises, shallowMount, RouterLinkStub } from "@vue/test-utils";
// import axios from "axios";
// jest.mock("axios"); //this makes a mock of axios so we can "fetch" fake data

import JobListings from "@/components/JobResults/JobListings.vue";

describe("JobListings", () => {
  // beforeEach(() => { //this is commented with import and mocking of axios because
  // //we are not using axios anymore because the jobs are getting filled from vuex
  //   axios.get.mockReturnValue({ data: Array(15).fill({}) });
  // });
  // afterEach(() => {
  //   axios.get.mockReset();
  //   // this cleans the custom implementation after EVERY it finishes running
  // });
  // THIS BEFORE AND AFTER EACH - MAKES THE IMPLEMENTATION START AND END EVERY SINGLE IT TEST

  const createRoute = (queryParams = {}) => ({
    query: {
      page: "5",
      ...queryParams,
    },
  }); //this fn is created so if nothing is passed it gives an empty Object
  // but if you pass a param different than 5 it gets added to the query

  const createStore = (config = {}) => ({
    // state: {
    //   jobs: Array(15).fill({}), // in video 357 - we changed the mapState to a mapGetter so this is useless now
    // },
    getters: {
      // from video 359 onwards we use a getter
      FILTERED_JOBS_BY_ORGANIZATIONS: [],
    },
    dispatch: jest.fn(),
    ...config, //with this factory fn, I can pass params such as state or dispatch however I want
  });

  const createConfig = ($route, $store) => ({
    global: {
      mocks: {
        $route,
        $store,
      },
      stubs: {
        routerLink: RouterLinkStub, // "router-link" also works
      },
    },
  }); //this fn is created to be used inside the shallowMount and then pass the
  // $route as needed, it's a MUST to put a $route as a param
  describe("when the component mounts", () => {
    it("makes call to fetch jobs from API", () => {
      const $route = createRoute();
      const dispatch = jest.fn();
      const $store = createStore({ dispatch });
      shallowMount(JobListings, createConfig($route, $store));
      expect(dispatch).toHaveBeenCalledWith("FETCH_JOBS");
    });
  });
  // it("it fetches jobs", () => {
  // //THIS TEST WAS COMMENTED OUT BECAUSE WE ARE NOT FETCHING ANYMORE FROM JOBLISTINGS
  //   //axios.get.mockReturnValue({ data: [] });
  //   // //the line up is not necesary because you dont care if the mockValue is [] or 15 like in the beforeEach at the start of the test
  //   // since axios is async, this makes the promise deliver an empty array
  //   // const $route = {
  //   //   query: {
  //   //     page: "5",
  //   //   },
  //   // };
  //   const pageSixroute = createRoute({ page: "6" });
  //   shallowMount(
  //     JobListings,
  //     createConfig(pageSixroute)
  //     // {
  //     //   global: {
  //     //     mocks: {
  //     //       $route,
  //     //     },
  //     //   },
  //     // }
  //   ); // we mount it
  //   expect(axios.get).toHaveBeenCalledWith("http://myfakeapi.com/jobs");
  //   expect(axios.get).toHaveBeenCalledTimes(1); //this has to be called only once
  //   //and then we check that it's called with that url inside
  // });

  // WARNING: mockReturnValue makes that all other tests already have the data full with info
  // in this caes the mounted () {axios.get} that fetches the info => check afterEach to see
  // the cleanup

  it("creates a jobListing for a max of 10 jobs", async () => {
    //axios.get.mockReturnValue({ data: Array(15).fill({}) });
    //here we are doing exactly the same, but data is an array with 15 elements
    // filled with empty objects

    // const $route = { //we changed this $route variable to be pageOneRoute down
    //   query: {
    //     page: "1",
    //   },
    // };
    const pageOneRoute = createRoute({ page: "1" }); //this MUST be 1
    const config = {
      // state: {
      //   //this is deprecated we use a getter now - check other tests
      //   jobs: Array(13).fill({}),
      // },
      getters: {
        FILTERED_JOBS_BY_ORGANIZATIONS: Array(10).fill({}),
      },
    };
    const $store = createStore(config); //we replace the old $store with this function -- see next example
    const wrapper = shallowMount(
      JobListings,
      createConfig(pageOneRoute, $store)
      //   { //we change this global mock to be the createConfig($route)
      //   global: {
      //     mocks: {
      //       $route,
      //     },
      //   },
      // }
    );
    await flushPromises(); //this makes instantly to finish the promise
    const jobListings = wrapper.findAll("[data-test='job-listing']");
    expect(jobListings).toHaveLength(10);
  });

  //we use describe when we need to add more context to what should happen
  describe("when query params exclude page number", () => {
    it("displays page number 1", () => {
      // const $store = { // this is deprecated we use createStore() factory method now
      //   //always remember that store is the father component and state is the first children
      //   state: {
      //     jobs: Array(15).fill({}),
      //   },
      //   dispatch: jest.fn(),
      // };

      const $store = createStore();
      const queryParams = { page: undefined };
      const $route = createRoute(queryParams);
      const wrapper = shallowMount(JobListings, createConfig($route, $store));
      expect(wrapper.text()).toMatch("Page 1");
    });
  });

  describe("when query params include page number", () => {
    it("displays page number", () => {
      // const $store = { //this is deprecated we use createStore() factory method now
      //   //always remember that store is the father component and state is the first children
      //   state: {
      //     jobs: Array(15).fill({}),
      //   },
      //   dispatch: jest.fn(),
      // };

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

    //REMEMBER IF IT DOESNT WORK IT PROBABLY NEEDS TO FLUSH PROMISES TO POPULATE ARRAY
    it("show link to next page", async () => {
      const $store = createStore({
        getters: {
          FILTERED_JOBS_BY_ORGANIZATIONS: Array(15).fill({}),
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
      //axios.get.mockReturnValue({ data: Array(15).fill({}) }); //scenario with lasts 15 jobs
      // was commented because we dont need it anymore since it's not fetching from JobListings

      // const $store = {
      //   //this is deprecated, we use a createStore() factory method
      //   state: {
      //     //always remember that store is the father component and state is the first children
      //     jobs: Array(15).fill({}),
      //   },
      //   dispatch: jest.fn(),
      // };
      const $store = createStore();
      const queryParams = { page: "2" };
      const $route = createRoute(queryParams);

      const wrapper = shallowMount(JobListings, createConfig($route, $store));
      await flushPromises(); //make sure everything is populated
      const nextPage = wrapper.find("[data-test='next-page-link']");
      expect(nextPage.exists()).toBe(false);
    });

    it("shows link to previous page", async () => {
      //axios.get.mockReturnValue({ data: Array(15).fill({}) }); //scenario with lasts 15 jobs
      const $store = createStore();
      const queryParams = { page: "2" };
      const $route = createRoute(queryParams);

      const wrapper = shallowMount(JobListings, createConfig($route, $store));
      await flushPromises(); //make sure everything is populated
      const previousPage = wrapper.find("[data-test='previous-page-link']");
      expect(previousPage.exists()).toBe(true);
    });
  });
});

//if for example in a test you need an api call to finish or sth
// asyncronous to finish to actually test it, then you need to use
// flushPromises() after you mount your component to finish all info that
// the component needs to be rendered

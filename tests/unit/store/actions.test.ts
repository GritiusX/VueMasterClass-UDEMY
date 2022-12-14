import actions from "@/store/actions";

import getJobs from "@/api/getJobs";
jest.mock("@/api/getJobs"); //jest goes to that url, and mocks the fn getJobs
const getJobsMock = getJobs as jest.Mock; //typescript doesnt understand line 4, so we need to do this so it takes it as a mock // line 4 is irrelevant

import getDegrees from "@/api/getDegrees";
jest.mock("@/api/getDegrees");
const getDegreesMock = getDegrees as jest.Mock;

describe("actions", () => {
  describe("FETCH_JOBS", () => {
    beforeEach(() => {
      getJobsMock.mockResolvedValue([
        {
          id: 1,
          title: "Software Developer",
        },
      ]);
      //mockResolvedValue() is used to invent data for a jest fn
    });
    it("makes a request to fetch jobs", async () => {
      const context = { commit: jest.fn() };
      await actions.FETCH_JOBS(context);
      // this is await because store actions are asynchronous (check store)
      // also, actions require a context to work, we can mock one as an {}
      // with the proper commit function to make this action work as in the real
      expect(getJobs).toHaveBeenCalled();
    });

    it("sends message to save received jobs in store", async () => {
      const commit = jest.fn(); //mocking the store commit fn
      const context = { commit }; //make context an empty {} with the commit method
      await actions.FETCH_JOBS(context);
      expect(commit).toHaveBeenCalledWith("RECEIVE_JOBS", [
        {
          id: 1,
          title: "Software Developer",
        },
      ]);
    });
  });

  describe("FETCH_DEGREES", () => {
    beforeEach(() => {
      getDegreesMock.mockResolvedValue([
        {
          id: 1,
          degree: "Bachelors",
        },
      ]);
      //mockResolvedValue() is used to invent data for a jest fn
    });
    it("makes a request to fetch degrees", async () => {
      const context = { commit: jest.fn() };
      await actions.FETCH_DEGREES(context);
      // this is await because store actions are asynchronous (check store)
      // also, actions require a context to work, we can mock one as an {}
      // with the proper commit function to make this action work as in the real
      expect(getDegrees).toHaveBeenCalled();
    });

    it("sends message to save received degrees in store", async () => {
      const commit = jest.fn(); //mocking the store commit fn
      const context = { commit }; //make context an empty {} with the commit method
      await actions.FETCH_DEGREES(context);
      //this expect is for the mutation, we expect that the COMMIT is on the mutation
      expect(commit).toHaveBeenCalledWith("RECEIVE_DEGREES", [
        {
          id: 1,
          degree: "Bachelors",
        },
      ]);
    });
  });

});

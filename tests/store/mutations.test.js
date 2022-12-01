import mutations from "@/store/mutations";

describe("mutations", () => {
  describe("LOGIN_USER", () => {
    it("logs the user in", () => {
      const state = { isLoggedIn: false };
      mutations.LOGIN_USER(state); //here we make the state change from F to T
      expect(state).toEqual({ isLoggedIn: true });
    });

    describe("RECEIVE_JOBS", () => {
      it("receives jjobs from API response", () => {
        const state = { jobs: [] };
        mutations.RECEIVE_JOBS(state, ["Job 1", "Job 2"]);
        expect(state).toEqual({ jobs: ["Job 1", "Job 2"] });
      });
    });

    describe("ADD_SELECTED_ORGANIZATIONS", () => {
      it("update organizations that the user has chosen to filter jobs by", () => {
        const state = { selectedOrganizations: [] };
        mutations.ADD_SELECTED_ORGANIZATIONS(state, [
          "Organization 1",
          "Organization 2",
        ]);
        expect(state).toEqual({
          selectedOrganizations: ["Organization 1", "Organization 2"],
        });
      });
    });

    describe("ADD_SELECTED_JOB_TYPES", () => {
      it("update job types that the user would like to filter jobs by", () => {
        const state = { selectedJobTypes: [] };
        mutations.ADD_SELECTED_JOB_TYPES(state, ["Full-time", "Part-time"]);
        expect(state).toEqual({
          selectedJobTypes: ["Full-time", "Part-time"],
        });
      });
    });
  });
});
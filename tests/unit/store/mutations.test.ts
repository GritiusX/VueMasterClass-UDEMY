import { createState, createJob, createDegree } from "./utils";
// import state from "@/store/state";
// import { GlobalState } from "@/store/types";
// import { Job } from "@/api/types";
import mutations from "@/store/mutations";

describe("mutations", () => {
  describe("LOGIN_USER", () => {
    it("logs the user in", () => {
      const startingState = createState({ isLoggedIn: false });
      mutations.LOGIN_USER(startingState);
      expect(startingState.isLoggedIn).toBe(true);
    });

    describe("RECEIVE_JOBS", () => {
      it("receives jobs from API response", () => {
        const startingState = createState({ jobs: [] });
        const jobOne = createJob();
        const jobTwo = createJob();
        mutations.RECEIVE_JOBS(startingState, [jobOne, jobTwo]);
        expect(startingState.jobs).toEqual([jobOne, jobTwo]);
      });
    });

    describe("RECEIVE_DEGREES", () => {
      it("receives degrees from API response", () => {
        const startingState = createState({ degrees: [] });
        const degree = createDegree();
        mutations.RECEIVE_DEGREES(startingState, [degree]);
        expect(startingState.degrees).toEqual([degree]);
      });
    });

    describe("ADD_SELECTED_ORGANIZATIONS", () => {
      it("update organizations that the user has chosen to filter jobs by", () => {
        const startingState = createState({ selectedOrganizations: [] });
        mutations.ADD_SELECTED_ORGANIZATIONS(startingState, [
          "Organization 1",
          "Organization 2",
        ]);
        expect(startingState.selectedOrganizations).toEqual([
          "Organization 1",
          "Organization 2",
        ]);
      });
    });

    describe("ADD_SELECTED_JOB_TYPES", () => {
      it("update job types that the user would like to filter jobs by", () => {
        const startingState = createState({ selectedJobTypes: [] });
        mutations.ADD_SELECTED_JOB_TYPES(startingState, [
          "Full-time",
          "Part-time",
        ]);
        expect(startingState.selectedJobTypes).toEqual([
          "Full-time",
          "Part-time",
        ]);
      });
    });
  });
});
// describe("mutations", () => {
//   // === THIS IS MOCKED BECAUSE WE CREATED UTILS.TS AND WE IMPORT THEM FROM THERE TO USE IT
//   // // we create a "mocked" state, that takes as param a Partial GlobalState, which means that we can use as param an object
//   // // that has as many properties as we want because all of them are optional to overwrite the initialState in the return
//   // const createState = (config: Partial<GlobalState> = {}): GlobalState => {
//   //   const initialState = state();
//   //   return { ...initialState, ...config };
//   // };

//   // const createJob = (config: Partial<Job> = {}): Job => ({
//   //   id: 1,
//   //   title: "Angular Developer",
//   //   organization: "Vue and Me",
//   //   degree: "Master's",
//   //   jobType: "Intern",
//   //   locations: ["Lisbon"],
//   //   minimumQualifications: [],
//   //   preferredQualifications: [],
//   //   description: [],
//   //   dateAdded: "2021-07-04",
//   //   ...config, //this is done so if you just want to have an empty object you overwright everything
//   // });

//   describe("LOGIN_USER", () => {
//     it("logs the user in", () => {
//       //const startingState = state();
//       const startingState = createState({ isLoggedIn: false });
//       mutations.LOGIN_USER(startingState);
//       expect(startingState.isLoggedIn).toBe(true);
//     });

//     describe("RECEIVE_JOBS", () => {
//       it("receives jjobs from API response", () => {
//         //const startingState = state();
//         const startingState = createState({ jobs: [] });
//         const jobOne = createJob();
//         const jobTwo = createJob();
//         mutations.RECEIVE_JOBS(startingState, [jobOne, jobTwo]);
//         expect(startingState.jobs).toEqual([jobOne, jobTwo]);
//       });
//     });

//     describe("ADD_SELECTED_ORGANIZATIONS", () => {
//       it("update organizations that the user has chosen to filter jobs by", () => {
//         //const state = { selectedOrganizations: [] };
//         const startingState = createState({ selectedOrganizations: [] })
//         mutations.ADD_SELECTED_ORGANIZATIONS(startingState, [
//           "Organization 1",
//           "Organization 2",
//         ]);
//         expect(startingState.selectedOrganizations).toEqual([
//           "Organization 1",
//           "Organization 2",
//         ]);
//       });
//     });

//     describe("ADD_SELECTED_JOB_TYPES", () => {
//       it("update job types that the user would like to filter jobs by", () => {
//         //const state = { selectedJobTypes: [] };
//         const startingState = createState({ selectedJobTypes: [] });
//         mutations.ADD_SELECTED_JOB_TYPES(startingState, [
//           "Full-time",
//           "Part-time",
//         ]);
//         expect(startingState.selectedJobTypes).toEqual([
//           "Full-time",
//           "Part-time",
//         ]);
//       });
//     });
//   });
// });
// OLD TESTS === UPDATED TO VIDEO 652 ON TYPESCRIPT
// describe("mutations", () => {
//   describe("LOGIN_USER", () => {
//     it("logs the user in", () => {
//       //const state = { isLoggedIn: false } as GlobalState; //solution1: //treat this object as if it were a complete GlobalState object
//       // expect(state).toEqual({ isLoggedIn: true });
//       const startingState = state(); //this funct returns a complete object with all properties
//       mutations.LOGIN_USER(startingState); //here we make the state change from F to T
//       expect(startingState.isLoggedIn).toEqual(true); // we only check the property isLoggedIn
//     });

//     describe("RECEIVE_JOBS", () => {
//       it("receives jjobs from API response", () => {
//         // const state = { jobs: [] };
//         const startingState = state();
//         // mutations.RECEIVE_JOBS(state, ["Job 1", "Job 2"]);
//         mutations.RECEIVE_JOBS(startingState, ["Job 1", "Job 2"]);
//         // expect(state).toEqual({ jobs: ["Job 1", "Job 2"] });
//         expect(state).toEqual({ jobs: ["Job 1", "Job 2"] });
//       });
//     });

//     describe("ADD_SELECTED_ORGANIZATIONS", () => {
//       it("update organizations that the user has chosen to filter jobs by", () => {
//         const state = { selectedOrganizations: [] };
//         mutations.ADD_SELECTED_ORGANIZATIONS(state, [
//           "Organization 1",
//           "Organization 2",
//         ]);
//         expect(state).toEqual({
//           selectedOrganizations: ["Organization 1", "Organization 2"],
//         });
//       });
//     });

//     describe("ADD_SELECTED_JOB_TYPES", () => {
//       it("update job types that the user would like to filter jobs by", () => {
//         const state = { selectedJobTypes: [] };
//         mutations.ADD_SELECTED_JOB_TYPES(state, ["Full-time", "Part-time"]);
//         expect(state).toEqual({
//           selectedJobTypes: ["Full-time", "Part-time"],
//         });
//       });
//     });
//   });
// });

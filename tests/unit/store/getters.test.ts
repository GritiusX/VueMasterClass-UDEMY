import { createJob, createState } from "./utils";
import getters from "@/store/getters";

describe("getters", () => {
  describe("UNIQUE_ORGANIZATIONS", () => {
    it("finds unique organizations from list of jobs", () => {
      const jobs = [
        createJob({ organization: "Google" }),
        createJob({ organization: "Amazon" }),
        createJob({ organization: "Google" }),
      ];
      // const state = {
      //   jobs: [
      //     { organization: "Google" },
      //     { organization: "Google" },
      //     { organization: "Amazon" },
      //   ],
      // };
      const state = createState({ jobs });
      const result = getters.UNIQUE_ORGANIZATIONS(state);
      expect(result).toEqual(new Set(["Google", "Amazon"]));
    });
  });

  describe("UNIQUE_JOB_TYPES", () => {
    it("finds unique job types from list of jobs", () => {
      const jobs = [
        createJob({ jobType: "Full-time" }),
        createJob({ jobType: "Part-time" }),
        createJob({ jobType: "Full-time" }),
      ];
      const state = createState({ jobs });
      const result = getters.UNIQUE_JOB_TYPES(state);
      expect(result).toEqual(new Set(["Full-time", "Part-time"]));
    });
  });

  describe("INCLUDE_JOB_BY_ORGANIZATION", () => {
    describe("when user has not selected any organizations", () => {
      it("includes job", () => {
        const state = createState({
          selectedOrganizations: [],
        });
        const job = createJob({ organization: "Google" });
        const includeJob = getters.INCLUDE_JOB_BY_ORGANIZATION(state)(job);
        expect(includeJob).toBe(true);
      });
    });
    it("identifies if job is associated with given organization", () => {
      const state = createState({
        selectedOrganizations: ["Google", "Microsoft"],
      });
      const job = createJob({ organization: "Google" });
      const includeJob = getters.INCLUDE_JOB_BY_ORGANIZATION(state)(job);
      expect(includeJob).toBe(true);
    });
  });

  describe("INCLUDE_JOB_BY_JOB_TYPE", () => {
    describe("when user has not selected any job types", () => {
      it("includes job", () => {
        const state = createState({
          selectedJobTypes: [],
        });
        const job = createJob({ jobType: "Full-time" });
        const includeJob = getters.INCLUDE_JOB_BY_JOB_TYPE(state)(job);
        expect(includeJob).toBe(true);
      });
    });
    it("identifies if job is associated with given job type", () => {
      const state = createState({
        selectedJobTypes: ["Full-time", "Part-time"],
      });
      const job = createJob({ jobType: "Full-time" });
      const includeJob = getters.INCLUDE_JOB_BY_JOB_TYPE(state)(job);
      expect(includeJob).toBe(true);
    });
  });

  describe("FILTERED_JOBS", () => {
    it("filters jobs by organization and job types", () => {
      const INCLUDE_JOB_BY_ORGANIZATION = jest.fn().mockReturnValue(true);
      const INCLUDE_JOB_BY_JOB_TYPE = jest.fn().mockReturnValue(true);
      const mockGetters = {
        INCLUDE_JOB_BY_ORGANIZATION,
        INCLUDE_JOB_BY_JOB_TYPE,
      };
      const job = createJob({
        title: "Best job ever",
      });
      const state = createState({
        jobs: [job],
      });
      const result = getters.FILTERED_JOBS(state, mockGetters);
      expect(result).toEqual([job]);
      expect(INCLUDE_JOB_BY_ORGANIZATION).toHaveBeenLastCalledWith(job);
      expect(INCLUDE_JOB_BY_JOB_TYPE).toHaveBeenLastCalledWith(job);
    });
  });
});

// ========================= OLD TESTS CHANGED FROM JAVASCRIPT IN VIDEO 657

// describe("getters", () => {
//   describe("UNIQUE_ORGANIZATIONS", () => {
//     it("finds unique organizations from list of jobs", () => {
//       const state = {
//         jobs: [
//           { organization: "Google" },
//           { organization: "Google" },
//           { organization: "Amazon" },
//         ],
//       };
//       const result = getters.UNIQUE_ORGANIZATIONS(state);
//       expect(result).toEqual(new Set(["Google", "Amazon"]));
//     });
//   });

//   // describe("FILTERED_JOBS_BY_ORGANIZATIONS", () => {  // THIS GETTER DOESNT EXIST ANYMORE, IT'S BEEN "DELETED"
//   //   it("identifies jobs that are associated with the given organizations", () => {
//   //     const state = {
//   //       jobs: [
//   //         //this are the available job.organizations
//   //         { organization: "Google" },
//   //         { organization: "Microsoft" },
//   //         { organization: "Amazon" },
//   //       ],
//   //       selectedOrganizations: ["Google", "Microsoft"], //the user clicked on this
//   //     };
//   //     const filteredJobs = getters.FILTERED_JOBS_BY_ORGANIZATIONS(state); //we call this method to get things filtered
//   //     expect(filteredJobs).toEqual([
//   //       //we expect this to happen
//   //       { organization: "Google" },
//   //       { organization: "Microsoft" },
//   //     ]);
//   //   });

//   //   describe("when the user has not selected any organizations", () => {
//   //     it("should return all jobs", () => {
//   //       const state = {
//   //         jobs: [
//   //           //this are the available job.organizations
//   //           { organization: "Google" },
//   //           { organization: "Microsoft" },
//   //           { organization: "Amazon" },
//   //         ],
//   //         selectedOrganizations: [], //the user clicked on this
//   //       };
//   //       const filteredJobs = getters.FILTERED_JOBS_BY_ORGANIZATIONS(state); //we call this method to get things filtered
//   //       expect(filteredJobs).toEqual([
//   //         //we expect this to happen
//   //         { organization: "Google" },
//   //         { organization: "Microsoft" },
//   //         { organization: "Amazon" },
//   //       ]);
//   //     });
//   //   });
//   // });

//   describe("UNIQUE_JOB_TYPES", () => {
//     it("finds unique job types from list of jobs", () => {
//       const state = {
//         jobs: [
//           { jobType: "Full-time" },
//           { jobType: "Part-time" },
//           { jobType: "Full-time" },
//         ],
//       };
//       const result = getters.UNIQUE_JOB_TYPES(state);
//       expect(result).toEqual(new Set(["Full-time", "Part-time"]));
//     });
//   });

//   // describe("FILTERED_JOBS_BY_JOB_TYPES", () => { // THIS GETTER DOESNT EXIST ANYMORE, IT'S BEEN "DELETED"
//   //   it("identifies jobs that are associated with the given job types", () => {
//   //     const state = {
//   //       jobs: [
//   //         //this are the available job.jobTypes
//   //         { jobType: "Full-time" },
//   //         { jobType: "Temporary" },
//   //         { jobType: "Part-time" },
//   //       ],
//   //       selectedJobTypes: ["Full-time", "Temporary"], //the user clicked on this
//   //     };
//   //     const filteredJobs = getters.FILTERED_JOBS_BY_JOB_TYPES(state); //we call this method to get things filtered
//   //     expect(filteredJobs).toEqual([
//   //       //we expect this to happen
//   //       { jobType: "Full-time" },
//   //       { jobType: "Temporary" },
//   //     ]);
//   //   });

//   //   describe("when the user has not selected any job types", () => {
//   //     it("should return all jobs", () => {
//   //       const state = {
//   //         jobs: [
//   //           //this are the available job.jobTypes
//   //           { jobType: "Full-time" },
//   //           { jobType: "Temporary" },
//   //           { jobType: "Part-time" },
//   //         ],
//   //         selectedJobTypes: [], //the user clicked on this
//   //       };
//   //       const filteredJobs = getters.FILTERED_JOBS_BY_JOB_TYPES(state); //we call this method to get things filtered
//   //       expect(filteredJobs).toEqual([
//   //         //we expect this to happen
//   //         { jobType: "Full-time" },
//   //         { jobType: "Temporary" },
//   //         { jobType: "Part-time" },
//   //       ]);
//   //     });
//   //   });
//   // });

//   describe("INCLUDE_JOB_BY_ORGANIZATION", () => {
//     describe("when user has not selected any organizations", () => {
//       it("includes job", () => {
//         const state = {
//           selectedOrganizations: [],
//         };
//         const job = { organization: "Google" };
//         const includeJob = getters.INCLUDE_JOB_BY_ORGANIZATION(state)(job);
//         expect(includeJob).toBe(true);
//       });
//     });
//     it("identifies if job is associated with given organization", () => {
//       const state = {
//         selectedOrganizations: ["Google", "Microsoft"],
//       };
//       const job = { organization: "Google" };
//       const includeJob = getters.INCLUDE_JOB_BY_ORGANIZATION(state)(job);
//       expect(includeJob).toBe(true);
//     });
//   });

//   describe("INCLUDE_JOB_BY_JOB_TYPE", () => {
//     describe("when user has not selected any job types", () => {
//       it("includes job", () => {
//         const state = {
//           selectedJobTypes: [],
//         };
//         const job = { jobType: "Full-time" };
//         const includeJob = getters.INCLUDE_JOB_BY_JOB_TYPE(state)(job);
//         expect(includeJob).toBe(true);
//       });
//     });
//     it("identifies if job is associated with given job type", () => {
//       const state = {
//         selectedJobTypes: ["Full-time", "Part-time"],
//       };
//       const job = { jobType: "Full-time" };
//       const includeJob = getters.INCLUDE_JOB_BY_JOB_TYPE(state)(job);
//       expect(includeJob).toBe(true);
//     });
//   });

//   describe("FILTERED_JOBS", () => {
//     //this test needs that both of it's inside functions called return true, so we mock them
//     it("filters jobs by organization and job types", () => {
//       const INCLUDE_JOB_BY_ORGANIZATION = jest.fn().mockReturnValue(true);
//       const INCLUDE_JOB_BY_JOB_TYPE = jest.fn().mockReturnValue(true); //mockReturnValue is for synchronous results //mockResolveValue is for async
//       const mockGetters = {
//         INCLUDE_JOB_BY_ORGANIZATION,
//         INCLUDE_JOB_BY_JOB_TYPE,
//       };
//       const job = {
//         id: 1,
//         title: "Best job ever",
//       };
//       const state = {
//         jobs: [job],
//       };
//       const result = getters.FILTERED_JOBS(state, mockGetters);
//       expect(result).toEqual([job]);
//       expect(INCLUDE_JOB_BY_ORGANIZATION).toHaveBeenLastCalledWith(job);
//       expect(INCLUDE_JOB_BY_JOB_TYPE).toHaveBeenLastCalledWith(job);
//     });
//   });
// });

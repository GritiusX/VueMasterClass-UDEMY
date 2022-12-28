import { Job } from "@/api/types";
import { GlobalState } from "@/store/types";
import {
  UNIQUE_ORGANIZATIONS,
  UNIQUE_JOB_TYPES,
  UNIQUE_DEGREES,
  FILTERED_JOBS,
  INCLUDE_JOB_BY_ORGANIZATION,
  INCLUDE_JOB_BY_JOB_TYPE,
  INCLUDE_JOB_BY_DEGREE,
  INCLUDE_JOB_BY_SKILL,
} from "@/store/constants";

interface IncludeJobGetters {
  INCLUDE_JOB_BY_ORGANIZATION: (job: Job) => boolean;
  INCLUDE_JOB_BY_JOB_TYPE: (job: Job) => boolean;
  INCLUDE_JOB_BY_DEGREE: (job: Job) => boolean;
  INCLUDE_JOB_BY_SKILL: (job: Job) => boolean;
}

const getters = {
  [UNIQUE_ORGANIZATIONS](state: GlobalState) {
    const uniqueOrganizations = new Set<string>(); // we made this set to be a Generic String Set, so the return value is a String Set as needed in the whole app
    state.jobs.forEach((job) => uniqueOrganizations.add(job.organization));
    return uniqueOrganizations;
  },
  [UNIQUE_JOB_TYPES](state: GlobalState) {
    const uniqueJobTypes = new Set<string>(); // we made this set to be a Generic String Set, so the return value is a String Set as needed in the whole app
    state.jobs.forEach((job) => uniqueJobTypes.add(job.jobType));
    return uniqueJobTypes;
  },
  [UNIQUE_DEGREES](state: GlobalState) {
    return state.degrees.map((degree) => degree.degree);
  },
  [INCLUDE_JOB_BY_ORGANIZATION]: (state: GlobalState) => (job: Job) => {
    //first we invoke that getter and provide de state and that getter returns a
    //new function, and that function accepts the actual argument that we want to pass
    // and in this case the argument we want to pass is the job which is going to be
    //inside the function returned by the getter and all this HAS tu return you a boolean
    if (state.selectedOrganizations.length === 0) return true;
    return state.selectedOrganizations.includes(job.organization);
  },
  [INCLUDE_JOB_BY_JOB_TYPE]: (state: GlobalState) => (job: Job) => {
    if (state.selectedJobTypes.length === 0) return true;
    return state.selectedJobTypes.includes(job.jobType);
  },
  [INCLUDE_JOB_BY_DEGREE]: (state: GlobalState) => (job: Job) => {
    if (state.selectedDegrees.length === 0) return true;
    return state.selectedDegrees.includes(job.degree);
  },
  [INCLUDE_JOB_BY_SKILL]: (state: GlobalState) => (job: Job) => {
    return job.title
      .toLocaleLowerCase()
      .includes(state.skillsSearchTerm.toLocaleLowerCase());
  },
  [FILTERED_JOBS](state: GlobalState, getters: IncludeJobGetters) {
    // it accepts the VUEXstore state as the 1st argument and a
    // 2nd OPTIONAL argument is all the existing getters
    return state.jobs
      .filter((job) => getters.INCLUDE_JOB_BY_ORGANIZATION(job))
      .filter((job) => getters.INCLUDE_JOB_BY_JOB_TYPE(job))
      .filter((job) => getters.INCLUDE_JOB_BY_DEGREE(job))
      .filter((job) => getters.INCLUDE_JOB_BY_SKILL(job));
  },
};

export default getters;

// ======  IMPORTANT!!! IMPORTANT!!! IMPORTANT!!! IMPORTANT!!! IMPORTANT!!! IMPORTANT!!! IMPORTANT!!! IMPORTANT!!!
// 1) get the PROPERTY on the state
// 1.1) create a constant for the mutation
// 2) get the MUTATION to modify the PROPERTY (it can ONLY modify 1 property)
// 2.2) get a constant for the action
// 3) make an ACTION (asynchronous) to DO AN API REQUEST
// 4) COMMIT the MUTATION to overwrite the state and POPULATES the property
// 5) have a GETTER talk to that PROPERTY and filter anything you need
// 6) THROUGH A COMPOSABLE send the GETTER on your vue components (EX: useUniqueDegrees)

// OLD JAVASCRIPT CODE:
// const getters = {
//   // getters are like computed() properties, here you cant delete or modify info from the state, but you can get new things that derive from the state

//   [UNIQUE_ORGANIZATIONS](state) {
//     //get organizations from the job objects inside the jobs array and add them to the new Set
//     const uniqueOrganizations = new Set();
//     state.jobs.forEach((job) => uniqueOrganizations.add(job.organization));
//     return uniqueOrganizations;
//   },
//   // [FILTERED_JOBS_BY_ORGANIZATIONS](state) { //DEPRECATED BECAUSE OF THE FILTER_JOBS GETTER THAT HAS 2 CHILDREN GETTERS TO FILTER
//   //   // get the jobs inside of state, then filter each job and check if the
//   //   // state.selectedOrganizations the user clicked includes ANY organization that the jobs have
//   //   if (state.selectedOrganizations.length === 0) {
//   //     return state.jobs;
//   //   } else {
//   //     return state.jobs.filter((job) =>
//   //       state.selectedOrganizations.includes(job.organization)
//   //     );
//   //   }
//   // },
//   [UNIQUE_JOB_TYPES](state) {
//     const uniqueJobTypes = new Set();
//     state.jobs.forEach((job) => uniqueJobTypes.add(job.jobType));
//     return uniqueJobTypes;
//   },
//   // [FILTERED_JOBS_BY_JOB_TYPES](state) { //DEPRECATED BECAUSE OF THE FILTER_JOBS GETTER THAT HAS 2 CHILDREN GETTERS TO FILTER
//   //   if (state.selectedJobTypes.length === 0) {
//   //     return state.jobs;
//   //   }

//   //   return state.jobs.filter((job) =>
//   //     state.selectedJobTypes.includes(job.jobType)
//   //   );
//   // },
//   [INCLUDE_JOB_BY_ORGANIZATION]: (state) => (job) => {
//     if (state.selectedOrganizations.length === 0) return true;
//     return state.selectedOrganizations.includes(job.organization);
//   },
//   [INCLUDE_JOB_BY_JOB_TYPE]: (state) => (job) => {
//     if (state.selectedJobTypes.length === 0) return true;
//     return state.selectedJobTypes.includes(job.jobType);
//   },
//   [FILTERED_JOBS](state, getters) {
//     return state.jobs
//       .filter((job) => getters.INCLUDE_JOB_BY_ORGANIZATION(job)) //this way is written it actually implies the state in the getter that is written on top
//       .filter((job) => getters.INCLUDE_JOB_BY_JOB_TYPE(job));
//   },
// };

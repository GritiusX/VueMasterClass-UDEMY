import {
  UNIQUE_ORGANIZATIONS,
  UNIQUE_JOB_TYPES,
  FILTERED_JOBS,
  INCLUDE_JOB_BY_ORGANIZATION,
  INCLUDE_JOB_BY_JOB_TYPE,
} from "@/store/constants";

const getters = {
  // getters are like computed() properties, here you cant delete or modify info from the state, but you can get new things that derive from the state

  [UNIQUE_ORGANIZATIONS](state) {
    //get organizations from the job objects inside the jobs array and add them to the new Set
    const uniqueOrganizations = new Set();
    state.jobs.forEach((job) => uniqueOrganizations.add(job.organization));
    return uniqueOrganizations;
  },
  // [FILTERED_JOBS_BY_ORGANIZATIONS](state) { //DEPRECATED BECAUSE OF THE FILTER_JOBS GETTER THAT HAS 2 CHILDREN GETTERS TO FILTER
  //   // get the jobs inside of state, then filter each job and check if the
  //   // state.selectedOrganizations the user clicked includes ANY organization that the jobs have
  //   if (state.selectedOrganizations.length === 0) {
  //     return state.jobs;
  //   } else {
  //     return state.jobs.filter((job) =>
  //       state.selectedOrganizations.includes(job.organization)
  //     );
  //   }
  // },
  [UNIQUE_JOB_TYPES](state) {
    const uniqueJobTypes = new Set();
    state.jobs.forEach((job) => uniqueJobTypes.add(job.jobType));
    return uniqueJobTypes;
  },
  // [FILTERED_JOBS_BY_JOB_TYPES](state) { //DEPRECATED BECAUSE OF THE FILTER_JOBS GETTER THAT HAS 2 CHILDREN GETTERS TO FILTER
  //   if (state.selectedJobTypes.length === 0) {
  //     return state.jobs;
  //   }

  //   return state.jobs.filter((job) =>
  //     state.selectedJobTypes.includes(job.jobType)
  //   );
  // },
  [INCLUDE_JOB_BY_ORGANIZATION]: (state) => (job) => {
    if (state.selectedOrganizations.length === 0) return true;
    return state.selectedOrganizations.includes(job.organization);
  },
  [INCLUDE_JOB_BY_JOB_TYPE]: (state) => (job) => {
    if (state.selectedJobTypes.length === 0) return true;
    return state.selectedJobTypes.includes(job.jobType);
  },
  [FILTERED_JOBS](state, getters) {
    return state.jobs
      .filter((job) => getters.INCLUDE_JOB_BY_ORGANIZATION(job)) //this way is written it actually implies the state in the getter that is written on top
      .filter((job) => getters.INCLUDE_JOB_BY_JOB_TYPE(job));
  },
};

export default getters;

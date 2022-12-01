import {
  LOGIN_USER,
  RECEIVE_JOBS,
  ADD_SELECTED_ORGANIZATIONS,
  ADD_SELECTED_JOB_TYPES,
} from "@/store/constants.js";

const mutations = {
  //this is like having a methods in each component, but global
  // first param is ALWAYS the state, then whatever you are going to send to modify
  [LOGIN_USER](state) {
    state.isLoggedIn = !state.isLoggedIn;
  },
  [RECEIVE_JOBS](state, jobsBeingSent) {
    state.jobs = jobsBeingSent;
  },
  [ADD_SELECTED_ORGANIZATIONS](state, organizationsBeingSent) {
    state.selectedOrganizations = organizationsBeingSent;
  },
  [ADD_SELECTED_JOB_TYPES](state, jobTypesBeingSent) {
    state.selectedJobTypes = jobTypesBeingSent;
  },
};

export default mutations;

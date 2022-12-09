import {
  LOGIN_USER,
  RECEIVE_JOBS,
  ADD_SELECTED_ORGANIZATIONS,
  ADD_SELECTED_JOB_TYPES,
} from "@/store/constants";

import { GlobalState } from "@/store/types";
import { Job } from "@/api/types";

const mutations = {
  //this is like having a methods in each component, but global
  // first param is ALWAYS the state, then whatever you are going to send to modify
  [LOGIN_USER](state: GlobalState) {
    state.isLoggedIn = !state.isLoggedIn;
  },
  //by providing a type of GlobalState to all states on the mutations, we also have access to
  //the type and the properties from the state
  [RECEIVE_JOBS](state: GlobalState, jobsBeingSent: Job[]) {
    state.jobs = jobsBeingSent;
  },
  [ADD_SELECTED_ORGANIZATIONS](
    state: GlobalState,
    organizationsBeingSent: string[]
  ) {
    state.selectedOrganizations = organizationsBeingSent;
  },
  [ADD_SELECTED_JOB_TYPES](state: GlobalState, jobTypesBeingSent: string[]) {
    state.selectedJobTypes = jobTypesBeingSent;
  },
};

export default mutations;

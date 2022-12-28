import {
  LOGIN_USER,
  RECEIVE_JOBS,
  ADD_SELECTED_ORGANIZATIONS,
  ADD_SELECTED_JOB_TYPES,
  RECEIVE_DEGREES,
  ADD_SELECTED_DEGREES,
  UPDATE_SKILLS_SEARCH_TERM,
  CLEAR_FILTER_SELECTIONS,
} from "@/store/constants";

import { GlobalState } from "@/store/types";
import { Job, Degree } from "@/api/types";

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
  [RECEIVE_DEGREES](state: GlobalState, degreesBeingSent: Degree[]) {
    state.degrees = degreesBeingSent;
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
  [ADD_SELECTED_DEGREES](state: GlobalState, degreesBeingSent: string[]) {
    state.selectedDegrees = degreesBeingSent;
  },
  [UPDATE_SKILLS_SEARCH_TERM](
    state: GlobalState,
    skillsStringBeingSent: string
  ) {
    state.skillsSearchTerm = skillsStringBeingSent;
  },
  [CLEAR_FILTER_SELECTIONS](state: GlobalState) {
    state.selectedOrganizations = [];
    state.selectedJobTypes = [];
    state.selectedDegrees = [];
    state.skillsSearchTerm = "";
  },
};

export default mutations;

// ======  IMPORTANT!!! IMPORTANT!!! IMPORTANT!!! IMPORTANT!!! IMPORTANT!!! IMPORTANT!!! IMPORTANT!!! IMPORTANT!!!
// 1) get the PROPERTY on the state
// 1.1) create a constant for the mutation
// 2) get the MUTATION to modify the PROPERTY (it can ONLY modify 1 property)
// 2.2) get a constant for the action
// 3) make an ACTION (asynchronous) to DO AN API REQUEST
// 4) COMMIT the MUTATION to overwrite the state and POPULATES the property
// 5) have a GETTER talk to that PROPERTY and filter anything you need
// 6) THROUGH A COMPOSABLE send the GETTER on your vue components (EX: useUniqueDegrees)

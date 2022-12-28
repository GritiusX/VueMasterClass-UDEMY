/* USER */
export const LOGIN_USER = "LOGIN_USER";

/* SKILLS AND QUALIFICATIONS */
export const UPDATE_SKILLS_SEARCH_TERM = "UPDATE_SKILLS_SEARCH_TERM";
export const INCLUDE_JOB_BY_SKILL = "INCLUDE_JOB_BY_SKILL";

/* JOBS */
export const RECEIVE_JOBS = "RECEIVE_JOBS";
export const FETCH_JOBS = "FETCH_JOBS";
export const FILTERED_JOBS = "FILTERED_JOBS";
export const CLEAR_FILTER_SELECTIONS = "CLEAR_FILTER_SELECTIONS";

/* ORGANIZATIONS */
export const UNIQUE_ORGANIZATIONS = "UNIQUE_ORGANIZATIONS";
export const ADD_SELECTED_ORGANIZATIONS = "ADD_SELECTED_ORGANIZATIONS";
// export const FILTERED_JOBS_BY_ORGANIZATIONS = "FILTERED_JOBS_BY_ORGANIZATIONS";
export const INCLUDE_JOB_BY_ORGANIZATION = "INCLUDE_JOB_BY_ORGANIZATION";

/* JOB TYPES */
export const ADD_SELECTED_JOB_TYPES = "ADD_SELECTED_JOB_TYPES";
export const UNIQUE_JOB_TYPES = "UNIQUE_JOB_TYPES";
// export const FILTERED_JOBS_BY_JOB_TYPES = "FILTERED_JOBS_BY_JOB_TYPES";
export const INCLUDE_JOB_BY_JOB_TYPE = "INCLUDE_JOB_BY_JOB_TYPE";

/* DEGREES */
export const RECEIVE_DEGREES = "RECEIVE_DEGREES";
export const FETCH_DEGREES = "FETCH_DEGREES";
export const UNIQUE_DEGREES = "UNIQUE_DEGREES";
export const ADD_SELECTED_DEGREES = "ADD_SELECTED_DEGREES";
export const INCLUDE_JOB_BY_DEGREE = "INCLUDE_JOB_BY_DEGREE";

// ======  IMPORTANT!!! IMPORTANT!!! IMPORTANT!!! IMPORTANT!!! IMPORTANT!!! IMPORTANT!!! IMPORTANT!!! IMPORTANT!!!
// 1) get the PROPERTY on the state
// 1.1) create a constant for the mutation
// 2) get the MUTATION to modify the PROPERTY (it can ONLY modify 1 property)
// 2.2) get a constant for the action
// 3) make an ACTION (asynchronous) to DO AN API REQUEST
// 4) COMMIT the MUTATION to overwrite the state and POPULATES the property
// 5) have a GETTER talk to that PROPERTY and filter anything you need
// 6) THROUGH A COMPOSABLE send the GETTER on your vue components (EX: useUniqueDegrees)

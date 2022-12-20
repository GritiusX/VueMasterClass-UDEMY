import { key } from "@/store";
import { Job } from "@/api/types";
import { computed } from "vue";
import { useStore } from "vuex";
import {
  FILTERED_JOBS,
  UNIQUE_JOB_TYPES,
  UNIQUE_ORGANIZATIONS,
  FETCH_JOBS,
  FETCH_DEGREES,
  UNIQUE_DEGREES,
} from "@/store/constants";

/* GETTERS */
export const useFilteredJobs = () => {
  const store = useStore(key);
  return computed<Job[]>(() => store.getters[FILTERED_JOBS]); // here we only CALL FILTERED_JOBS getter
  //computed properties on TypeScript take a generic, Type, so you can <and put any tipe you want here to specify what will return>

  //this returns a reactive Array of Job Objects
};

export const useUniqueJobTypes = () => {
  const store = useStore(key);
  return computed<Set<string>>(() => store.getters[UNIQUE_JOB_TYPES]);
  //this returns a Set of strings
};

export const useUniqueOrganizations = () => {
  const store = useStore(key);
  return computed<Set<string>>(() => store.getters[UNIQUE_ORGANIZATIONS]);
  //this returns a Set of strings
};

export const useUniqueDegrees = () => {
  const store = useStore(key); //establish a connection to the VUEX store
  return computed<string[]>(() => store.getters[UNIQUE_DEGREES]);
  //any time any dependency changes, the computed will rerun and get back the data
};

/* ACTIONS */
export const useFetchJobsDispatch = () => {
  const store = useStore(key);
  store.dispatch(FETCH_JOBS);
  //here there is no return, thats why when you hover it says void
};

export const useFetchDegreesDispatch = () => {
  const store = useStore(key);
  store.dispatch(FETCH_DEGREES);
};

// ======  IMPORTANT!!! IMPORTANT!!! IMPORTANT!!! IMPORTANT!!! IMPORTANT!!! IMPORTANT!!! IMPORTANT!!! IMPORTANT!!!
// 1) get the PROPERTY on the state
// 1.1) create a constant for the mutation
// 2) get the MUTATION to modify the PROPERTY (it can ONLY modify 1 property)
// 2.2) get a constant for the action
// 3) make an ACTION (asynchronous) to DO AN API REQUEST
// 4) COMMIT the MUTATION to overwrite the state and POPULATES the property
// 5) have a GETTER talk to that PROPERTY and filter anything you need
// 6) THROUGH A COMPOSABLE send the GETTER on your vue components (EX: useUniqueDegrees)

// /* GETTERS */ == DEPRECATED FROM JAVASCRIPT TO TYPESCRIPT
// export const useFilteredJobs = () => {
//   const store = useStore();
//   return computed(() => store.getters[FILTERED_JOBS]); // here we only CALL FILTERED_JOBS getter
// };

// export const useUniqueJobTypes = () => {
//   const store = useStore();
//   return computed(() => store.getters[UNIQUE_JOB_TYPES]);
// };

// export const useUniqueOrganizations = () => {
//   const store = useStore();
//   return computed(() => store.getters[UNIQUE_ORGANIZATIONS]);
// };

// /* ACTIONS */

// export const useFetchJobsDispatch = () => {
//   const store = useStore();
//   store.dispatch(FETCH_JOBS);
// };

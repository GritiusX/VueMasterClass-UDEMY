import { key } from "@/store";
import { Job } from "@/api/types";
import { computed } from "vue";
import { useStore } from "vuex";
import {
  FILTERED_JOBS,
  UNIQUE_JOB_TYPES,
  UNIQUE_ORGANIZATIONS,
  FETCH_JOBS,
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

/* ACTIONS */

export const useFetchJobsDispatch = () => {
  const store = useStore(key);
  store.dispatch(FETCH_JOBS);
  //here there is no return, thats why when you hover it says void
};

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

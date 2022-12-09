import { GlobalState } from "@/store/types";

const state = (): GlobalState => {
  //this is like having a data() in each component, but global

  return {
    isLoggedIn: false,
    jobs: [],
    selectedOrganizations: [],
    selectedJobTypes: [],
  };
};

export default state;

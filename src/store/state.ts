import { GlobalState } from "@/store/types";

const state = (): GlobalState => {
  //this is like having a data() in each component, but global

  return {
    isLoggedIn: false,
    jobs: [],
    degrees: [],
    selectedOrganizations: [],
    selectedJobTypes: [],
  };
};

export default state;
// 1) get the property on the state
// 2) get the mutation to modify the property it can ONLY modify 1 property
// 3)

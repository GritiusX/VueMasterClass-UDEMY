import { Commit } from "vuex";
import getJobs from "@/api/getJobs";
import getDegrees from "@/api/getDegrees";
import {
  FETCH_JOBS,
  RECEIVE_JOBS,
  FETCH_DEGREES,
  RECEIVE_DEGREES,
} from "@/store/constants";

interface Context {
  commit: Commit;
}

const actions = {
  [FETCH_JOBS]: async (context: Context) => {
    const jobListings = await getJobs();
    context.commit(RECEIVE_JOBS, jobListings);
    // this basically is when you COMMIT the store, you: invoke the mutation
    // RECEIVE_JOBS with state already implicit AND add jobListings
    // to the position of jobs in the mutation
  },
  [FETCH_DEGREES]: async (context: Context) => {
    const degrees = await getDegrees(); // we get the array of degrees through the API endpoint
    context.commit(RECEIVE_DEGREES, degrees); // then commmit the RECEIVE_DEGREES mutation to save the array on the VUEX store
    //COMMIT IS FOR THE MUTATION RECEIVE_DEGREES
  },
};

export default actions;

// ======  IMPORTANT!!! IMPORTANT!!! IMPORTANT!!! IMPORTANT!!! IMPORTANT!!! IMPORTANT!!! IMPORTANT!!! IMPORTANT!!!
// 1) get the PROPERTY on the state
// 1.1) create a constant for the mutation
// 2) get the MUTATION to modify the PROPERTY (it can ONLY modify 1 property)
// 2.2) get a constant for the action
// 3) make an ACTION (asynchronous) to DO AN API REQUEST
// 4) COMMIT the MUTATION to overwrite the state and POPULATES the property
// 5) have a GETTER talk to that PROPERTY and filter anything you need
// 6) THROUGH A COMPOSABLE send the GETTER on your vue components (EX: useUniqueDegrees)

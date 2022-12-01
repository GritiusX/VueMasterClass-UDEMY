import getJobs from "@/api/getJobs";
import { FETCH_JOBS, RECEIVE_JOBS } from "@/store/constants";

const actions = {
  [FETCH_JOBS]: async (context) => {
    const jobListings = await getJobs();
    context.commit(RECEIVE_JOBS, jobListings); // this basically is when you COMMIT the store, you: invoke the mutation RECEIVE_JOBS with state already
    //                                         // implicit AND add jobListings to the position of jobs in the mutation
  },
};

export default actions;

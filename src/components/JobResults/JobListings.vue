<template>
  <main class="flex-auto p-8 bg-brand-gray-2">
    <ol>
      <job-listing
        v-for="job in displayedJobs"
        :key="job.id"
        :job="job"
        data-test="job-listing"
      />
    </ol>
    <div class="mt-8 mx-auto">
      <div class="flex flex-row flex-nowrap">
        <p class="text-sm flex-grow">Page {{ currentPage }}</p>
      </div>
      <div class="flex items-center justify-end">
        <router-link
          v-if="previousPage"
          :to="{ name: 'JobResults', query: { page: previousPage } }"
          class="mx-3 text-sm font-semibold text-brand-blue-1"
          data-test="previous-page-link"
          >Previous</router-link
        >
        <router-link
          v-if="nextPage"
          :to="{ name: 'JobResults', query: { page: nextPage } }"
          class="mx-3 text-sm font-semibold text-brand-blue-1"
          data-test="next-page-link"
          >Next</router-link
        >
      </div>
    </div>
  </main>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

import JobListing from "@/components/JobResults/JobListing.vue";
import { FETCH_JOBS, FILTERED_JOBS } from "@/store/constants";

export default {
  name: "JobListings",
  components: { JobListing },
  // data() { //THIS USED TO BE A LOCAL DATA
  //   return {
  //     jobs: [],
  //   };
  // },
  computed: {
    ...mapGetters([FILTERED_JOBS]),
    //same as this.FILTERED_JOBS_BY_JOB_TYPES() //is like a computed method/property and will return the filtered array of jobs
    currentPage() {
      const pageString = this.$route.query.page || "1"; // 1) get the query page, if there isnt asign 1
      return Number.parseInt(pageString); // 2) parse that string to a number
    },
    previousPage() {
      const previousPage = this.currentPage - 1;
      const firstPage = 1;
      return previousPage >= firstPage ? previousPage : undefined;
      //we return undefined for false, because undefined is a falsy result, thus v-if = false
    },
    nextPage() {
      //CHECK UPDATE VIDEO 357 AT THE END OF COMPONENT
      const nextPage = this.currentPage + 1;
      const maxPage = Math.ceil(this.FILTERED_JOBS.length / 10); //Math.ceil = rounds up a float to the next int
      return nextPage <= maxPage ? nextPage : undefined;
    },
    displayedJobs() {
      const pageNumber = this.currentPage; // 1) we get the page NUMBER from the computed fn above
      const firstJobIndex = (pageNumber - 1) * 10; // 2) get the starting index=> if 1, 1-1 =0 * 10 = 0 (here you'll get the first item of the array)
      const lastJobIndex = pageNumber * 10; // 3) same here but for the last item of the array
      //this computed updates everytime I need 10 jobs
      return this.FILTERED_JOBS.slice(firstJobIndex, lastJobIndex); //slice to get from the first INCLUDED to the last EXCLUDED (so 0 to 9 which is ten)
    },
    //...mapState(["jobs"]), //we are referencing jobs array in our VUEX state
    //mapstate allows us to have access to any property in VUEX's state
  },
  async mounted() {
    // I call 100 jobs when the components are mounted, then create a
    // computed fn so I get 10 of those so I dont have to call
    //the api everytime I need more jobs

    //process is an automatic global Object on a node app
    // const baseUrl = process.env.VUE_APP_API_URL; // THIS IS THE OLD WAY TO FETCH
    // const response = await axios.get(`${baseUrl}/jobs`);
    // this.jobs = response.data;
    //this.$store.dispatch(FETCH_JOBS); //we use dispatch for asynchronous methods and commit for mutations (or syncronous methods)
    this.FETCH_JOBS();
  },
  methods: {
    ...mapActions([FETCH_JOBS]), //this is exactly the same as this.$store.dispatch(FETCH_JOBS);
  },
};

//HOW THIS COMPONENT'S SCRIPT WORKS: 1) IT GETS RENDERED SO 2) MOUNTED (LIFECYCLE HOOK) GETS INVOCKED
//3) SO MOUNTED WILL CALL THE STORE AND DISPATCH FETCH_JOBS WHICH WILL MAKE THAT ACTION TO WORK
// 4)FETCH_JOBS (ASYNC) WILL CALL THE FN getJobs WHICH WILL BRING ALL THE JOBS AND ONCE IT RECEIVES THAT
// DATA, NO MATTER HOW LONG IT TAKES WILL COMMIT (SYNC) THE "RECEIVE_JOBS" MUTATION AND PASSING THE NEW ARRAY
// OF DATA TO THE STATE ARRAY CALLED JOBS POPULATING IT WITH INFORMATION, ONCE IT JOBS ARRAY (FROM STATE) IS
// FULL OF DATA, INSIDE DE COMPONENT THE ...mapState(["jobs"]) WIL REALIZE THERE WAS A CHANGE AND WILL UPDATE THE
// COMPONENT WITH THE NEW INFORMATION - AND BECAUSE THE JOBS ARRAY WAS UPDATED, THEN THE COMPUTED FN displayedJobs
// WILL ALSO UPDATE, MAKING RENDER 10 OF THOSE 100 DATA FROM THE "UPDATED JOBS ARRAY"

// ------------ updated to video 357 -------

// we erased the mapstate(["jobs"]) because we are refactoring this component to use the getter FILTERED_JOBS_BY_ORGANIZATIONS instead
// so we can get the jobs filtered by organizations and still show as many jobs as we can from this selection, so all the other methods
// that have been using this.jobs will be changed/refactored to this.FILTERED_JOBS_BY_ORGANIZATIONS
</script>

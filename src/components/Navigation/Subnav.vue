<template>
  <div class="w-full h-16 bg-white border-b border-solid border-brand-gray-1">
    <div class="flex items-center h-full px-8">
      <div v-if="onJobsResultsPage" data-test="job-count">
        <font-awesome-icon :icon="['fas', 'search']" class="mr-3" />
        <span>
          <span class="text-brand-green-1">{{ FILTERED_JOBS.length }}</span>
          jobs matched</span
        >
      </div>
    </div>
  </div>
</template>
<script>
//import { computed } from "vue"; // ALSO DEPRECATED BECAUSE OF USEFILTEREDJOBS COMPOSABLE
// import { useRoute } from "vue-router"; // useANYTHING are composables //ALSO DEPRECATED BECAUSE OF COMPOSABLE
//import { useStore } from "vuex"; //COMPOSITION API // ALSO DEPRECATED BECAUSE OF USEFILTEREDJOBS COMPOSABLE
// import { FILTERED_JOBS } from "@/store/constants";
// import { mapGetters } from "vuex"; //OPTIONS API
import useConfirmRoute from "@/composables/useConfirmRoute";
import { useFilteredJobs } from "@/store/composables";

export default {
  name: "Subnav",
  setup() {
    const FILTERED_JOBS = useFilteredJobs();

    //DEPRECATED BECAUSE WE ARE CALLING A NEW COMPOSABLE
    // const store = useStore(); //we call the store
    // const FILTERED_JOBS = computed(() => {
    //   return store.getters.FILTERED_JOBS; //COMPOSITION API WAY TO CALL THE FILTERED_JOBS GETTER TO OBTAIN ALL THE JOBS (this will be used just for the length in HTML)
    // });

    const onJobsResultsPage = useConfirmRoute("JobResults"); //NEW COMPOSABLE FUNCTION
    return { onJobsResultsPage, FILTERED_JOBS };

    // //DEPRECATED WE ARE USING A COMPOSABLE - useConfirmRoute
    // const route = useRoute(); //same as this.$route.name
    // const onJobsResultsPage = computed(() => {
    //   return route.name === "JobResults"; //we check this just for the v-if in the HTML to show the job amount ONLY if we are on JobResults page
    // });
  },

  // //DEPRECATED CODE BECAUSE WE ARE USING COMPOSITION API NOW
  // computed: {
  //   ...mapGetters([FILTERED_JOBS]), // helper that simulates => this.$store.getters.FILTERED_JOBS => it can be called directly to the template html
  //   onJobsResultsPage() {
  //     return this.$route.name === "JobResults";
  //     //we are accessing the global $route and the name property to check if JobResult
  //     // true if it's equal, and false if its not, ==> get a boolean for the v-if
  //   },
  // },
  // data() {
  //   return {
  //     onJobsResultsPage: true,
  //   };
  // },
};
</script>

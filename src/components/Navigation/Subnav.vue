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
import { FILTERED_JOBS } from "@/store/constants";
import { mapGetters } from "vuex";
export default {
  name: "Subnav",
  computed: {
    ...mapGetters([FILTERED_JOBS]), //it can be called directly to the template html
    onJobsResultsPage() {
      return this.$route.name === "JobResults";
      //we are accessing the global $route and the name property to check if JobResult
      // true if it's equal and false if its not, so you get a boolean for the v-if
    },
  },
  // data() {
  //   return {
  //     onJobsResultsPage: true,
  //   };
  // },
};
</script>
<style></style>

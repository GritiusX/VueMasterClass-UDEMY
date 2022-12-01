<template>
  <div class="flex flex-row flex-nowrap w-full">
    <job-filters-sidebar />
    <job-listings />
  </div>
  <!-- <button @click="goToHome">Go to Home Page</button> -->
</template>
<script>
import JobFiltersSidebar from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebar.vue";
import JobListings from "@/components/JobResults/JobListings.vue";

export default {
  name: "JobsResultsView",
  components: { JobFiltersSidebar, JobListings },
  computed: {
    // experiment() {
    //   console.log("route", this.$route);
    //   console.log("router", this.$router);
    //   return "text";
    // },
  },
  methods: {
    // goToHome() {
    //   this.$router.push({
    //     name: "Home", //it can also be: 1) path:"/" or 2) just "/"
    //   });
    // },
  },
};
</script>

<template lang="">
  <li class="mb-7">
    <router-link
      :to="jobPageLink"
      data-test="job-page-link"
      class="block mx-auto bg-white border border-solid border-brand-gray-2 rounded hover:shadow-gray"
    >
      <div class="pt-5 pb-2 mx-8 border-b border-solid border-brand-gray-2">
        <h2 class="mb-2 text-2xl">
          {{ job.title }}
        </h2>
        <div class="flex flex-row align-middle">
          <div class="mr-5">
            <span>{{ job.organization }}</span>
          </div>
          <div>
            <ul>
              <li
                v-for="location in job.locations"
                :key="location"
                class="inline-block mr-2"
              >
                {{ location }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="px-8 py-4">
        <div><h3 class="mt-1 mb-2">Qualifications</h3></div>
        <div>
          <ul class="pl-8 list-disc">
            <li
              v-for="qualification in job.minimumQualifications"
              :key="qualification"
            >
              {{ qualification }}
            </li>
          </ul>
        </div>
        <div class="mt-2 text-center">
          <router-link :to="jobPageLink" class="text-brand-blue-1"
            >Expand</router-link
          >
        </div>
      </div>
    </router-link>
  </li>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from "@vue/runtime-core";
import { Job } from "@/api/types";

export default defineComponent({
  name: "JobListing",
  //here we are getting a job object as a prop, but TypeScript doesnt know that the data that is being recieved has also a Job type (from @/api/types)
  //so in all the functions inside the setup (in this case jobPageLink), when hovered it said that the property "id" is of type any, and it also
  // said that jobs is a generic string or any (Record<string, any>), so what we did is: 1) import PropType 2) use it inside the type of the prop
  // job with the specific type that we need, in this case JOB from @/api/types.ts = in the end it looks like job: Object as PropType<Job>
  // BECAUSE OF PROPTYPE, now inside the function jobPageLink ==> the props.job is a Job Object and props.job.id is a number
  props: {
    job: {
      type: Object as PropType<Job>,
      required: true,
    },
  },
  setup(props) {
    const jobPageLink = computed(() => `/jobs/results/${props.job.id}`);
    return { jobPageLink };
  },
  // computed: { //DEPRECATED BECAUSE OF COMPOSITION API
  //   jobPageLink() {
  //     return `/jobs/results/${this.job.id}`;
  //   },
  // },
});
</script>

<template lang="">
  <div
    class="flex flex-col p-4 bg-white border-r border-solid border-brand-gray-1 w-96"
  >
    <section class="pb-5">
      <div class="flex flex-row justify-between">
        <h3 class="my-4 text-base font-semibold">What do you want to do?</h3>
        <div class="flex items-center text-sm">
          <action-button text="Clear filters" type="secondary" />
        </div>
      </div>
      <div>
        <accordion header="Degree"></accordion>
        <!-- <job-filters-sidebar-job-types />
        <job-filters-sidebar-organizations /> -->
        <job-filters-sidebar-checkbox-group
          header="Job Types"
          :unique-values="UniqueJobTypes"
          :mutation="ADD_SELECTED_JOB_TYPES"
        />
        <job-filters-sidebar-checkbox-group
          header="Organizations"
          :unique-values="UniqueOrganizations"
          :mutation="ADD_SELECTED_ORGANIZATIONS"
        />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ActionButton from "@/components/Shared/ActionButton.vue";
import Accordion from "@/components/Shared/Accordion.vue";
//import JobFiltersSidebarOrganizations from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarOrganizations.vue";
//import JobFiltersSidebarJobTypes from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarJobTypes.vue";
import JobFiltersSidebarCheckboxGroup from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue";
import { useUniqueJobTypes, useUniqueOrganizations } from "@/store/composables";
import {
  ADD_SELECTED_ORGANIZATIONS,
  ADD_SELECTED_JOB_TYPES,
} from "@/store/constants";

export default defineComponent({
  name: "JobFiltersSidebar",
  components: {
    ActionButton,
    Accordion,
    JobFiltersSidebarCheckboxGroup,
  },
  // JobFiltersSidebarOrganizations,
  // JobFiltersSidebarJobTypes,
  setup() {
    const UniqueJobTypes = useUniqueJobTypes(); //we are calling the store to get the unique set of job types (fulltime, parttime, etc)
    const UniqueOrganizations = useUniqueOrganizations(); // we are calling the store to get the unique set of organizations (VueTube, etc)

    return {
      UniqueJobTypes,
      UniqueOrganizations,
      ADD_SELECTED_ORGANIZATIONS, //we only return this constants because the checkboxGroup needs it for its own mutation function
      ADD_SELECTED_JOB_TYPES,
    };
  },
});
</script>

<template lang="">
  <div
    class="flex flex-col p-4 bg-white border-r border-solid border-brand-gray-1 w-96"
  >
    <section class="pb-5">
      <job-filters-sidebar-prompt />
      <!-- <div class="flex flex-row justify-between">
        <h3 class="my-4 text-base font-semibold">What do you want to do?</h3>
        <div class="flex items-center text-sm">
          <action-button
            text="Clear filters"
            type="secondary"
            @click="clearUserJobFilterSelections"
          />
        </div>
      </div> -->
      <accordion header="Skills and Qualifications">
        <job-filters-sidebar-skills />
      </accordion>
      <div>
        <accordion header="Degrees">
          <job-filters-sidebar-degrees />
        </accordion>
        <!-- <job-filters-sidebar-job-types />
        <job-filters-sidebar-organizations /> -->
        <accordion header="Job Types">
          <!-- <job-filters-sidebar-checkbox-group
            :unique-values="UniqueJobTypes"
            :mutation="ADD_SELECTED_JOB_TYPES"
          /> -->
          <job-filters-sidebar-job-types />
        </accordion>
        <accordion header="Organizations">
          <!-- <job-filters-sidebar-checkbox-group
            header="Organizations"
            :unique-values="UniqueOrganizations"
            :mutation="ADD_SELECTED_ORGANIZATIONS"
          /> -->
          <job-filters-sidebar-organizations />
        </accordion>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";

// import ActionButton from "@/components/Shared/ActionButton.vue";
import Accordion from "@/components/Shared/Accordion.vue";
//import JobFiltersSidebarOrganizations from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarOrganizations.vue";
//import JobFiltersSidebarJobTypes from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarJobTypes.vue";
//import JobFiltersSidebarCheckboxGroup from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue";
import JobFiltersSidebarDegrees from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarDegrees.vue";
import JobFiltersSidebarOrganizations from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarOrganizations.vue";
import JobFiltersSidebarJobTypes from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarJobTypes.vue";
import JobFiltersSidebarPrompt from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarPrompt.vue";
import JobFiltersSidebarSkills from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarSkills.vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { key } from "@/store";
import { UPDATE_SKILLS_SEARCH_TERM } from "@/store/constants";
//import { useUniqueOrganizations } from "@/store/composables";

// import {
//   //ADD_SELECTED_ORGANIZATIONS,
//   CLEAR_FILTER_SELECTIONS,
// } from "@/store/constants";
// import { useStore } from "vuex";
// import { key } from "@/store";

export default defineComponent({
  name: "JobFiltersSidebar",
  components: {
    // ActionButton,
    JobFiltersSidebarPrompt,
    Accordion,
    JobFiltersSidebarSkills,
    // JobFiltersSidebarCheckboxGroup,
    JobFiltersSidebarDegrees,
    JobFiltersSidebarOrganizations,
    JobFiltersSidebarJobTypes,
  },
  // JobFiltersSidebarOrganizations,
  // JobFiltersSidebarJobTypes,
  setup() {
    const parseSkillsSearchTerm = () => {
      const route = useRoute(); //invoke the route to get the role from the query params in the URL
      //console.log("route checking", route);
      const role = route.query.role || ""; //we put the role data in a const or we return empty
      const store = useStore(key); // we invoke the Store to update the state through commiting a mutation
      store.commit(UPDATE_SKILLS_SEARCH_TERM, role); // we call the mutation to update the skillsSearchTerm property inside the state
    };

    onMounted(parseSkillsSearchTerm); //this will ALWAYS update the function once it's mounted

    // const store = useStore(key);
    //const UniqueOrganizations = useUniqueOrganizations(); // we are calling the store to get the unique set of organizations (VueTube, etc)

    // const clearUserJobFilterSelections = () => {
    //   store.commit(CLEAR_FILTER_SELECTIONS);
    // };

    return {
      //UniqueOrganizations,
      // clearUserJobFilterSelections,
      //ADD_SELECTED_ORGANIZATIONS, //we only return this constants because the checkboxGroup needs it for its own mutation function
    };
  },
});
</script>

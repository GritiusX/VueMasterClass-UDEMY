<template>
  <job-filters-sidebar-checkbox-group
    :unique-values="UniqueJobTypes"
    :mutation="ADD_SELECTED_JOB_TYPES"
  />
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import JobFiltersSidebarCheckboxGroup from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue";

import { ADD_SELECTED_JOB_TYPES } from "@/store/constants";
import { useUniqueJobTypes } from "@/store/composables";

export default defineComponent({
  name: "JobFiltersSidebarJobTypes",
  components: { JobFiltersSidebarCheckboxGroup },
  setup() {
    const UniqueJobTypes = useUniqueJobTypes();

    return { UniqueJobTypes, ADD_SELECTED_JOB_TYPES };
    //we only import and return ADD_SELECTED_JOB_TYPES because the checkboxGroup needs it for its own mutation function };
  },
});
</script>

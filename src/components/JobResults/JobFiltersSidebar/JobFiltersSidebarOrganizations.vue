<template>
  <job-filters-sidebar-checkbox-group
    header="Organizations"
    :unique-values="UniqueOrganizations"
    :mutation="ADD_SELECTED_ORGANIZATIONS"
  />
</template>

<script lang="ts">
import { useUniqueOrganizations } from "@/store/composables";
import { ADD_SELECTED_ORGANIZATIONS } from "@/store/constants";
import JobFiltersSidebarCheckboxGroup from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "JobFiltersSidebarOrganizations",
  components: { JobFiltersSidebarCheckboxGroup },
  setup() {
    const UniqueOrganizations = useUniqueOrganizations();
    return { ADD_SELECTED_ORGANIZATIONS, UniqueOrganizations };
    //we only import and return ADD_SELECTED_ORGANIZATIONS because the checkboxGroup needs it for its own mutation function };
  },
});
</script>

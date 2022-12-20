<template>
  <job-filters-sidebar-checkbox-group
    :unique-values="UniqueDegrees"
    :mutation="ADD_SELECTED_DEGREES"
  />
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import JobFiltersSidebarCheckboxGroup from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue";
import { useUniqueDegrees } from "@/store/composables";
import { ADD_SELECTED_DEGREES } from "@/store/constants";

export default defineComponent({
  name: "JobFiltersSidebarDegrees",
  components: { JobFiltersSidebarCheckboxGroup },
  setup() {
    const UniqueDegrees = useUniqueDegrees(); // through this composable we are calling the getter UNIQUE_DEGREE to get all the degrees from state
    return { UniqueDegrees, ADD_SELECTED_DEGREES };
  },
});
</script>

<style></style>

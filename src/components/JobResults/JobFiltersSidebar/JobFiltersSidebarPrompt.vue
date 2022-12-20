<template>
  <div class="flex flex-row justify-between">
    <h3 class="my-4 text-base font-semibold">What do you want to do?</h3>
    <div class="flex items-center text-sm">
      <action-button
        text="Clear filters"
        type="secondary"
        data-test="clear-user-job-filters"
        @click="clearUserJobFilterSelections"
      />
    </div>
  </div>
</template>

<script lang="ts">
import ActionButton from "@/components/Shared/ActionButton.vue";
import { key } from "@/store";
import { CLEAR_FILTER_SELECTIONS } from "@/store/constants";
import { defineComponent } from "@vue/runtime-core";
import { useStore } from "vuex";
export default defineComponent({
  name: "JobFiltersSidebarPrompt",
  components: { ActionButton },
  setup() {
    const store = useStore(key);

    const clearUserJobFilterSelections = () => {
      store.commit(CLEAR_FILTER_SELECTIONS);
    };
    return { clearUserJobFilterSelections };
  },
});
</script>
<style lang=""></style>

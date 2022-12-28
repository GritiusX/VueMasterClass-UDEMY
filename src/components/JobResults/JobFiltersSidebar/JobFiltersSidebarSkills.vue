<template>
  <div class="mt-5">
    <!-- v-model: when the data updates on the JS/TS side, that change is inmediately
    reflected on the component template and viceversa: when the user types anything on
    input, that change is reflected in the JS/TS side -->
    <input
      v-model.lazy.trim="skillsSearchTerm"
      class="p-3 h-12 border border-solid border-brand-gray-1 shadow-gray rounded w-full text-base"
      type="text"
      data-test="skills-search-input"
      placeholder="Computed programming, Finance degree"
    />
    <!-- v-model.lazy = debounce => which makes the input take a few seconds after it doesnt
    check any more changes on typings -->
  </div>
</template>
<script lang="ts">
import { useStore } from "vuex";
import { key } from "@/store";
import { computed, defineComponent } from "@vue/runtime-core";
import { UPDATE_SKILLS_SEARCH_TERM } from "@/store/constants";

// we are going to make a binding between the v-model="skillsSearchTerm" and the vuex Store
// to avoid having twice the same info as seen in the JobFiltersSidebarCheckboxGroup
// and also, if the v-model changes, it inmediately will inform the VUEX store and viceversa

export default defineComponent({
  name: "JobFiltersSidebarSkills",
  setup() {
    const store = useStore(key);

    const skillsSearchTerm = computed({
      get() {
        // get() => explain to VUE what we want to get access to => in this case to
        // the skillsSearchTerm from the VUEX STATE - this is FROM the VUEX STATE to the USER
        return store.state.skillsSearchTerm;
      },
      set(valueInputedInVmodel) {
        // set() => explain to VUE what we want to overwrite => we commit the mutation
        // UPDATE_SKILLS_SEARCH_TERM and we pass a value in set that is the one inside
        // the v-model in the input
        return store.commit(UPDATE_SKILLS_SEARCH_TERM, valueInputedInVmodel);
      },
    });

    return { skillsSearchTerm };
  },
});

// IMPORTANT IMPORTANT IMPORTANT IMPORTANT IMPORTANT IMPORTANT
// STEPS:
// 1) the user TYPE sth in the input so
// 2) it SHOOTS THE SET (overwrite) method which will commit a mutation
// 3) the MUTATION overwrites the VALUE of the VUEX STATE property
// 4) this forces the GET method to run and update the OLD value to the NEW one
// 5) this will force the input to actually update the input on the front
</script>
<style lang=""></style>

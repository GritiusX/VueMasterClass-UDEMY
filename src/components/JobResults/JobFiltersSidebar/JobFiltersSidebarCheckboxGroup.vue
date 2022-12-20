<template>
  <div class="mt-5">
    <fieldset>
      <ul class="flex flex-row flex-wrap">
        <li v-for="value in uniqueValues" :key="value" class="w-1/2 h-8">
          <input
            :id="value"
            v-model="selectedValues"
            :value="value"
            type="checkbox"
            class="mr-3"
            :data-test="value"
            @change="selectValue"
          />
          <label :for="value" data-test="value">{{ value }}</label>
        </li>
      </ul>
    </fieldset>
  </div>
</template>

<script lang="ts">
//import Accordion from "@/components/Shared/Accordion.vue";
import { defineComponent, PropType, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { key } from "@/store";
import { CLEAR_FILTER_SELECTIONS } from "@/store/constants";

export default defineComponent({
  name: "JobFiltersSidebarCheckboxGroup",
  //components: { Accordion },
  props: {
    // header: { //REFACTORED TO NOT USE THE ACCORDION OR THE HEADER ANYMORE
    //   type: String,
    //   default: "Header",
    //   required: true,
    // },
    uniqueValues: {
      type: [Array, Set] as PropType<string[] | Set<string>>, // vue:[Array,Set] // typescript: as PropType<string[]>
      // this means "it can be one or the other" but it will be taken as a string array or string Set
      required: true,
    },
    mutation: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    //we are importing key which will tell TypeScript the type of data that has in the state - ALWAYS CREATE THE KEY
    const store = useStore(key);
    const router = useRouter();

    const selectedValues = ref<string[]>([]); // with refs ALWAYS use a generic to let TYPESCRIPT know what type it is
    // const uniqueOrganizations = useUniqueOrganizations();

    // listen what it happens in the VUEX store (subscribe), so everytime you commit ANY MUTATION
    // it sends a signal to react to that emition of the change in the mutation
    store.subscribe((mutation) => {
      // basically what this is: check for the mutation with CLEAR_FILTER_SELECTIONS name and if it's being called,
      // make the selectedValues array empty itself
      if (mutation.type === CLEAR_FILTER_SELECTIONS) {
        selectedValues.value = [];
      }
    });

    const selectValue = () => {
      store.commit(props.mutation, selectedValues.value);
      router.push({ name: "JobResults" });
    };
    return {
      selectedValues,
      selectValue,
    };
  },
});
</script>

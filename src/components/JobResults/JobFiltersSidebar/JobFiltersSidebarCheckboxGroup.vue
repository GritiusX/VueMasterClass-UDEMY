<template>
  <accordion :header="header">
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
  </accordion>
</template>

<script lang="ts">
import Accordion from "@/components/Shared/Accordion.vue";
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { key } from "@/store";

export default defineComponent({
  name: "JobFiltersSidebarCheckboxGroup",
  components: { Accordion },
  props: {
    header: {
      type: String,
      default: "Header",
      required: true,
    },
    uniqueValues: {
      type: Set,
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

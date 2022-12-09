<template>
  <accordion header="Job Types">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li
            v-for="jobType in uniqueJobTypes"
            :key="jobType"
            class="w-1/2 h-8"
          >
            <input
              :id="jobType"
              v-model="selectedJobTypes"
              :value="jobType"
              type="checkbox"
              class="mr-3"
              :data-test="jobType"
              @change="selectJobType"
            />
            <label :for="jobType" data-test="job-type">{{ jobType }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </accordion>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

//import { mapGetters, mapMutations } from "vuex"; //DEPRECATED - COMPOSITION API
import { ADD_SELECTED_JOB_TYPES } from "@/store/constants"; //DEPRECATED - COMPOSITION API
//import { UNIQUE_JOB_TYPES } from "@/store/constants"; //DEPRECATED - COMPOSITION API
//import useConfirmRoute from "@/composables/useConfirmRoute";
import { useUniqueJobTypes } from "@/store/composables";

import Accordion from "@/components/Shared/Accordion.vue";

export default {
  name: "JobFiltersSidebarJobTypes",
  components: { Accordion },
  setup() {
    const store = useStore();
    const router = useRouter();
    const selectedJobTypes = ref([]); //store.state.selectedJobTypes - this used to be in data()

    const uniqueJobTypes = useUniqueJobTypes(); //store.getters.UNIQUE_JOB_TYPES

    //store.mutations.ADD_SELECTED_JOB_TYPES

    const selectJobType = () => {
      store.commit(ADD_SELECTED_JOB_TYPES, selectedJobTypes.value); //with this commit we dont need to pass the state but we need to pass the other param that we need
      router.push({ name: "JobResults" });
      //useConfirmRoute("JobResults");
      //router.push({name:"JobResults"})
    };
    return { selectedJobTypes, uniqueJobTypes, selectJobType };
  },
};

// OPTIONS API WRITING STYLE - DEPRECATED
// data() {
//   return {
//     selectedJobTypes: [],
//   };
// },

// computed: {
//   // UNIQUE_JOB_TYPES() {
//   //   //we are accessing the getter to obtain the unique organizations in our vuex store
//   //   return this.$store.getters.UNIQUE_JOB_TYPES;
//   // },

//   ...mapGetters([UNIQUE_JOB_TYPES]),
// },

// methods: {
//   //this specifically gets the mutation ADD_SELECTED_JOB_TYPES so we can use it
//   ...mapMutations([ADD_SELECTED_JOB_TYPES]),

//   selectJobType() {
//     this.ADD_SELECTED_JOB_TYPES(this.selectedJobTypes);
//     this.$router.push({ name: "JobResults" });
//     //this.ADD_SELECTED_JOB_TYPES is basically the sames as having the store
//     //mutation with the (state) already included you just need to pass the other parameter
//   },
// },
</script>

<template>
  <accordion header="Organizations">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li
            v-for="organization in uniqueOrganizations"
            :key="organization"
            class="w-1/2 h-8"
          >
            <input
              :id="organization"
              v-model="selectedOrganizations"
              :value="organization"
              type="checkbox"
              class="mr-3"
              :data-test="organization"
              @change="selectOrganization"
            />
            <label :for="organization" data-test="organization">{{
              organization
            }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </accordion>
</template>

<script>
import Accordion from "@/components/Shared/Accordion.vue";
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useUniqueOrganizations } from "@/store/composables";
//mapGetters, mapMutations,
// import {
//   UNIQUE_ORGANIZATIONS,
//   ADD_SELECTED_ORGANIZATIONS,
// } from "@/store/constants";
import { ADD_SELECTED_ORGANIZATIONS } from "@/store/constants";

export default {
  name: "JobFiltersSidebarOrganizations",
  components: { Accordion },
  // import useStore
  // import useRouter
  setup() {
    const selectedOrganizations = ref([]);
    const uniqueOrganizations = useUniqueOrganizations();

    const store = useStore();
    const router = useRouter();

    const selectOrganization = () => {
      store.commit(ADD_SELECTED_ORGANIZATIONS, selectedOrganizations.value);
      router.push({ name: "JobResults" });
    };
    return {
      selectedOrganizations,
      uniqueOrganizations,
      selectOrganization,
    };
  },
  // data() {
  //   return {
  //     selectedOrganizations: [],
  //   };
  // },
  // computed: {
  //   // UNIQUE_ORGANIZATIONS() {
  //   //   //we are accessing the getter to obtain the unique organizations in our vuex store
  //   //   return this.$store.getters.UNIQUE_ORGANIZATIONS;
  //   // },
  //   ...mapGetters([UNIQUE_ORGANIZATIONS]),
  // },
  // methods: {
  //   //this specifically gets the mutation ADD_SELECTED_ORGANIZATIONS so we can use it
  //   ...mapMutations([ADD_SELECTED_ORGANIZATIONS]),
  //   selectOrganization() {
  //     this.ADD_SELECTED_ORGANIZATIONS(this.selectedOrganizations);
  //     this.$router.push({ name: "JobResults" });
  //     //this.ADD_SELECTED_ORGANIZATIONS is basically the sames as having the store
  //     //mutation with the (state) already included you just need to pass the other parameter
  //   },
  // },
};
</script>

<template>
  <form
    class="flex items-center w-full h-12 mt-14 border border-brand-gray-3 rounded-3xl"
    @submit.prevent="searchForJobs"
  >
    <font-awesome-icon :icon="['fas', 'search']" class="ml-4 mr-3" />

    <div class="flex flex-nowrap flex-1 h-full text-base font-light">
      <div class="relative flex items-center flex-1 h-full pr-3">
        <label class="absolute left-0 -top-10">Role</label>
        <text-input
          v-model="role"
          placeholder="Software Engineer"
          data-test="role-input"
        />
        <!-- v-model="role" === value="role" @handle-input="role = $event" -->
        <!-- @handle-input="updateRole" === @handle-input="role = $event" -->
        <!-- <input
          v-model="role"
          type="text"
          placeholder="Software Engineer"
          class="w-full text-lg font-normal focus:outline-none"
        /> -->
        <!-- :value="role" + @input="updateRole" === v-model="role" -->
      </div>
      <span
        class="flex items-center h-full px-3 border-l border-r border-brand-gray-3 bg-brand-gray-2"
        >in</span
      >
      <div class="relative flex items-center flex-1 h-full pl-3">
        <label class="absolute left-0 -top-10">Where?</label>
        <text-input
          v-model="location"
          placeholder="Los Angeles"
          data-test="location-input"
        />
        <!-- v-model="location" === :value="location" @handle-input="location = $event" -->
        <!-- <input
          v-model="location"
          type="text"
          placeholder="Los Angeles"
          class="w-full text-lg font-normal focus:outline-none"
        /> -->
        <!-- :value="location" + @input="updateLocation" === v-model="location" -->

        <!-- you can also write @input="location = $event.target.value" which is exactly the same as doing a function such as done in roleInput-->
        <!-- @input -> its used when you press keyboard it does thing, console.log(event) to check all input methods+variables -->
      </div>
    </div>

    <action-button
      text="Search"
      type="secondary"
      class="rounded-r-3xl"
      data-test="form-submit-button"
    />
  </form>
</template>

<script>
import ActionButton from "@/components/Shared/ActionButton.vue";
import TextInput from "@/components/Shared/TextInput.vue";

export default {
  name: "JobSearchForm",
  components: { ActionButton, TextInput },
  data() {
    return {
      role: "",
      location: "",
    };
  },
  methods: {
    searchForJobs() {
      this.$router.push({
        name: "JobResults",
        query: { role: this.role, location: this.location },
      });
    },
    // updateRole(payload) { //the 2 first methods are to be used in @handleInput="method"
    //   this.role = payload;
    // },
    // updateLocation(payload) {
    //   this.location = payload;
    // },
    // updateRole(event) { // this updateRole is from the commented input v-model=role
    //   console.log((this.role = event.target.value));
    // },
    // updateLocation(event) {
    //   console.log((this.location = event.target.value));
    // },
  },
};
// example of TextInput in JobSearchForm:
// 1) it renders the :value="role" the first time completely empty so it then
// 2) updates the :value="value" at the TextInput to be also empty, after that
// 3) the user writes something on the input which will make the @input apply the
// 4) handleInput method to trigger, when it runs we get the $event.target.value which
// 5) is the value that the user wrote down
// 6) after that we emit the event "handleInput" which will bring the value written down
// 7) to the parent component and that will react to the @handleInput syntax which will
// 8) again update the role value from empty to sth with @handleInput="role= $event"
</script>

<style lang=""></style>

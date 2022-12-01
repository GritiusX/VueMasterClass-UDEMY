<template>
  <header :class="['w-full', 'text-sm', headerHeightClass]">
    <div class="fixed top-0 left-0 w-full h-16 bg-white">
      <div
        class="flex flex-nowrap h-full px-8 mx-auto border-b border-solid border-brand-gray-1"
      >
        <router-link
          :to="{ name: 'Home' }"
          class="flex items-center h-full text-xl"
          >Bobo Carreers</router-link
        >
        <nav class="h-full ml-12">
          <ul class="h-full flex p-0 m-0 list-none">
            <li
              v-for="menuItem in menuItems"
              :key="menuItem.text"
              class="h-full ml-9 first:ml-0"
              data-test="main-nav-list-item"
            >
              <router-link
                :to="menuItem.url"
                class="h-full flex items-center py-2.5"
                >{{ menuItem.text }}</router-link
              >
            </li>
          </ul>
        </nav>
        <div class="flex h-full items-center ml-auto" @click="LOGIN_USER()">
          <profile-image v-if="isLoggedIn" data-test="profile-image" />
          <action-button v-else text="Sign In" data-test="login-button" />
        </div>
      </div>
      <subnav v-if="isLoggedIn" data-test="subnav" />
    </div>
  </header>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import ActionButton from "@/components/Shared/ActionButton.vue";
import ProfileImage from "@/components/Navigation/ProfileImage.vue";
import Subnav from "@/components/Navigation/Subnav.vue";

import { LOGIN_USER } from "@/store/constants";

export default {
  name: "MainNav",
  components: { ActionButton, ProfileImage, Subnav },
  data() {
    return {
      menuItems: [
        { text: "Teams", url: { name: "Teams" } },
        { text: "Locations", url: "/" },
        { text: "Life at Bobo", url: "/" },
        { text: "How we hire", url: "/" },
        { text: "Students", url: "/" },
        { text: "Jobs", url: { name: "JobResults" } },
      ],
      //isLoggedIn:false, //this used to be the old variable to make changes in the DOM, we changed it for the this.$store
    };
  },
  computed: {
    headerHeightClass() {
      return {
        "h-16": !this.isLoggedIn,
        "h-32": this.isLoggedIn,
      };
    },
    // isLoggedIn() {
    //   return this.$store.state.isLoggedIn;
    // },
    ...mapState(["isLoggedIn"]), //this is called a vuex Helper Method
    // ...mapState({
    //   isLoggedIn: (state) => state.isLoggedIn,
    //   //isLoggedIn: "isLoggedIn",

    // }),
  },
  methods: {
    // LOGIN_USER() {
    //   //this.isLoggedIn = !this.isLoggedIn;
    //   //this.$store.commit("LOGIN_USER"); //instead of a string we import the LOGIN_USER
    //   //                                  //constant create in the store just eliminate any possible typo
    //   this.$store.commit(LOGIN_USER); //this LOGIN_USER is definitely a reference to a method in the store
    // },
    ...mapMutations([LOGIN_USER]), //you do an array and take as many mutations as you need and that works as if there was a METHOD with the same name
  },
};
</script>

<style lang=""></style>

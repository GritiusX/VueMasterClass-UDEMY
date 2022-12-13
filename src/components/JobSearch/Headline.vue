<template>
  <section class="mb-16">
    <h1
      class="font-bold tracking-tighter text-8xl mb-14"
      data-test="action-phrase"
    >
      <span :class="actionClasses">{{ action }}</span>
      <br />
      for everyone
    </h1>
    <h2 class="text-3xl font-light">Find your next job at Bobo Corp</h2>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import nextElementInList from "@/utils/nextElementInList";

interface ActionClasses {
  [action: string]: boolean;
}
interface Data {
  action: string;
  interval: number | undefined;
}
export default defineComponent({
  name: "Headline",
  data(): Data {
    return {
      action: "Build",
      interval: undefined,
    };
  },
  computed: {
    actionClasses(): ActionClasses {
      return {
        [this.action.toLowerCase()]: true,
      };
    },
  },
  created() {
    this.changeTitle();
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
  methods: {
    changeTitle() {
      this.interval = setInterval(() => {
        const actions = ["Build", "Create", "Design", "Code"];
        this.action = nextElementInList(actions, this.action);
      }, 3000);
    },
  },
});
// export default {
//   name: "Headline",
//   data() {
//     return {
//       action: "Build",
//       interval: null, //we created this variable to store the interval at the state, so we can clear it whenever we leave the page
//     };
//   },
//   computed: {
//     actionClasses() {
//       //this computed method changes the color of the span in line 4
//       return {
//         // build: this.action === "Build",
//         // create: this.action === "Create",
//         // design: this.action === "Design",
//         // code: this.action === "Code",
//         [this.action.toLowerCase()]: true,
//       };
//     },
//   },
//   created() {
//     //we instance this method once, but because of the interval it keeps going forever
//     this.changeTitle();
//   },
//   beforeUnmount() {
//     //here we delete the interval once the leave the page
//     clearInterval(this.interval);
//   },
//   methods: {
//     changeTitle() {
//       //this interval gets the index of every element in the array, adds 1 to the position of it
//       //and when you divide by the length and get 0, gets you back to the first position of the array
//       this.interval = setInterval(() => {
//         const actions = ["Build", "Create", "Design", "Code"];
//         this.action = nextElementInList(actions, this.action);
//       }, 3000);
//     },
//   },
// };
</script>

<style scoped>
.build {
  color: #1a73e8;
}
.create {
  color: #34a853;
}
.design {
  color: #f9ab00;
}
.code {
  color: #d93025;
}
</style>

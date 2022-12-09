<template>
  <button :class="buttonClass">
    {{ text }}
  </button>
</template>

<script lang="ts">
import { computed, toRefs, defineComponent } from "vue";
export default defineComponent({
  name: "ActionButton",
  props: {
    text: {
      type: String,
      required: true,
      default: "Button",
    },
    type: {
      type: String,
      required: false,
      default: "primary",
      validator: (value: string) => {
        return ["primary", "secondary"].includes(value);
      },
    },
  },
  setup(props) {
    //COMPOSITION API WRITING WAY
    const { type } = toRefs(props); //we are destructuring the props reactive object to have a new reactive object to use it on buttonClass
    const buttonClass = computed(() => {
      return {
        //it must ALWAYS RETURN
        // [props.type]: true,
        [type.value]: true, //if using toRefs from props, we can destructure to make it a reactive object and you'll need to use .value
      };
    });

    return {
      buttonClass,
    };
  },
  // computed: {
  //   buttonClass() {
  //     return {
  //       [this.type]: true, //OPTION API WAY OF WRITING
  //     };
  //   },
  // },
});
</script>

<style scoped>
button {
  @apply px-5 py-3 font-medium;
}
.primary {
  @apply text-white bg-brand-blue-1 hover:shadow-blue rounded;
}
.secondary {
  @apply text-brand-blue-2 bg-transparent hover:bg-brand-blue-2 hover:text-white;
}
</style>

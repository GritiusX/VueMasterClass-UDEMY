<template>
  <div class="py-5 border-b border-solid border-brand-gray-2">
    <div
      class="flex flex-wrap items-center justify-between hover:cursor-pointer"
      data-test="clickable-area"
      @click="open()"
    >
      <h3 class="text-base font-semibold">{{ header }}</h3>
      <font-awesome-icon :icon="caretIcon" />
    </div>
    <div v-if="isOpen" class="w-full mt-5">
      <slot><p>Whoops, somebody forgot to populate me!</p></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { ref, computed, defineComponent } from "vue";
export default defineComponent({
  name: "Accordion",
  //COMPOSITION API WRITING WAY
  props: {
    header: {
      type: String,
      default: "Accordion Header",
      required: true,
    },
  },
  setup() {
    const isOpen = ref(false);

    const open = () => {
      isOpen.value = !isOpen.value;
    };

    const caretIcon = computed(
      () => (isOpen.value ? ["fas", "angle-up"] : ["fas", "angle-down"]) //this.isOpen changes to isOpen.value
    );
    return { open, isOpen, caretIcon };
  },
});

//OPTIONS API WAY OF WRITING
// props: {
//   header: {
//     type: String,
//     default: "Accordion Header",
//     required: true,
//   },
// },
// data() {
//   return {
//     isOpen: false,
//   };
// },
// computed: {
//   caretIcon() {
//     return this.isOpen ? ["fas", "angle-up"] : ["fas", "angle-down"]; //if this isOpen is false then the chevron points down, if not points up
//   },
// },
// methods: {
//   open() {
//     this.isOpen = !this.isOpen;
//   },
// },
</script>
<style></style>

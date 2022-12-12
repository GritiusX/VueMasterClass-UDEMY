<template>
  <input
    type="text"
    :placeholder="placeholder"
    :value="modelValue"
    class="w-full text-lg font-normal focus:outline-none"
    @input="handleInput"
  />
</template>
<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "TextInput",
  props: {
    placeholder: {
      type: String,
      default: "Placeholder",
      required: false,
    },
    modelValue: {
      type: String,
      required: true,
    },
  },
  emits: ["update:modelValue"],
  methods: {
    handleInput($event: Event) {
      const target = $event.target as HTMLInputElement; //we are informing typescript the type of the event inside the Input element so in the emit doesnt say that the value is NULL
      this.$emit("update:modelValue", target.value);
      // $event.target.value => brings the input value, but do
      // @input="con" => con($event){console.log($event)} to check this at target
    },
  },
});
// you can use v-model on a parent component to emit from child to parent using:
// 1) prop is changed from value to modelValue
// 2) change the emit from handleInput to update:modelValue
// 3) add the emits array inside export default
</script>
<style></style>

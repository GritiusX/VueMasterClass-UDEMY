<template>
  <input
    type="text"
    :placeholder="placeholder"
    :value="modelValue"
    class="w-full text-lg font-normal focus:outline-none"
    @input="handleInput"
  />
</template>
<script>
export default {
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
    handleInput($event) {
      this.$emit("update:modelValue", $event.target.value);
      // $event.target.value => brings the input value, but do
      // @input="con" => con($event){console.log($event)} to check this at target
    },
  },
};
// you can use v-model on a parent component to emit from child to parent using:
// 1) prop is changed from value to modelValue
// 2) change the emit from handleInput to update:modelValue
// 3) add the emits array inside export default
</script>
<style></style>

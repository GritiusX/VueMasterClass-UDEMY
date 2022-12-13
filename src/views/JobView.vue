<template lang="">
  <div>Job Page for job {{ currentJobId }}</div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "JobView",
  setup() {
    const route = useRoute();

    const currentJobId = route.params.id;

    return { currentJobId };
  },
});
</script>
<style lang=""></style>

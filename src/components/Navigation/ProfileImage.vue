<template lang="">
  <img :src="imageLink" class="w-8 h-8 object-contain rounded-3xl" />
</template>
<script lang="ts">
import { defineComponent } from "vue"; // ALWAYS import defineComponent to make TypeScript understand that this is a vue component and treat it as such
export default defineComponent({
  name: "ProfileImage",
  data() {
    return {
      imageLink:
        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b39edcfc-386e-46f2-b9f4-110eb7fc32f1/d37z70b-a740fcf0-8880-42bc-b0d3-17ff92a3359a.png/v1/fill/w_272,h_288,strp/legend_of_zelda__link_face_by_catbeecache_d37z70b-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9Mjg4IiwicGF0aCI6IlwvZlwvYjM5ZWRjZmMtMzg2ZS00NmYyLWI5ZjQtMTEwZWI3ZmMzMmYxXC9kMzd6NzBiLWE3NDBmY2YwLTg4ODAtNDJiYy1iMGQzLTE3ZmY5MmEzMzU5YS5wbmciLCJ3aWR0aCI6Ijw9MjcyIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.gkjAbSCQZmigT6i7Bi2KzfAsLk45KueeSMHiNtcvYvY",
    };
  },
});
</script>
<style lang=""></style>

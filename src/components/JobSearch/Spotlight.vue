<template>
  <ul>
    <li v-for="spotlight in spotlights" :key="spotlight.id">
      <slot
        :img="spotlight.img"
        :title="spotlight.title"
        :description="spotlight.description"
      ></slot>
    </li>
  </ul>
</template>
<!-- // THE SLOTS PROP ":spotlight="spotlight" " IS USED SO THAT THE PARENT COMPONENT CAN HAVE ACCESS FROM THE CHILD TO ALL THE INFORMATION
// IS GETTING FROM THE API, SUCH AS TITLE, DESCRIPTION, PICTURES, ETC!!!!! -->

<script lang="ts">
import { ref, onMounted, defineComponent } from "vue";
import axios from "axios";

interface Spotlight {
  id: number;
  img: string;
  title: string;
  description: string;
}

export default defineComponent({
  name: "Spotlight",
  setup() {
    const spotlights = ref<Spotlight[]>([]);
    const getSpotlights = async () => {
      const baseUrl = process.env.VUE_APP_API_URL;
      const response = await axios.get<Spotlight[]>(`${baseUrl}/spotlights`);
      spotlights.value = response.data;
    };
    onMounted(getSpotlights);

    return { spotlights };
  },
});
// data() { //DEPRECATED BECAUSE OF COMPOSITION API
//   return {
//     spotlights: [],
//   };
// },
// computed: {},
// async mounted() {
//   const baseUrl = process.env.VUE_APP_API_URL;
//   const response = await axios.get(`${baseUrl}/spotlights`);
//   this.spotlights = response.data;
// },
</script>

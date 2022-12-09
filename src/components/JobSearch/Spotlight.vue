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

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
export default {
  name: "Spotlight",
  setup() {
    const spotlights = ref([]);
    const getSpotlights = async () => {
      const baseUrl = process.env.VUE_APP_API_URL;
      const response = await axios.get(`${baseUrl}/spotlights`);
      spotlights.value = response.data;
    };
    onMounted(getSpotlights);

    return { spotlights };
  },
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
};
</script>

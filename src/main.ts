import { createApp } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSearch,
  faAngleDown,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";

import App from "@/App.vue";
import "@/assets/tailwind.css";
import router from "@/router";
import store from "@/store";

library.add(faSearch);
library.add(faAngleDown);
library.add(faAngleUp);

//component is added so we can use it globally (example Subnav <font-awesome-icon/>)
createApp(App)
  .use(store)
  .use(store)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");

import { createStore } from "vuex";
import state from "@/store/state";
import mutations from "@/store/mutations";
import actions from "@/store/actions";
import getters from "@/store/getters";

const store = createStore({
  state,
  mutations,
  actions,
  getters,
  strict: process.env.NODE_ENV !== "production",
});

//strict is going to be always true unless we are in production

export default store;
//mapState(['jobs']), mapMutations([LOGIN_USER]),

import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import state from "@/store/state";
import mutations from "@/store/mutations";
import actions from "@/store/actions";
import getters from "@/store/getters";

import { GlobalState } from "@/store/types";

export const key: InjectionKey<Store<GlobalState>> = Symbol(); //this was created so typescript doesnt complain

const store = createStore<GlobalState>({
  state,
  mutations,
  actions,
  getters,
  strict: process.env.NODE_ENV !== "production",
});

//strict is going to be always true unless we are in production

export default store;
//mapState(['jobs']), mapMutations([LOGIN_USER]),

// ======  IMPORTANT!!! IMPORTANT!!! IMPORTANT!!! IMPORTANT!!! IMPORTANT!!! IMPORTANT!!! IMPORTANT!!! IMPORTANT!!!
// 1) get the PROPERTY on the state
// 1.1) create a constant for the mutation
// 2) get the MUTATION to modify the PROPERTY (it can ONLY modify 1 property)
// 2.2) get a constant for the action
// 3) make an ACTION (asynchronous) to DO AN API REQUEST
// 4) COMMIT the MUTATION to overwrite the state and POPULATES the property
// 5) have a GETTER talk to that PROPERTY and filter anything you need
// 6) THROUGH A COMPOSABLE send the GETTER on your vue components (EX: useUniqueDegrees)

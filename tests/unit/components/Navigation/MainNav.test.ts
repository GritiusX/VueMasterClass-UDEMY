import { GlobalState } from "@/store/types";
import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import { createStore } from "vuex";
import MainNav from "@/components/Navigation/MainNav.vue";

interface MockStore {
  state: Partial<GlobalState>;
}

describe("MainNav", () => {
  const createConfig = ($store: MockStore) => ({
    global: {
      mocks: {
        $store,
      },
      stubs: {
        "router-link": RouterLinkStub,
      },
    },
  });

  it("displays company name", () => {
    const store = { state: { isLoggedIn: false } };
    const wrapper = shallowMount(MainNav, createConfig(store));

    expect(wrapper.text()).toMatch("Bobo Carreers");
  });

  it("displays menu items for navigation", () => {
    const store = { state: { isLoggedIn: false } };
    const wrapper = shallowMount(MainNav, createConfig(store));

    const navigationMenuItems = wrapper.findAll(
      "[data-test='main-nav-list-item']"
    );
    const navigationMenuTexts = navigationMenuItems.map((item) => item.text());
    expect(navigationMenuTexts).toEqual([
      "Teams",
      "Locations",
      "Life at Bobo",
      "How we hire",
      "Students",
      "Jobs",
    ]);
  });

  describe("when user is logged out", () => {
    it("prompts user to sign in", () => {
      const store = { state: { isLoggedIn: false } };
      const wrapper = shallowMount(MainNav, createConfig(store));

      const logInButton = wrapper.find("[data-test='login-button']");
      expect(logInButton.exists()).toBe(true);
    });
  });

  describe("when user is logged in", () => {
    it("display user profile picture", () => {
      const store = { state: { isLoggedIn: true } };
      const wrapper = shallowMount(MainNav, createConfig(store));

      const profileImage2 = wrapper.find("[data-test='profile-image']");
      expect(profileImage2.exists()).toBe(true);
    });

    it("displays subnavigation with additional information", () => {
      const store = { state: { isLoggedIn: true } };
      const wrapper = shallowMount(MainNav, createConfig(store));

      const subnav = wrapper.find("[data-test='subnav']");
      expect(subnav.exists()).toBe(true);
    });

    describe("when user is logged out", () => {
      // it("issues call to Vuex to login user EXAMPLE WITH REAL MOCKED STATE", async () => {
      //   const store = createStore();
      //   const commit = jest.fn();
      //   store.commit = commit;

      //   const wrapper = shallowMount(MainNav, createConfig(store));
      //   const loginButton = wrapper.find("[data-test='login-button']");
      //   await loginButton.trigger("click");
      //   expect(commit).toHaveBeenCalledWith("LOGIN_USER");
      // });

      it("issues call to Vuex to login user EXAMPLE WITH JUST MOCKED OBJECT CALLED STATE", async () => {
        const commit = jest.fn();
        const store = {
          state: {
            isLoggedIn: false,
          },
          commit,
        };

        const wrapper = shallowMount(MainNav, createConfig(store));
        const loginButton = wrapper.find("[data-test='login-button']");
        await loginButton.trigger("click");
        expect(commit).toHaveBeenCalledWith("LOGIN_USER");
      });
    });
  });
});


//DEPRECATED TESTS FROM JAVASCRIPT TO TYPESCRIPT
// //ONCE YOU MOUNT/RENDER THE COMPONENT, IMAGINE THE TEST WILL CHECK STEP BY STEP THE COMPONENT
// describe("MainNav", () => {
//   // let wrapper;
//   // // we create this variable outside the scope so it's global
//   // // and so we can later call it later in all the it("", ()=>{})

//   // beforeEach(() => {
//   //   wrapper = shallowMount(MainNav, {
//   //     global: {
//   //       stubs: {
//   //         "router-link": RouterLinkStub,
//   //         // this makes a mock of a routerlink with sth close to a clone
//   //         // instead of a "div"
//   //       },
//   //     },
//   //   });
//   // });
//   const createConfig = ($store) => ({
//     //this createConfig is called a FACTORY FUNCTION
//     global: {
//       mocks: {
//         //we refactor the plugin store to a mock because it's not necesary to have
//         //a real store working, just a mocked clone of it
//         $store,
//       },
//       //plugins: [store], //plugins are used for any outside library
//       stubs: {
//         "router-link": RouterLinkStub,
//         // this makes a mock of a routerlink with sth close to a clone
//         // instead of a "div"
//       },
//     },
//   });

//   it("displays company name", () => {
//     //STOREexample -- const store = createStore(); //instead of using a real store we can mock it
//     const store = { state: { isLoggedIn: false } }; // STOREexample -- so this is a mocked store,
//     //STOREexample -- the component will go to "store", then access the "state" property and then
//     //STOREexample -- enter the isLoggedIn property as seen in the real mounted component

//     //STOREexample -- here we create this store JUST so we make the test pass, it's not necessary
//     //STOREexample -- in here because we are not invoking the store in any part of the test
//     const wrapper = shallowMount(MainNav, createConfig(store));
//     // {
//     //  global: {
//     //    stubs: {
//     //      "router-link": RouterLinkStub,
//     //      // this makes a mock of a routerlink with sth close to a clone
//     //      // instead of a "div"
//     //    },
//     // },
//     //}
//     //this can be commented instead of deleted as an example
//     // of how to write the test but it's not necesary because of the
//     // beforeEach and the variable outside
//     expect(wrapper.text()).toMatch("Bobo Carreers");
//   });

//   it("displays menu items for navigation", () => {
//     //const store = createStore();
//     const store = { state: { isLoggedIn: false } };
//     const wrapper = shallowMount(MainNav, createConfig(store));

//     const navigationMenuItems = wrapper.findAll(
//       "[data-test='main-nav-list-item']"
//     );
//     const navigationMenuTexts = navigationMenuItems.map((item) => item.text());
//     expect(navigationMenuTexts).toEqual([
//       "Teams",
//       "Locations",
//       "Life at Bobo",
//       "How we hire",
//       "Students",
//       "Jobs",
//     ]);
//   });

//   // dif between mount and shallowMount => mount renders all children and grandchildren into
//   // main component, shallowMount renders only main component and stubs (mocks) the children
//   // so you dont get other warns or errors from their children

//   describe("when user is logged out", () => {
//     it("prompts user to sign in", () => {
//       //const store = createStore();
//       const store = { state: { isLoggedIn: false } };
//       const wrapper = shallowMount(MainNav, createConfig(store));

//       const logInButton = wrapper.find("[data-test='login-button']");
//       expect(logInButton.exists()).toBe(true);
//     });
//   });

//   describe("when user is logged in", () => {
//     //describe("when user logs in", () => {
//     // it("display user profile picture", async () => {
//     //   const wrapper = shallowMount(MainNav, createConfig());

//     //   let profileImage2 = wrapper.find("[data-test='profile-image']");
//     //   expect(profileImage2.exists()).toBe(false);

//     //   const logInButton = wrapper.find("[data-test='login-button']");
//     //   await logInButton.trigger("click");
//     //   profileImage2 = wrapper.find("[data-test='profile-image']");

//     //   expect(profileImage2.exists()).toBe(true);
//     // });}
//     it("display user profile picture", () => {
//       // for the purpose of testing you can create a store with JUST the props
//       // that you need for this particular test instead of importing the entire state
//       // const store = createStore({
//       //   state() {
//       //     return {
//       //       isLoggedIn: true,
//       //     };
//       //   },
//       // });
//       const store = { state: { isLoggedIn: true } };
//       const wrapper = shallowMount(MainNav, createConfig(store));

//       let profileImage2 = wrapper.find("[data-test='profile-image']");
//       expect(profileImage2.exists()).toBe(true);
//     });

//     // it("displays subnavigation with additional information", async () => {
//     // // this is a test without having store and having a variable of isLoggedIn:false
//     //   const wrapper = shallowMount(MainNav, createConfig());

//     //   let subnav = wrapper.find("[data-test='subnav']");
//     //   expect(subnav.exists()).toBe(false);

//     //   const logInButton = wrapper.find("[data-test='login-button']");
//     //   await logInButton.trigger("click");

//     //   subnav = wrapper.find("[data-test='subnav']");
//     //   expect(subnav.exists()).toBe(true);
//     // });
//     it("displays subnavigation with additional information", () => {
//       // const store = createStore({
//       //   state() {
//       //     return { isLoggedIn: true };
//       //   },
//       // });
//       const store = { state: { isLoggedIn: true } };
//       const wrapper = shallowMount(MainNav, createConfig(store));

//       const subnav = wrapper.find("[data-test='subnav']");
//       expect(subnav.exists()).toBe(true);
//     });

//     describe("when user is logged out", () => {
//       it("issues call to Vuex to login user EXAMPLE WITH REAL MOCKED STATE", async () => {
//         const store = createStore(); // we create the store as normal
//         const commit = jest.fn(); // we mock the commit function with jest
//         store.commit = commit; // we change the real commit from Vuex with the commit mock

//         const wrapper = shallowMount(MainNav, createConfig(store)); // mount/render the mainNav
//         const loginButton = wrapper.find("[data-test='login-button']"); //find loginButton
//         await loginButton.trigger("click"); //trigger a click on it
//         expect(commit).toHaveBeenCalledWith("LOGIN_USER"); //we expect that it triggers LOGIN_USER
//       });

//       it("issues call to Vuex to login user EXAMPLE WITH JUST MOCKED OBJECT CALLED STATE", async () => {
//         const commit = jest.fn(); // we mock the commit function with jest
//         const store = {
//           state: {
//             isLoggedIn: false,
//           },
//           commit, //and this commit is going to simulate the LOGIN_USER mock
//         }; // here is a mocked store

//         const wrapper = shallowMount(MainNav, createConfig(store)); // mount/render the mainNav
//         const loginButton = wrapper.find("[data-test='login-button']"); //find loginButton
//         await loginButton.trigger("click"); //trigger a click on it
//         expect(commit).toHaveBeenCalledWith("LOGIN_USER"); //we expect that it triggers LOGIN_USER
//       });
//     });
//   });

//   // describe("when user is logged out", () => {
//   //   it("prompts user to sign in", () => {

//   //     const wrapper = shallowMount(
//   //       MainNav,
//   //       createConfig(store)
//   //       //   {
//   //       //   global: {
//   //       //     stubs: {
//   //       //       "router-link": RouterLinkStub,
//   //       //       // this makes a mock of a routerlink with sth close to a clone
//   //       //       // instead of a "div"
//   //       //     },
//   //       //   },
//   //       //   data() {
//   //       //     return {
//   //       //       isLoggedIn: false,
//   //       //     };
//   //       //   },
//   //       // }
//   //     );
//   //     const logInButton = wrapper.find("[data-test='login-button']");
//   //     const profileImage = wrapper.find("[data-test='profile-image']");
//   //     expect(logInButton.exists()).toBe(true);
//   //     expect(profileImage.exists()).toBe(false);
//   //   });
//   // });

//   // describe("when user logs in", () => {
//   //   it("shows profile image on navbar", () => {

//   //     const wrapper = shallowMount(MainNav, {
//   //       global: {
//   //         stubs: {
//   //           "router-link": RouterLinkStub,
//   //           // this makes a mock of a routerlink with sth close to a clone
//   //           // instead of a "div"
//   //         },
//   //       },
//   //       data() {
//   //         return {
//   //           isLoggedIn: true,
//   //         };
//   //       },
//   //     });
//   //     const logInButton2 = wrapper.findComponent({ name: "ActionButton" });
//   //     const profileImage2 = wrapper.findComponent({ name: "ProfileImage" });
//   //     expect(logInButton2.exists()).toBe(false);
//   //     expect(profileImage2.exists()).toBe(true);
//   //   });
//   // });
// });

//toBe(), toMatch(),find(),findAll()

//use data-test to test VUE components so it doesnt break if anyone changes li or div to the v-for

//you can but DON'T MAKE ARTIFICIAL CHANGES TO THE COMPONENTS UNLESS IT NEED PROPS, 2 EXAMPLES:

// 1) ADDING A 2ND ARGUMENT TO mount()
// Don't use the 2nd argument of mount to add data() object
// you are giving the test too much information it should come from the component

// describe("MainNav", () => {
//   it("displays company name", () => {
//     const wrapper = mount(MainNav, {
//       data() {
//         return { company: "Super Corp" };
//       },
//     });
//     expect(wrapper.text()).toMatch("Super Corp");
//   });
// });

// ------------------------------------------------------------------

// 2) ASYNCRONOUS TESTING - setData()
// asyncronous testing, the setData method doesn't stop the test to keep going
// so you it says to expect Super Corp, but the info didn't change, so the test
// fails becaus in MainNav the data is "Bobo Carreers" -- so just make it async
// so it awaits the setData to finish before expecting the test

// describe("MainNav", () => {
//   it("displays company name", async () => {
//     const wrapper = mount(MainNav);
//     await wrapper.setData({ company: "Super Corp" });
//     expect(wrapper.text()).toMatch("Super Corp");
//   });
// });

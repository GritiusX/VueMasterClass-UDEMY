import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import Headline from "@/components/JobSearch/Headline.vue";

describe("Headline", () => {
  beforeEach(() => {
    jest.useFakeTimers("legacy"); // this makes all fn mocks
  });
  afterEach(() => {
    jest.useRealTimers(); // this makes all real fn again
  });

  //describe("Jest playground", () => {
  // it("tracks whether is has been called", () => {
  //   // const mockFunction = jest.fn();
  //   // mockFunction(1, 2, 3);
  //   // expect(mockFunction).toHaveBeenCalled();
  //   // expect(mockFunction).toHaveBeenCalledWith(1, 2, 3);
  //   // this console.log is the jest mock which with fakeTimers makes ANY function/method
  //   // as it is this mock fn
  //   // console.log(jest.fn());
  //   jest.useFakeTimers("legacy");
  //   console.log(setInterval);
  //   jest.useRealTimers("legacy");
  //   console.log(setInterval);
  // });
  //});

  it("displays introductory action verb", () => {
    //jest.useFakeTimers("legacy"); // this makes all fn mocks
    const wrapper = mount(Headline);
    const actionPhrase = wrapper.find("[data-test='action-phrase']");
    expect(actionPhrase.text()).toBe("Build for everyone");
    //jest.useRealTimers("legacy"); // this makes all real fn again
  });

  it("changes action verb at a consistent interval", () => {
    //jest.useFakeTimers("legacy"); // this makes all fn mocks
    mount(Headline);
    expect(setInterval).toHaveBeenCalled();
    //jest.useRealTimers("legacy"); // this makes all real fn again
  });

  it("swaps action verb after first interval", async () => {
    //jest.useFakeTimers("legacy"); // this makes all fn mocks
    const wrapper = mount(Headline);
    const actionPhrase = wrapper.find("[data-test='action-phrase']");
    // console.log(wrapper.vm); // checks what's inside of the component's script
    jest.runOnlyPendingTimers(); //simulates that interval passes
    await nextTick(); // we pass one interval and updates
    expect(actionPhrase.text()).toBe("Create for everyone");
    //jest.useRealTimers("legacy"); // this makes all real fn again
  });
  //nextTick = updates vue component to proceed one step forward
  it("removes interval when component disappears", () => {
    //jest.useFakeTimers("legacy");
    const wrapper = mount(Headline);
    wrapper.unmount();
    expect(clearInterval).toHaveBeenCalled();
    //jest.useRealTimers("legacy");
  });
});

//Basically what we did with this component test is to:

// 0) beforeEach and afterEach - let's you be more pro DRY (DON'T REPEAT YOURSELF)
//    because you put anything you need inside a function to be repeated in all tests

// 1) check the introductory headline text "Build for everyone" -> PASS

// 2) once mounted if "setInterval (mocked)" is been called -- we simulate the constant
//   change function by using useFakeTimers + useRealTimers (MUST BE TOGETHER AS A SANDWICH)
//   -> PASS

// 3) once the setInterval works, check that the word is updated in the Headline -> PASS

// 4) check that once unmounted, clearInterval is been called -> PASS

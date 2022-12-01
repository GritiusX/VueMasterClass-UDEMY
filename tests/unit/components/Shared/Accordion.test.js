import { mount } from "@vue/test-utils";
import Accordion from "@/components/Shared/Accordion.vue";

describe("Accordion", () => {
  const createConfig = (config = {}) => ({
    global: {
      stubs: {
        FontAwesomeIcon: true, //to avoid warnings we stub this element
      },
    },
    props: {
      header: "Test header",
    },
    slots: {
      //slots is the property vue has to add slots to test
      default: "<h3>My nested child</h3>", //default is the name it gets when a slot in the real component doesnt have a name
    },
    ...config,
  });

  it("renders chilid", async () => {
    const slots = {
      default: "<h3>My nested child</h3>",
    };
    const config = { slots }; //this config overwrites the slots property by destructuring it, keeping everything the same BUT the slots
    const wrapper = mount(Accordion, createConfig(config));

    expect(wrapper.text()).not.toMatch("My nested child"); //starting state of the component to be tested
    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");
    expect(wrapper.text()).toMatch("My nested child"); //end state of the component to be tested
  });

  describe("when we do not provide custom child component", () => {
    it("renders default content", async () => {
      const wrapper = mount(Accordion, {
        props: {
          header: "Test header",
        },
        global: {
          stubs: {
            FontAwesomeIcon: true, //to avoid warnings we stub this element
          },
        },
      });
      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger("click");
      expect(wrapper.text()).toMatch("Whoops, somebody forgot to populate me!"); //end state of the component to be tested
    });
  });
});

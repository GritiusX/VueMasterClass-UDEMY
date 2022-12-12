import { flushPromises, mount } from "@vue/test-utils";
import axios from "axios";
jest.mock("axios");

import Spotlight from "@/components/JobSearch/Spotlight.vue";

const axiosGetMock = axios.get as jest.Mock;

describe("Spotlight", () => {
  const mockSpotlightResponse = (data = {}) => {
    axiosGetMock.mockResolvedValue({
      data: [
        {
          img: "Some img",
          title: "Some title",
          description: "Some description",
          ...data,
        },
      ],
    });
  };

  it(" provides img attribute to parent component", async () => {
    const data = { img: "Some img" };
    mockSpotlightResponse({ data }); //this is a fn that mocks the axios.get with the attributes that we need

    const wrapper = mount(Spotlight, {
      slots: {
        default: `<template #default="slotProps">
          <h1>{{ slotProps.img }}</h1>
          </template>`,
      },
    });

    await flushPromises();
    expect(wrapper.text()).toMatch("Some img");
  });

  it(" provides title prop to parent component", async () => {
    const data = { title: "Some title" };
    mockSpotlightResponse({ data }); //this is a fn that mocks the axios.get with the attributes that we need
    //check next test to see another way to do it

    const wrapper = mount(Spotlight, {
      slots: {
        default: `<template #default="slotProps">
          <h1>{{ slotProps.title }}</h1>
          </template>`,
      },
    });

    await flushPromises();
    expect(wrapper.text()).toMatch("Some title");
  });

  it(" provides description prop to parent component", async () => {
    axiosGetMock.mockResolvedValue({
      data: [
        {
          img: "Some img",
          title: "Some title",
          description: "Some description",
        },
      ],
    });

    const wrapper = mount(Spotlight, {
      slots: {
        default: `<template #default="slotProps">
          <h1>{{ slotProps.description }}</h1>
          </template>`,
      },
    });

    await flushPromises();
    expect(wrapper.text()).toMatch("Some description");
  });
});

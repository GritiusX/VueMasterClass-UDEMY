import { mount, RouterLinkStub } from "@vue/test-utils";

import JobListing from "@/components/JobResults/JobListing.vue";
import { Job } from "@/api/types";

import { createJob } from "../../store/utils"; //this is a helper util function
// which will make a new job with every property as optional so we can use whatever
// we need in the tests - everything else will be filled with the mock data already in

describe("JobListing", () => {
  // === we are importing createJob from utils, to use that inside the other tests
  // const createJobProps = (jobProps = {}) => ({
  //   title: "Vue Developer",
  //   organization: "AirBnB",
  //   locations: ["Buenos Aires"],
  //   minimumQualifications: ["Develop"],
  //   ...jobProps,
  // });

  const createConfig = (job: Job) => ({
    props: {
      job: {
        ...job,
      },
    },
    global: {
      stubs: {
        routerLink: RouterLinkStub,
      },
    },
  });

  it("renders job title", () => {
    const jobProps = createJob({ title: "Vue Programmer" });
    const wrapper = mount(JobListing, createConfig(jobProps));
    expect(wrapper.text()).toMatch("Vue Programmer");
  });

  it("renders job organization", () => {
    const jobProps = createJob({ organization: "Airbnb" });
    const wrapper = mount(JobListing, createConfig(jobProps));
    expect(wrapper.text()).toMatch("Airbnb");
  });

  it("renders job locations", () => {
    const jobProps = createJob({ locations: ["London", "New York"] });
    const wrapper = mount(JobListing, createConfig(jobProps));
    expect(wrapper.text()).toMatch("London");
    expect(wrapper.text()).toMatch("New York");
  });

  it("renders qualifications", () => {
    const jobProps = createJob({
      minimumQualifications: ["Testing", "QA"],
    });
    const wrapper = mount(JobListing, createConfig(jobProps));
    expect(wrapper.text()).toMatch("Testing");
    expect(wrapper.text()).toMatch("QA");
  });
  it("links individual job's page", () => {
    const jobProps = createJob({ id: 15 });
    const wrapper = mount(JobListing, createConfig(jobProps));
    const jobPageLink = wrapper.findComponent(RouterLinkStub);
    const toProp = jobPageLink.props("to");
    expect(toProp).toBe("/jobs/results/15");
  });
});

// ======== DEPRECATED TESTS WITH JAVASCRIPT ========
// describe("JobListing", () => {
//   const createJobProps = (jobProps = {}) => ({
//     title: "Vue Developer",
//     organization: "AirBnB",
//     locations: ["Buenos Aires"],
//     minimumQualifications: ["Develop"],
//     ...jobProps, //because of this we can keep adding props for individual testing
//   });
//   // what we do in createJobProps is isolate each property, so if I pass an object
//   // where jobProps should go, where the title or organization is different, it
//   // overwrites the different one but keeps all the others exactly the same

//   const createConfig = (jobProps) => ({
//     props: {
//       job: {
//         ...jobProps, //also destructuring in this function for same reason
//       },
//     },
//     global: {
//       stubs: {
//         routerLink: RouterLinkStub,
//       },
//     },
//   });

//   it("renders job title", () => {
//     const jobProps = createJobProps({ title: "Vue Programmer" });
//     const wrapper = mount(JobListing, createConfig(jobProps));
//     expect(wrapper.text()).toMatch("Vue Programmer");
//   });

//   it("renders job organization", () => {
//     const jobProps = createJobProps({ organization: "Airbnb" });
//     const wrapper = mount(JobListing, createConfig(jobProps));
//     expect(wrapper.text()).toMatch("Airbnb");
//   });

//   it("renders job locations", () => {
//     const jobProps = createJobProps({ locations: ["London", "New York"] });
//     const wrapper = mount(JobListing, createConfig(jobProps));
//     expect(wrapper.text()).toMatch("London");
//     expect(wrapper.text()).toMatch("New York");
//   });

//   it("renders qualifications", () => {
//     const jobProps = createJobProps({
//       minimumQualifications: ["Testing", "QA"],
//     });
//     const wrapper = mount(JobListing, createConfig(jobProps));
//     expect(wrapper.text()).toMatch("Testing");
//     expect(wrapper.text()).toMatch("QA");
//   });
//   it("links individual job's page", () => {
//     const jobProps = createJobProps({ id: "15" });
//     const wrapper = mount(JobListing, createConfig(jobProps));
//     // this approach wont work
//     // const jobPageLink = wrapper.find("[data-test='job-page-link']");
//     // const toProp = jobPageLink.props("to");
//     // expect(toProp).toBe("/jobs/results/15");
//     const jobPageLink = wrapper.findComponent(RouterLinkStub);
//     const toProp = jobPageLink.props("to");
//     expect(toProp).toBe("/jobs/results/15");
//   });
// });

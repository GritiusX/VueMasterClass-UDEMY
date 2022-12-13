// import { shallowMount } from "@vue/test-utils";

// import JobFiltersSidebar from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebar.vue"

// import { useUniqueJobTypes, useUniqueOrganizations } from "@/store/composables";
// jest.mock("@/store/composables");
// const useUniqueJobTypesMock = useUniqueJobTypes as jest.Mock;
// const useUniqueOrganizationsMock = useUniqueJobTypes as jest.Mock;

// describe("JobFiltersSidebar", () => {
//   it("it allow user to filter jobs by job types", () => {
//     useUniqueJobTypesMock.mockReturnValue(new Set(["full-time", "part-time"]));
//     useUniqueOrganizationsMock.mockReturnValue(new Set(["AirBnB"]));
//     const wrapper = shallowMount(JobFiltersSidebar);
//     //findComponent gets you the entire component but wrapped inside a jest Object
//     const jobTypesFilter = wrapper.findComponent(
//       "[data-test='job-types-filter']"
//     );
//     // @ts-ignore
//     const { header, uniqueValues, mutation } = jobTypesFilter.props();
//   });
//   // it("it allow user to filter jobs by organizations", () => {
//   //   const wrapper = shallowMount(JobFiltersSidebar)

//   // })
// });

// CANNOT BE COMPLETED THROUGH THE EXAMPLE GIVEN IN CLASS

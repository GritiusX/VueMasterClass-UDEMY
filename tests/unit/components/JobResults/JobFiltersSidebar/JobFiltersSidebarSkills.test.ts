import { shallowMount } from "@vue/test-utils";
import JobFiltersSidebarSkills from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarSkills.vue";

import { useStore } from "vuex";
jest.mock("vuex");
const useStoreMock = useStore as jest.Mock;

describe("JobFiltersSidebarSkills", () => {
  it("populates search input from store", () => {
    useStoreMock.mockReturnValue({
      state: {
        skillsSearchTerm: "Programmer",
      },
      commit: jest.fn(),
    });

    const wrapper = shallowMount(JobFiltersSidebarSkills);
    const skillsSearchInput = wrapper.find("[data-test='skills-search-input']");
    const inputElement = skillsSearchInput.element as HTMLInputElement; //this "as HTML..." is for typescript

    expect(inputElement.value).toBe("Programmer");
  });

  it("tells store that the user has entered skills search term", async () => {
    const commit = jest.fn();
    useStoreMock.mockReturnValue({
      state: {
        skillsSearchTerm: "Programmer",
      },
      commit,
    });

    const wrapper = shallowMount(JobFiltersSidebarSkills);
    const skillsSearchInput = wrapper.find("[data-test='skills-search-input']");
    await skillsSearchInput.setValue("Vue developer");

    expect(commit).toHaveBeenCalledWith(
      "UPDATE_SKILLS_SEARCH_TERM",
      "Vue developer"
    );
  });

  it("removes whitespace from user input", async () => {
    const commit = jest.fn();
    useStoreMock.mockReturnValue({
      state: {
        skillsSearchTerm: "Programmer",
      },
      commit,
    });

    const wrapper = shallowMount(JobFiltersSidebarSkills);
    const skillsSearchInput = wrapper.find("[data-test='skills-search-input']");
    await skillsSearchInput.setValue("          Vue developer     ");

    expect(commit).toHaveBeenCalledWith(
      "UPDATE_SKILLS_SEARCH_TERM",
      "Vue developer"
    );
  });
});

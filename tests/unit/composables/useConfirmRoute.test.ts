import { useRoute } from "vue-router";
jest.mock("vue-router");

import useConfirmRoute from "@/composables/useConfirmRoute";

const useRouteMock = useRoute as jest.Mock;

describe("useConfirmRoute", () => {
  it("determines if page route matches specified route", () => {
    useRouteMock.mockReturnValue({ name: "Home" }); //this will give back a MOCKED OBJECT so it's like having a ref({})
    const routeName = "Home";
    const result = useConfirmRoute(routeName);
    expect(result.value).toBe(true); //to access to the real value of the MOCKED OBJECT we need to do .value
  });
});

import nextElementInList from "@/utils/nextElementInList";

describe("nextElementInList", () => {
  it("locates element in list and return the next element in list", () => {
    const list = ["A", "B", "C", "D", "E"];
    const value = "C";
    const result = nextElementInList<string>(list, value);
    expect(result).toBe("D");
  });
  // in both tests we MUST provide the generic type of what will be inside de params
  // so it can be any type, string, numbers, booleans, etc
  describe("when element is at the end of the list", () => {
    it("locates next element at the start of the list", () => {
      const list = ["A", "B", "C", "D", "E"];
      const value = "E";
      const result = nextElementInList<string>(list, value);
      expect(result).toBe("A");
    });
  });
});

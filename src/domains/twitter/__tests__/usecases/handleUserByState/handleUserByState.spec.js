import { describe, beforeEach, test, expect } from "vitest";
import { mockBaseFn, mockThrwoErrorNoFn, mockAPIResponse } from "./index";

describe("Usecase: handleUserByState", () => {
  test("should throw new Error with message: Usecase > handleUserTypes > HTTP method is not a funtionn", async () => {
    expect.assertions(2);
    try {
      await mockThrwoErrorNoFn({
        request: { urls: ["http://mock_url"] },
        params: {
          value: "param",
        },
      });
    } catch (e) {
      expect(typeof e).toBe("object");
      expect(e.message).toBe("Usecase > handleUserTypes > HTTP method is not a funtion");
    }
  });
});

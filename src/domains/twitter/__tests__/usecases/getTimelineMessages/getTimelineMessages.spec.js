import { describe, beforeEach, test, expect } from "vitest";
import { mockBaseFn, mockThrwoErrorNoFn } from "./index";

describe("Usecase: getTimelineMessages", () => {
  test('should throw new Error with message: "getTimelineMessages > check that all required params exist', async () => {
    expect.assertions(2);
    try {
      await mockBaseFn({});
    } catch (e) {
      expect(typeof e).toBe("object");
      expect(e.message).toBe("Usecase > getTimelineMessages > check that all required params exist");
    }
  });

  test('should throw new Error with message: "Usecase > getTimelineMessages > HTTP get is not a funtion', async () => {
    expect.assertions(2);
    try {
      await mockThrwoErrorNoFn({
        url: "http://mock_url",
        params: {
          value: "param",
        },
      });
    } catch (e) {
      expect(typeof e).toBe("object");
      expect(e.message).toBe("Usecase > getTimelineMessages > HTTP get is not a funtion");
    }
  });
});

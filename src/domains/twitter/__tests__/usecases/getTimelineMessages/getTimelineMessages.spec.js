import { describe, beforeEach, test, expect } from "vitest";
import { mockBaseFn, mockThrwoErrorNoFn } from "./index";

describe("Usecase: getTimelineMessages", () => {
  let $notify;
  let noItemsFond = "Sorry! No items found";

  const handler = {
    set: function (target, prop, value) {
      // eslint-disable-next-line no-param-reassign
      return Reflect.set(target, prop, value);
    },
  };
  beforeEach(() => {
    $notify = new Proxy({ message: null }, handler);
  });
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
        request: { url: "http://mock_url" },
        params: {
          value: "param",
        },
      });
    } catch (e) {
      expect(typeof e).toBe("object");
      expect(e.message).toBe("Usecase > getTimelineMessages > HTTP get is not a funtion");
    }
  });

  test("should notify to user when response API length === 0", async () => {
    await mockBaseFn({
      request: { url: "http://noData.response" },
      onInfoState: {
        $notify,
      },
    });

    expect($notify.message).toBe(noItemsFond);
  });

  test.only("should notify correct message when receive API response and save data in store ", async () => {});
});

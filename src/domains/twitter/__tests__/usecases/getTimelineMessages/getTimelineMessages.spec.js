import { describe, beforeEach, test, expect } from "vitest";
import { mockBaseFn, mockThrwoErrorNoFn, mockAPIResponse } from "./index";

describe("Usecase: getTimelineMessages", () => {
  let $store;
  let $notify;
  let noItemsFound = "Sorry! No items found";
  let itemsFound = "Items founded";
  let module = "users";

  const handler = {
    set: function (target, prop, value) {
      // eslint-disable-next-line no-param-reassign
      return Reflect.set(target, prop, value);
    },
  };
  beforeEach(() => {
    $store = new Proxy({ module: { users: {} } }, handler);
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
        request: { urls: ["http://mock_url"] },
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
      request: { urls: ["http://noData.response"] },
      onInfoState: {
        $notify,
      },
    });

    expect($notify.message).toBe(noItemsFound);
  });

  test("should notify correct message when receive API response and save correct sorted data in store ", async () => {
    await mockBaseFn({
      request: { urls: ["http://mock_url"] },
      onInfoState: {
        $notify,
        message: itemsFound,
      },
      $store,
      $moduleName: module,
    });

    const selectedNode = $store.module[module].find((node) => node.name === "me");
    expect(Object.keys($store.module[module])).toHaveLength(mockAPIResponse.length);
    expect(typeof $store.module[module]).toBe("object");
    expect($store.module[module].indexOf(selectedNode)).toBe(0);
  });
});

import { describe, beforeEach, test, expect } from "vitest";
import { mockBaseFn, mockThrwoErrorNoFn } from "./index";

describe("Usecase: handleUserByState", () => {
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

  test("should throw new Error with message: Usecase > handleUserByState > check that all required params exist", async () => {
    expect.assertions(2);
    const { getUserByOwnState } = mockBaseFn();
    try {
      await getUserByOwnState({});
    } catch (e) {
      expect(typeof e).toBe("object");
      expect(e.message).toBe("Usecase > handleUserByState > check that all required params exist");
    }
  });

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

  test("should notify to user when response API length === 0", async () => {
    const { getUserByOwnState } = mockBaseFn();
    await getUserByOwnState({
      request: { url: "http://noData.response" },
      onInfoState: {
        $notify,
      },
    });

    expect($notify.message).toBe(noItemsFound);
  });

  test("should notify correct message when receive API response and save correct sorted data in store ", async () => {
    const { getUserByOwnState } = mockBaseFn();
    await getUserByOwnState({
      request: { url: "http://mock_url" },
      onInfoState: {
        $notify,
        message: itemsFound,
      },
      $store,
      $moduleName: module,
    });

    expect(Object.keys($store.module[module])).toHaveLength(1);
    expect(typeof $store.module[module]).toBe("object");
  });
});

import { describe, beforeEach, test, expect } from "vitest";

// pinia store
import { setActivePinia, createPinia } from "pinia";
import { useCosmeticStore } from "@/app/stores/cosmetic";
import { GET_LOADER_STATE } from "@/app/stores/cosmetic/getters";
import { CHANGE_LOADER_STATE } from "@/app/stores/cosmetic/actions";

// service
import Store from "../store.services";

describe("Service: store", () => {
  let store;
  let cosmeticStore;
  beforeEach(() => {
    setActivePinia(createPinia());
    store = new Store();
    cosmeticStore = useCosmeticStore();
  });

  test("should return error if store param no exist", async () => {
    const { storeData } = store;
    expect.assertions(2);
    try {
      await storeData({});
    } catch (e) {
      expect(typeof e).toBe("object");
      expect(e.message).toBe("Store is required");
    }
  });

  test("should return error if $actionName param no exist", async () => {
    const { storeData } = store;
    expect.assertions(2);
    try {
      await storeData({ $store: cosmeticStore });
    } catch (e) {
      expect(typeof e).toBe("object");
      expect(e.message).toBe("Action name is required");
    }
  });

  test("should store correct data", async () => {
    const { storeData } = store;
    await storeData({
      $store: cosmeticStore,
      $actionName: CHANGE_LOADER_STATE,
      params: { state: true },
    });

    expect(cosmeticStore[GET_LOADER_STATE].state).toBe(true);
  });
});

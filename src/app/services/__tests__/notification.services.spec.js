import { describe, beforeEach, test, expect } from "vitest";

// pinia store
import { setActivePinia, createPinia } from "pinia";
import { useCosmeticStore } from "@/app/stores/cosmetic";
import { GET_LOADER_STATE, GET_NOTIFICATION_MODE } from "@/app/stores/cosmetic/getters";

// service
import Notification from "../notification.services";

describe("Service: notification", () => {
  let notification;
  let cosmeticStore;
  beforeEach(() => {
    setActivePinia(createPinia());
    notification = new Notification();
    cosmeticStore = useCosmeticStore();
  });

  test("should store correct loader state", async () => {
    const { hasLoader } = notification;
    hasLoader({ state: true });
    expect(cosmeticStore[GET_LOADER_STATE].state).toBe(true);
  });

  test("should store correct notification state", async () => {
    const { hasNotification } = notification;
    const notifyState = { uuid: "000", type: "info", message: "Sorry! No items found" };
    await hasNotification(notifyState);
    expect(cosmeticStore[GET_NOTIFICATION_MODE]).toEqual([notifyState]);
    expect(cosmeticStore[GET_NOTIFICATION_MODE].length).toBeGreaterThan(0);
  });
});

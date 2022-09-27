import { defineStore } from "pinia";
import { BASE_COSMETIC_STORE } from "@/app/partials/constants";

// actions
import { CHANGE_LOADER_STATE, CHANGE_NOTIFICATION_STATE, REMOVE_NOTIFICATION } from "./actions";

// getters
import getters from "./getters";

export const useCosmeticStore = defineStore({
  id: "cosmetic",
  state: () => BASE_COSMETIC_STORE,

  actions: {
    [CHANGE_LOADER_STATE]({ state = false }) {
      this.hasLoader.state = state;
    },

    [CHANGE_NOTIFICATION_STATE]({ uuid = null, type = null, message = "notification" }) {
      this.hasNotification = [
        ...this.hasNotification,
        {
          uuid,
          type,
          message,
        },
      ];
    },
    [REMOVE_NOTIFICATION]({ uuid = null }) {
      if (!uuid) return;
      this.hasNotification = this.hasNotification.filter((node) => node.uuid !== uuid);
    },
  },

  getters,
});

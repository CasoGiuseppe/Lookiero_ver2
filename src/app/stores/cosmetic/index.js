import { defineStore } from "pinia";
import { BASE_COSMETIC_STORE } from "@/app/partials/constants";

// actions
import { CHANGE_LOADER_STATE, CHANGE_NOTIFICATION_STATE } from "./actions";

// getters
import getters from "./getters";

export const useCosmeticStore = defineStore({
  id: "cosmetic",
  state: () => BASE_COSMETIC_STORE,

  actions: {
    [CHANGE_LOADER_STATE]({ state = false }) {
      this.hasLoader.state = state;
    },

    [CHANGE_NOTIFICATION_STATE]({ state = false, type = null, message = "notification" }) {
      this.hasNotification.state = state;
      this.hasNotification.type = type;
      this.hasNotification.message = message;
    },
  },

  getters,
});

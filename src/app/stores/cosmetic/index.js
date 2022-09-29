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
    /**
     * Action to change loader state
     * @param {boolean} state - set loader state
     * @return {void}
     */
    [CHANGE_LOADER_STATE]({ state = false }) {
      this.hasLoader.state = state;
    },

    /**
     * Action to set notification state
     * @param {string} uuid - unique notification modal id
     * @param {string} type - set notification type
     * @param {string} message - set message to show
     * @return {void}
     */
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

    /**
     * Action to remove notification from store
     * @param {string} uuid - unique notification modal id
     * @return {void}
     */
    [REMOVE_NOTIFICATION]({ uuid = null }) {
      if (!uuid) return;
      this.hasNotification = this.hasNotification.filter((node) => node.uuid !== uuid);
    },
  },

  getters,
});

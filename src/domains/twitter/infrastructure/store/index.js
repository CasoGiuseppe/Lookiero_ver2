import { defineStore } from "pinia";
import { BASE_USERS_STORE } from "../partials/constants";

// actions
import { CHANGE_USERS_LIST } from "./actions";

// getters
import getters from "./getters";

export const useTwitterStore = defineStore({
  id: "twitter",
  state: () => BASE_USERS_STORE,

  actions: {
    [CHANGE_USERS_LIST](list) {
      this.timeline = [...this.timeline, ...list];
    },
  },

  getters,
});

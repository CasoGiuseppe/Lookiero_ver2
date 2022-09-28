import { defineStore } from "pinia";
import { BASE_USERS_STORE } from "../partials/constants";

// actions
import { CHANGE_USERS_LIST, CHANGE_USER_STATE, UPDATE_USER_STATE, CHANGE_SELECTED_USER } from "./actions";

// getters
import getters from "./getters";

export const useTwitterStore = defineStore({
  id: "twitter",
  state: () => BASE_USERS_STORE,

  actions: {
    [CHANGE_USERS_LIST](list) {
      this.timeline = list;
    },

    [CHANGE_USER_STATE]({ list = [] }) {
      this.users = list;
    },

    [UPDATE_USER_STATE]({ user = {} }) {
      const { id } = user;
      const temp = this.users.filter((node) => node.id !== id);
      this.users = [...temp, user];
    },

    [CHANGE_SELECTED_USER]({ user = {} }) {
      this.selected = user;
    },
  },

  getters,
});

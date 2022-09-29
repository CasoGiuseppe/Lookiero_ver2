import { defineStore } from "pinia";
import { BASE_USERS_STORE } from "../partials/constants";

// actions
import {
  CHANGE_USERS_LIST,
  CHANGE_USER_STATE,
  UPDATE_USER_STATE,
  CHANGE_SELECTED_USER,
  CHANGE_NEW_MESSAGE,
} from "./actions";

// getters
import getters from "./getters";

export const useTwitterStore = defineStore({
  id: "twitter",
  state: () => BASE_USERS_STORE,

  actions: {
    /**
     * Action to set timeline messages
     * @param {array} list - array of messages
     * @return {void}
     */
    [CHANGE_USERS_LIST](list = []) {
      this.timeline = list;
    },

    /**
     * Action to set users list
     * @param {array} list - array of users
     * @return {void}
     */
    [CHANGE_USER_STATE]({ list = [] } = {}) {
      this.users = list;
    },

    /**
     * Action to update users following state
     * @param {object} user - object with new user state
     * @return {void}
     */
    [UPDATE_USER_STATE]({ user = {} } = {}) {
      const { id } = user;
      const temp = this.users.filter((node) => node.id !== id);
      this.users = [...temp, user];
    },

    /**
     * Action to set selected user on user selection
     * @param {object} user - object with selected user data
     * @return {void}
     */
    [CHANGE_SELECTED_USER]({ user = {} } = {}) {
      this.selected = user;
    },

    /**
     * Action to set new message
     * @param {string} message - new use message
     * @return {void}
     */
    [CHANGE_NEW_MESSAGE]({ message = undefined } = {}) {
      this.newMessage = message;
    },
  },

  getters,
});

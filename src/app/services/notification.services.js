import { createPinia } from "pinia";
import { useCosmeticStore } from "../stores/cosmetic";
import { CHANGE_LOADER_STATE, CHANGE_NOTIFICATION_STATE } from "../stores/cosmetic/actions";

// set pinia
const store = createPinia();
const cosmeticStore = useCosmeticStore(store);
export default class Notification {
  /**
   * handle loader
   * @param {state} - boolean to set loader state
   * @returns { void }
   */
  hasLoader({ state = false } = {}) {
    cosmeticStore[CHANGE_LOADER_STATE]({ state });
  }
  /**
   * handle notification (error/info)
   * @param {array} args - all needed parameters that method can receive
   * @returns {void}
   */
  hasNotification(...args) {
    cosmeticStore[CHANGE_NOTIFICATION_STATE](...Object.values(args));
  }
}

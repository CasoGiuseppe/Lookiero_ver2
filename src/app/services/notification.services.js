import { createPinia } from "pinia";
import { useCosmeticStore } from "../stores/cosmetic";
import { CHANGE_LOADER_STATE } from "../stores/cosmetic/actions";

// set pinia
const store = createPinia();
const cosmeticStore = useCosmeticStore(store);
class Notification {
  /**
   * @param {state} - boolean to set loader state
   * @returns { void }
   */
  hasLoader({ state = false } = {}) {
    cosmeticStore[CHANGE_LOADER_STATE]({ state });
  }
  onError({ state, message = "error" }) {
    console.log(`error ${state}, ${message}`);
  }
  onInfo() {
    return "info";
  }
}

const { hasLoader, onError, onInfo } = new Notification();
export { hasLoader, onError, onInfo };

class Notification {
  /**
   * @param {state} - boolean to set loader state
   * @returns { void }
   */
  hasLoader({ state } = {}) {
    console.log(`loader ${state}`);
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

class Notification {
  /**
   * @param {state} - boolean to set loader state
   * @returns { void }
   */
  hasLoader({ state }) {
    return `loader ${state}`;
  }
  hasError() {
    return "error";
  }
  hasInfo() {
    return "info";
  }
}

const { hasLoader, hasError, hasInfo } = new Notification();
export { hasLoader, hasError, hasInfo };

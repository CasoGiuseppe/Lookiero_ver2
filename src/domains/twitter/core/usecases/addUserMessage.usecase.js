/**
 * usecase to add new message
 * @param {function} post - HTTP function to get API endpoint response
 * @param {function} hasLoader - method to handle loader
 * @param {function} hasNotification - method to handle user notification
 * @returns {Array}
 */
export const addUserMessage =
  ({ HTTP: { post }, services: { notifications: { hasLoader, hasNotification } = {} } }) =>
  /**
   * @param {array} urls - urls collection that is used to get correct response
   * @param {array} params - optionals parameters that are used in endpoint get
   * @param {array} args - optionals parameters that are used in usecase
   */
  async ({ request: { url = undefined, ...params } = {}, ...args } = {}) => {
    // 0. handle error
    // 0.1 check if HTTP post is a function
    if (typeof post !== "function") throw new Error("Usecase > addUserMessage > HTTP post is not a funtion");

    // 0.2 check if all required params exist
    const requiredOnFail = [url !== undefined].some((key) => key === false);
    if (requiredOnFail) throw new Error("Usecase > getTimelineMessages > check that all required params exist");
  };

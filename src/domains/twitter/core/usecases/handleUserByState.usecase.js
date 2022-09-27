/**
 * usecase to handle user own state [following, no following]
 * @param {function} get - HTTP function to get API endpoint response
 * @param {function} patch - HTTP function to patch API endpoint response
 * @param {function} hasLoader - method to handle loader
 * @param {function} hasNotification - method to handle user notification
 * @returns {Array}
 */
export const handleUserByState =
  ({
    HTTP: { get },
    services: {
      notifications: { hasLoader, hasNotification },
    },
  }) =>
  () => {
    // 0. handle error
    // 0.1 check if HTTP patch or get are a function
    const requiredHTTPMethods = [typeof get === "function"].some((key) => key === false);
    if (requiredHTTPMethods) throw new Error("Usecase > handleUserTypes > HTTP method is not a funtion");

    /**
     * get users by own state
     * @param {string} url - url sting with endpoint path
     * @param {array} params - optionals parameters that are used in endpoint get
     * @param {array} args - optionals parameters that are used in usecase
     */
    const getUserByOwnState = async ({ request: { url = undefined, ...params } = {}, ...args }) => {
      // 0. handle error
      // 0.2 check if all required params exist
      const requiredOnFail = [url !== undefined, Object.keys(params).lenght !== 0].some((key) => key === false);
      if (requiredOnFail) throw new Error("Usecase > handleUserByState > check that all required params exist");

      const { onErrorState, onInfoState, ...rest } = args;
      console.log(args);
      // 2. launch endpoint get to return all users by gived type
      try {
        // 2.1 launch loader to wait endpoint response
        hasLoader ? hasLoader({ state: true }) : null;

        // 2.2 launch API endpoint
        const response = await get(url);

        console.log(response);

        // 2.7 notify to user successfully
        hasNotification ? hasNotification(onInfoState || { state: true, type: "info", message: "notification" }) : null;
      } catch ({ message }) {
        // 3. handle response erro
        hasNotification ? hasNotification(onErrorState || { state: true, type: "error", message }) : null;
        throw new Error(message);
      } finally {
        // 4. delete loader state
        hasLoader ? hasLoader({ state: false }) : null;
      }
    };

    return { getUserByOwnState };
  };

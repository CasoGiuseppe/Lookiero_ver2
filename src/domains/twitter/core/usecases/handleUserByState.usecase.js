/**
 * usecase to handle user own state [following, no following]
 * @param {function} get - HTTP function to get API endpoint response
 * @param {function} patch - HTTP function to patch API endpoint response
 * @param {function} hasLoader - method to handle loader
 * @param {function} hasNotification - method to handle user notification
 * @param {Class} IUsers - class interface to transform response
 * @returns {Array}
 */
export const handleUserByState =
  ({
    HTTP: { get, patch },
    services: { notifications: { hasLoader, hasNotification } = {}, store: { onStore } = {} },
    modelCollecion: { IUsers } = {},
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
    const getUserByOwnState = async ({ request: { url = undefined } = {}, ...args }) => {
      // 0. handle error
      // 0.1 check if all required params exist
      const requiredOnFail = [url !== undefined].some((key) => key === false);
      if (requiredOnFail) throw new Error("Usecase > handleUserByState > check that all required params exist");

      // 0.2 check if models are classes
      const requiredClasses = [IUsers.prototype];
      if (requiredClasses.some((node) => node === undefined))
        throw new Error("Usecase > handleUserByState > All models should be a class");

      const { onErrorState, onInfoState, ...rest } = args;

      // 2. launch endpoint get to return all users by gived type
      try {
        // 2.1 launch loader to wait endpoint response
        hasLoader ? hasLoader({ state: true }) : null;

        // 2.2 launch API endpoint
        const response = await get(url);

        // 2.3 checkif response is empty
        // 2.4 exit from function
        // 2.5 notify to user
        if (response.length === 0) {
          hasNotification
            ? hasNotification(
                onInfoState
                  ? { ...onInfoState, ...{ message: "Sorry! No items found", type: "info" } }
                  : { type: "info", message: "Sorry! No items found" }
              )
            : null;
          return;
        }

        // 2.6 notify to user successfully
        hasNotification
          ? hasNotification(
              { ...onInfoState, ...{ type: "info" } } || { uuid: "000", type: "info", message: "notification" }
            )
          : null;

        // 2.7 stored data
        if (!onStore) return;
        onStore({
          ...rest,
          params: {
            list: response.map((node) => new IUsers(node)).filter((node) => node.following !== undefined),
          },
        });
      } catch ({ message }) {
        // 3. handle response erro
        hasNotification
          ? hasNotification(
              { ...onErrorState, ...{ type: "error", message } } || { uuid: "000", type: "error", message }
            )
          : null;
        throw new Error(message);
      } finally {
        // 4. delete loader state
        hasLoader ? hasLoader({ state: false }) : null;
      }
    };

    /**
     * change user state
     * @param {string} url - url sting with endpoint path
     * @param {array} params - optionals parameters that are used in endpoint get
     * @param {array} args - optionals parameters that are used in usecase
     */
    const changeUserState = async ({ request: { url = undefined, ...params } = {}, ...args }) => {
      // 0. handle error
      // 0.1 check if all required params exist
      const requiredOnFail = [url !== undefined].some((key) => key === false);
      if (requiredOnFail) throw new Error("Usecase > handleUserByState > check that all required params exist");

      const { onErrorState, onInfoState, callbacks } = args;

      // 2. launch endpoint get to return all users by gived type
      try {
        // 2.1 launch loader to wait endpoint response
        hasLoader ? hasLoader({ state: true }) : null;

        // 2.2 launch patch to update user state in API
        await patch(url, params);

        // 2.3 call callback method when patch has response
        if (!callbacks) return;
        console.log(callbacks);
        Promise.all(callbacks.map(async (callback) => await callback()));

        // 2.4 notify to user successfully
        hasNotification
          ? hasNotification(
              { ...onInfoState, ...{ type: "info" } } || { uuid: "000", type: "info", message: "notification" }
            )
          : null;
      } catch ({ message }) {
        // 3. handle response erro
        hasNotification
          ? hasNotification(
              { ...onErrorState, ...{ type: "error", message } } || { uuid: "000", type: "error", message }
            )
          : null;
        throw new Error(message);
      } finally {
        // 4. delete loader state
        hasLoader ? hasLoader({ state: false }) : null;
      }
    };

    return { getUserByOwnState, changeUserState };
  };

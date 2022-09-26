export const getUsersByValue =
  ({ HTTP: { get }, notifications: { hasLoader, hasNotification }, store: { onStore } }) =>
  async ({ request: { url = undefined, ...params }, ...args } = {}) => {
    // 0. handle error
    // 0.1 check if HTTP get is a function
    if (typeof get !== "function") throw new Error("Usecase > getTwitterUsers > HTTP get is not a funtion");

    // 0.2 check if all required params exist
    const requiredOnFail = [url !== undefined, Object.keys(params).lenght !== 0].some((key) => key === false);
    if (requiredOnFail) throw new Error("Usecase > getTwitterUsers > check that all required params exist");

    const { onErrorState, onInfoState, ...rest } = args;

    // 2. launch endpoint get to return all users
    try {
      // 2.1 launch loader to wait endpoint response
      hasLoader ? hasLoader({ state: true }) : null;

      // 2.2 launch API endpoint
      const response = await get(url, ...Object.values(params));

      // 2.3 notify to user successfully
      hasNotification ? hasNotification(onInfoState || { message: "notification" }) : null;

      // 2.4 stored data
      onStore
        ? onStore({
            ...rest,
            params: response,
          })
        : null;
    } catch ({ message }) {
      // 3. handle response erro
      hasNotification ? hasNotification(onErrorState || { message }) : null;
      throw new Error(message);
    } finally {
      // 4. delete loader state
      hasLoader ? hasLoader({ state: false }) : null;
    }
  };

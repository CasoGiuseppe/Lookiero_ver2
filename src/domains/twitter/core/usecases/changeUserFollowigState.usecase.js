export const changeUserFollowigState =
  ({ HTTP: { patch }, notifications: { hasLoader, onError } }) =>
  async ({ request: { url = undefined, ...params }, onErrorState = undefined }) => {
    // 0. handle error
    // 0.1 check if HTTP patch is a function
    if (typeof patch !== "function") throw new Error("Usecase > changeUserFollowigState > HTTP patch is not a funtion");

    // 0.2 check if all required params exist
    const requiredOnFail = [url !== undefined, Object.keys(params).lenght !== 0].some((key) => key === false);
    if (requiredOnFail) throw new Error("Usecase > changeUserFollowigState > check that all required params exist");

    // 2. launch endpoint get to return all users
    try {
      // 2.1 launch loader to wait endpoint response
      hasLoader({ state: true });
      return await patch(url, ...Object.values(params));
    } catch ({ message }) {
      // 2.1 handle response erro
      onError({ state: true, message: onErrorState || message });
      throw new Error(message);
    } finally {
      // 2.2 delete loader state
      hasLoader({ state: false });
    }
  };

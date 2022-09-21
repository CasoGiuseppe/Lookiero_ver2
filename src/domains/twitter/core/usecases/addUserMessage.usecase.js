export const addUserMessage =
  ({ HTTP: { post }, notifications: { hasLoader, onError } }) =>
  async ({ request: { url = undefined, message = undefined }, onErrorState = undefined }) => {
    // 0. handle error
    // 0.1 check if HTTP post is a function
    if (typeof post !== "function") throw new Error("Usecase > addUserMessage > HTTP post is not a funtion");

    // 0.2 check if all required params exist
    const requiredOnFail = [url, message].some((key) => key === undefined);
    if (requiredOnFail) throw new Error("Usecase > addUserMessage > check that all required params exist");

    // 1. launch loader to wait endpoint response
    hasLoader({ state: "true" });

    // 2. launch endpoint get to return all users
    try {
      return await post(url, message);
    } catch ({ message }) {
      // 2.1 handle response erro
      onError({ state: true, message: onErrorState || message });
      throw new Error(message);
    } finally {
      // 2.2 delete loader state
      hasLoader({ state: "false" });
    }
    // 3. call callback funciton to save response in store
  };

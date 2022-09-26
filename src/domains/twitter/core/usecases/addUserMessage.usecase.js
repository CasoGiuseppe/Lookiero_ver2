export const addUserMessage =
  ({ HTTP: { post }, notifications: { hasLoader, hasError } }) =>
  async ({ request: { url = undefined, ...params }, ...args }) => {
    // 0. handle error
    // 0.1 check if HTTP post is a function
    if (typeof post !== "function") throw new Error("Usecase > addUserMessage > HTTP post is not a funtion");

    // 0.2 check if all required params exist
    const requiredOnFail = [url !== undefined, Object.keys(params).lenght !== 0].some((key) => key === false);
    if (requiredOnFail) throw new Error("Usecase > addUserMessage > check that all required params exist");

    const { onErrorState } = args;

    // 2. launch endpoint get to return all users
    try {
      // 2.1 launch loader to wait endpoint response
      hasLoader ? hasLoader({ state: true }) : null;
      return await post(url, ...Object.values(params));
    } catch ({ message }) {
      // 2.1 handle response error
      hasError ? hasError(onErrorState || { message }) : null;
      throw new Error(message);
    } finally {
      // 2.2 delete loader state
      hasLoader ? hasLoader({ state: false }) : null;
    }
    // 3. call callback funciton to save response in store
  };

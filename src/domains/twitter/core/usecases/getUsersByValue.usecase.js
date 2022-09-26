export const getUsersByValue =
  ({ HTTP: { get }, notifications: { hasLoader, hasError } }) =>
  async ({ request: { url = undefined, ...params }, ...args } = {}) => {
    // 0. handle error
    // 0.1 check if HTTP get is a function
    if (typeof get !== "function") throw new Error("Usecase > getTwitterUsers > HTTP get is not a funtion");

    // 0.2 check if all required params exist
    const requiredOnFail = [url !== undefined, Object.keys(params).lenght !== 0].some((key) => key === false);
    if (requiredOnFail) throw new Error("Usecase > getTwitterUsers > check that all required params exist");

    const { onErrorState } = args;

    // 2. launch endpoint get to return all users
    try {
      // 2.1 launch loader to wait endpoint response
      hasLoader({ state: true });
      return await get(url, ...Object.values(params));
    } catch ({ message }) {
      console.log(onErrorState);
      // 2.1 handle response erro
      hasError ? hasError(onErrorState || { message }) : null;
      throw new Error(message);
    } finally {
      // 2.2 delete loader state
      hasLoader({ state: false });
    }
    // 3. call callback funciton to save response in store
  };

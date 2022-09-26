export const setUserNotification =
  ({ onError, onInfo, onLoader }) =>
  () => {
    const onErrorMessage = (...args) => {
      // 0. handle errors
      // 0.1 check if error method exist
      const requiredFail = [onError].some((key) => key === undefined);
      if (requiredFail) throw new Error("UseCase > setUserNotification > check that all required params exist");
      onError(...args);
    };

    const onInfoMessage = (...args) => {
      // 0. handle errors
      // 0.1 check if info method exist
      const requiredFail = [onInfo].some((key) => key === undefined);
      if (requiredFail) throw new Error("UseCase > setUserNotification > check that all required params exist");
      onInfo(...args);
    };

    const onLoaderState = (args) => {
      // 0. handle errors
      // 0.1 check if info method exist
      const requiredFail = [onLoader].some((key) => key === undefined);
      if (requiredFail) throw new Error("UseCase > setUserNotification > check that all required params exist");
      onLoader(args);
    };

    return {
      onErrorMessage,
      onInfoMessage,
      onLoaderState,
    };
  };

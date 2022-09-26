export const setUserNotification =
  ({ onNotification, onLoader }) =>
  () => {
    const onNotificationMessage = (...args) => {
      // 0. handle notificaion
      // 0.1 check if info method exist
      const requiredFail = [onNotification].some((key) => key === undefined);
      if (requiredFail) throw new Error("UseCase > setUserNotification > check that all required params exist");
      onNotification(...args);
    };

    const onLoaderState = (...args) => {
      // 0. handle errors
      // 0.1 check if info method exist
      const requiredFail = [onLoader].some((key) => key === undefined);
      if (requiredFail) throw new Error("UseCase > setUserNotification > check that all required params exist");
      onLoader(...args);
    };

    return {
      onNotificationMessage,
      onLoaderState,
    };
  };

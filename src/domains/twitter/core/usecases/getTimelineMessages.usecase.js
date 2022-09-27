export const getTimelineMessages =
  ({
    HTTP: { get },
    services: {
      notifications: { hasLoader, hasNotification } = {},
      store: { onStore } = {},
      manipulator: { sortDates, getDifferentDates } = {},
    } = {},
    modelCollecion: { IUsers, IMessage } = {},
  }) =>
  async ({ request: { urls = [], ...params } = {}, ...args } = {}) => {
    // 0. handle error
    // 0.1 check if HTTP get is a function
    if (typeof get !== "function") throw new Error("Usecase > getTimelineMessages > HTTP get is not a funtion");

    // 0.2 check if all required params exist
    const requiredOnFail = [urls.length !== 0, Object.keys(params).lenght !== 0].some((key) => key === false);
    if (requiredOnFail) throw new Error("Usecase > getTimelineMessages > check that all required params exist");

    // 0.3 check if models are classes
    const requiredClasses = [IUsers.prototype, IMessage.prototype];
    if (requiredClasses.some((node) => node === undefined))
      throw new Error("Usecase > getTimelineMessages > All models should be a class");

    const { onErrorState, onInfoState, ...rest } = args;

    // 2. launch endpoint get to return all users
    try {
      // 2.1 launch loader to wait endpoint response
      hasLoader ? hasLoader({ state: true }) : null;

      // 2.2 launch API endpoint
      // 2.3 buil API aggregator to save in store
      const response = await (
        await Promise.all(urls.map((url) => get(url, ...Object.values(url.params || {}))))
      ).flat();

      // 2.4 checkif response is empty
      // 2.5 exit from function
      // 2.6 notify to user
      if (response.length === 0) {
        hasNotification
          ? hasNotification(
              onInfoState
                ? { ...onInfoState, ...{ message: "Sorry! No items found" } }
                : { state: true, type: "info", message: "Sorry! No items found" }
            )
          : null;
        return;
      }

      // 2.7 notify to user successfully
      hasNotification ? hasNotification(onInfoState || { state: true, type: "info", message: "notification" }) : null;

      // 2.8 stored sorted and manipulated data
      if (!onStore) return;
      onStore({
        ...rest,
        params: sortDates({
          obj: response
            .map((node) => {
              return node.messages.reduce((acc, item) => {
                return [
                  ...acc,
                  {
                    ...{ ...new IMessage(item), ...{ diffTime: getDifferentDates({ date: item.date }) } },
                    ...{ ...new IUsers(node) },
                  },
                ];
              }, []);
            })
            .flat(2),
        }),
      });
    } catch ({ message }) {
      // 3. handle response erro
      hasNotification ? hasNotification(onErrorState || { state: true, type: "error", message }) : null;
      throw new Error(message);
    } finally {
      // 4. delete loader state
      hasLoader ? hasLoader({ state: false }) : null;
    }
  };

/**
 * usecase to get sorted timeline messages
 * @param {function} get - HTTP function to get API endpoint response
 * @param {function} hasLoader - method to handle loader
 * @param {function} hasNotification - method to handle user notification
 * @param {function} onStore - method to handle store
 * @param {function} sortDates - method to manipulate response and get sorted result
 * @param {function} getDifferentDates - method to manipulate date
 * @param {Class} IUsers - class interface to transform response
 * @param {Class} IMessage - class interface to transform response
 * @returns {Array}
 */
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
  /**
   * @param {array} urls - urls collection that is used to get correct response
   * @param {array} params - optionals parameters that are used in endpoint get
   * @param {array} args - optionals parameters that are used in usecase
   */
  async ({ request: { urls = [] } = {}, ...args } = {}) => {
    // 0. handle error
    // 0.1 check if HTTP get is a function
    if (typeof get !== "function") throw new Error("Usecase > getTimelineMessages > HTTP get is not a funtion");

    // 0.2 check if all required params exist
    const requiredOnFail = [urls.length !== 0].some((key) => key === false);
    if (requiredOnFail) throw new Error("Usecase > getTimelineMessages > check that all required params exist");

    // 0.3 check if models are classes
    const requiredClasses = [IUsers.prototype, IMessage.prototype];
    if (requiredClasses.some((node) => node === undefined))
      throw new Error("Usecase > getTimelineMessages > All models should be a class");

    const { onErrorState, onInfoState, ...rest } = args;

    // 2. launch endpoint get to return all users by gived type
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
                ? { ...onInfoState, ...{ message: "Sorry! No items found", type: "info" } }
                : { type: "info", message: "Sorry! No items found" }
            )
          : null;
        return;
      }

      // 2.7 notify to user successfully
      hasNotification
        ? hasNotification(
            { ...onInfoState, ...{ type: "info" } } || { uuid: "000", type: "info", message: "notification" }
          )
        : null;

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
      hasNotification
        ? hasNotification({ ...onErrorState, ...{ type: "error", message } } || { uuid: "000", type: "error", message })
        : null;
      throw new Error(message);
    } finally {
      // 4. delete loader state
      hasLoader ? hasLoader({ state: false }) : null;
    }
  };

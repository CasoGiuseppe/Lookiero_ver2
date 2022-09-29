export const GET_LOADER_STATE = "getLoaderState";
export const GET_NOTIFICATION_MODE = "getNotificationState";

export default {
  [GET_LOADER_STATE]: (state) => state.hasLoader,
  [GET_NOTIFICATION_MODE]: (state) => {
    return state.hasNotification;
  },
};

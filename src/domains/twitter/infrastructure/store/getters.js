export const GET_TIMELINE_LIST = "getUsersList";
export const GET_USERS = "getUsers";
export const GET_SELECTED_USER = "getSelectedUser";
export const GET_NEW_MESSAGE = "getNewMessage";

export default {
  [GET_TIMELINE_LIST]: (state) => state.timeline,
  [GET_USERS]: (state) => state.users,
  [GET_SELECTED_USER]: (state) => state.selected,
  [GET_NEW_MESSAGE]: (state) => state.newMessage,
};

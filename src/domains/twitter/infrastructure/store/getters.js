export const GET_TIMELINE_LIST = "getUsersList";
export const GET_USERS = "getUsers";
export const GET_SELECTED_USER = "getSelectedUser";

export default {
  [GET_TIMELINE_LIST]: (state) => state.timeline,
  [GET_USERS]: (state) => state.users,
  [GET_SELECTED_USER]: (state) => state.selected,
};

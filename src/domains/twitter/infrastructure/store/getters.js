export const GET_TIMELINE_LIST = "getUsersList";
export const GET_USERS = "getUsers";

export default {
  [GET_TIMELINE_LIST]: (state) => state.timeline,
  [GET_USERS]: (state) => state.users,
};

export const GET_TIMELINE_LIST = "getUsersList";
export const GET_USERS = "getUsers";
export const GET_USERS_BY_TYPE = "getUsersByType";

export default {
  [GET_TIMELINE_LIST]: (state) => state.timeline,
  [GET_USERS]: (state) => state.users,
  [GET_USERS_BY_TYPE]() {
    return ({ type }) => {
      return this[GET_USERS][type];
    };
  },
};

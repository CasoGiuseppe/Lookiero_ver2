export const GENERIC_ERROR = "Ups! Something was wrong, please back to try";
export const API_SUCCESS = "Great! Operation completed successfully";
export const TIMELINE_SUCCESS = "Great! Timeline is load correctly";
export const TIMELINE_UPDATE_SUCCESS = (author) => `Great! Timeline is update correctly with ${author} messages`;
export const USER_FOLLOW_SUCCESS = "Users are load correctly";
export const USER_UPDATE_SUCCESS = "User state is update correctly";
export const BASE_NOTIFICATION_OBJ = ({ uuid, type, message }) => {
  return { uuid, type, message };
};

export const GENERIC_ERROR = "Ups! Something was wrong, please back to try";
export const API_SUCCESS = "Great! Operation completed successfully";
export const TIMELINE_SUCCESS = "Great! Timeline is load correctly";
export const USER_FOLLOW_SUCCESS = "Follow user are load correctly";
export const USER_FOLLOWING_SUCCESS = "Following user are load correctly";
export const BASE_NOTIFICATION_OBJ = ({ uuid, type, message }) => {
  return { uuid, type, message };
};

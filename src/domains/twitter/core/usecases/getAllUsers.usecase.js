export const getAllUsers =
  ({ notifications: { hasLoader } }) =>
  () => {
    return hasLoader();
  };

// usecases
import { UseHandleUserByState } from "@/domains/twitter/core";

// constants
import { API_BASE_PATH } from "@/app/partials/constants";
import { USER_FOLLOW_SUCCESS, USER_UPDATE_SUCCESS } from "@/app/partials/messages";
import { uuid } from "@/app/partials/helpers";

// store
import { useTwitterStore } from "@/domains/twitter/infrastructure/store";
import { CHANGE_USER_STATE, UPDATE_USER_STATE } from "@/domains/twitter/infrastructure/store/actions";

const { getUserByOwnState, changeUserState } = UseHandleUserByState();

/**
 * composable to share users show usecase
 * @param {boolean} notification - state of info notification
 * @returns { void }
 */
export const useUsersFollower = async ({ notification = true } = {}) => {
  await getUserByOwnState({
    request: { url: `${API_BASE_PATH}` },
    onErrorState: { uuid: uuid() },
    onInfoState: { uuid: uuid(), message: USER_FOLLOW_SUCCESS },
    notification,
    $store: useTwitterStore(),
    $actionName: CHANGE_USER_STATE,
  });
};

/**
 * composable to share users modify usecase
 * @param {boolean} state - value to set follow user state
 * @param {number} id - unique user ID
 * @param {array} callbasck - array of methods to call on operation end
 * @returns { void }
 */
export const useChangeUserFollower = async ({ state, id, callbacks }) => {
  await changeUserState({
    request: { url: `${API_BASE_PATH}id/${id}`, ...{ value: !state } },
    onErrorState: { uuid: uuid() },
    onInfoState: { uuid: uuid(), message: USER_UPDATE_SUCCESS },
    $store: useTwitterStore(),
    $actionName: UPDATE_USER_STATE,
    callbacks,
  });
};

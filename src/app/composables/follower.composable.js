// usecases
import { UseHandleUserByState } from "@/domains/twitter/core";

// constants
import { API_BASE_PATH } from "@/app/partials/constants";
import { USER_FOLLOW_SUCCESS, USER_FOLLOWING_SUCCESS } from "@/app/partials/messages";
import { uuid } from "@/app/partials/helpers";

// store
import { useTwitterStore } from "@/domains/twitter/infrastructure/store";
import { CHANGE_USER_STATE } from "@/domains/twitter/infrastructure/store/actions";

export const useUsersFollower = async () => {
  const { getUserByOwnState } = UseHandleUserByState();

  await getUserByOwnState({
    request: { url: `${API_BASE_PATH}following/false` },
    onErrorState: { uuid: uuid() },
    onInfoState: { uuid: uuid(), message: USER_FOLLOW_SUCCESS },
    $type: "follow",
    $store: useTwitterStore(),
    $actionName: CHANGE_USER_STATE,
  });

  await getUserByOwnState({
    request: { url: `${API_BASE_PATH}following/true` },
    onErrorState: { uuid: uuid() },
    onInfoState: { uuid: uuid(), message: USER_FOLLOWING_SUCCESS },
    $type: "following",
    $store: useTwitterStore(),
    $actionName: CHANGE_USER_STATE,
  });
};

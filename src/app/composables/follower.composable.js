// usecases
import { UseHandleUserByState } from "@/domains/twitter/core";

// constants
import { API_BASE_PATH } from "@/app/partials/constants";
import { USER_FOLLOW_SUCCESS } from "@/app/partials/messages";
import { uuid } from "@/app/partials/helpers";

// store
import { useTwitterStore } from "@/domains/twitter/infrastructure/store";
import { CHANGE_USER_STATE } from "@/domains/twitter/infrastructure/store/actions";

const { getUserByOwnState, changeUserState } = UseHandleUserByState();

export const useUsersFollower = async () => {
  await getUserByOwnState({
    request: { url: `${API_BASE_PATH}` },
    onErrorState: { uuid: uuid() },
    onInfoState: { uuid: uuid(), message: USER_FOLLOW_SUCCESS },
    $store: useTwitterStore(),
    $actionName: CHANGE_USER_STATE,
  });
};

export const useChangeUserFollower = async (id) => {
  await changeUserState({
    request: { url: `${API_BASE_PATH}id/${id}`, ...{ value: true } },
  });
};

// services
import { get, patch, post } from "@/app/services/http.services";
import { hasLoader, onError } from "@/app/services/notification.services";
// usecase
import { getUsersByValue } from "@/domains/twitter/core/usecases/getUsersByValue.usecase";
import { changeUserFollowigState } from "@/domains/twitter/core/usecases/changeUserFollowigState.usecase";
import { addUserMessage } from "@/domains/twitter/core/usecases/addUserMessage.usecase";

const notifications = { hasLoader, onError };

export const UseGetUsersByValue = getUsersByValue({
  HTTP: { get },
  notifications,
});

export const UseChangeUserState = changeUserFollowigState({
  HTTP: { patch },
  notifications,
});

export const UseAddUserMessage = addUserMessage({
  HTTP: { post },
  notifications,
});

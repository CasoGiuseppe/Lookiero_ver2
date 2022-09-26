// services
import { get, patch, post } from "@/app/services/http.services";
import Notification from "@/app/services/notification.services";
// usecase
import { getUsersByValue } from "@/domains/twitter/core/usecases/getUsersByValue.usecase";
import { changeUserFollowigState } from "@/domains/twitter/core/usecases/changeUserFollowigState.usecase";
import { addUserMessage } from "@/domains/twitter/core/usecases/addUserMessage.usecase";

const { hasLoader, hasError, hasInfo } = new Notification();

export const UseGetUsersByValue = getUsersByValue({
  HTTP: { get },
  notifications: { hasLoader, hasError },
});

export const UseChangeUserState = changeUserFollowigState({
  HTTP: { patch },
  notifications: { hasLoader, hasError },
});

export const UseAddUserMessage = addUserMessage({
  HTTP: { post },
  notifications: { hasLoader, hasError },
});

// services
import { get, patch, post } from "@/app/services/http.services";
import Notification from "@/app/services/notification.services";

// usecase
import { getUsersByValue } from "@/domains/twitter/core/usecases/getUsersByValue.usecase";
import { changeUserFollowigState } from "@/domains/twitter/core/usecases/changeUserFollowigState.usecase";
import { addUserMessage } from "@/domains/twitter/core/usecases/addUserMessage.usecase";
import { setUserNotification } from "@/app/usecases/setUserNotification.usecase";

const { hasLoader, hasError, hasInfo } = new Notification();
export const UseNotifications = setUserNotification({
  onError: hasError,
  onInfo: hasInfo,
  onLoader: hasLoader,
});
const { onErrorMessage, onInfoMessage, onLoaderState } = UseNotifications();
const notifications = { hasLoader: onLoaderState, hasError: onErrorMessage };

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

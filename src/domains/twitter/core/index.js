// services
import { get, patch, post } from "@/app/services/http.services";
import Notification from "@/app/services/notification.services";

// usecase
import { getUsersByValue } from "@/domains/twitter/core/usecases/getUsersByValue.usecase";
import { changeUserFollowigState } from "@/domains/twitter/core/usecases/changeUserFollowigState.usecase";
import { addUserMessage } from "@/domains/twitter/core/usecases/addUserMessage.usecase";
import { setUserNotification } from "@/app/usecases/setUserNotification.usecase";

const { hasLoader, hasNotification } = new Notification();
export const UseNotifications = setUserNotification({
  onNotification: hasNotification,
  onLoader: hasLoader,
});
const { onNotificationMessage, onLoaderState } = UseNotifications();
const notifications = { hasLoader: onLoaderState, hasNotification: onNotificationMessage };

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

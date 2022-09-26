// services
import { getService } from "@/domains/twitter/infrastructure/repositories/twitter.repository.js";
import Notification from "@/app/services/notification.services";
import Store from "@/app/services/store.services";

// usecase
import { getUsersByValue } from "@/domains/twitter/core/usecases/getUsersByValue.usecase";
import { changeUserFollowigState } from "@/domains/twitter/core/usecases/changeUserFollowigState.usecase";
import { addUserMessage } from "@/domains/twitter/core/usecases/addUserMessage.usecase";
import { setUserNotification } from "@/app/usecases/setUserNotification.usecase";

const { hasLoader, hasNotification } = new Notification();
const { storeData } = new Store();

export const UseNotifications = setUserNotification({
  onNotification: hasNotification,
  onLoader: hasLoader,
});
const { onNotificationMessage, onLoaderState } = UseNotifications();
const notifications = { hasLoader: onLoaderState, hasNotification: onNotificationMessage };

export const UseGetUsers = getUsersByValue({
  HTTP: { get: getService },
  notifications,
  store: { onStore: storeData },
});

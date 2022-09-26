// services
import { getService } from "@/domains/twitter/infrastructure/repositories/twitter.repository.js";
import Notification from "@/app/services/notification.services";
import Store from "@/app/services/store.services";

// usecase
import { getTimelineMessages } from "@/domains/twitter/core/usecases/getTimelineMessages.usecase";
import { changeUserFollowigState } from "@/domains/twitter/core/usecases/changeUserFollowigState.usecase";
import { addUserMessage } from "@/domains/twitter/core/usecases/addUserMessage.usecase";
import { setUserNotification } from "@/app/usecases/setUserNotification.usecase";

// model interfaces
import ITimeline from "@/domains/twitter/core/models/ITimeline.model";
import IMessage from "@/domains/twitter/core/models/IMessage.model";

const { hasLoader, hasNotification } = new Notification();
const { storeData } = new Store();

export const UseNotifications = setUserNotification({
  onNotification: hasNotification,
  onLoader: hasLoader,
});
const { onNotificationMessage, onLoaderState } = UseNotifications();
const notifications = { hasLoader: onLoaderState, hasNotification: onNotificationMessage };

export const UseGetTimelineMessages = getTimelineMessages({
  HTTP: { get: getService },
  notifications,
  store: { onStore: storeData },
  modelCollecion: { IUsers: ITimeline, IMessage },
});

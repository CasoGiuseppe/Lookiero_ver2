// services
import { getService, patchService } from "@/domains/twitter/infrastructure/repositories/twitter.repository.js";
import Notification from "@/app/services/notification.services";
import Store from "@/app/services/store.services";
import Date from "@/domains/twitter/infrastructure/services/date.manipulator.services";

// usecase
import { getTimelineMessages } from "@/domains/twitter/core/usecases/getTimelineMessages.usecase";
import { handleUserByState } from "@/domains/twitter/core/usecases/handleUserByState.usecase";
import { addUserMessage } from "@/domains/twitter/core/usecases/addUserMessage.usecase";

// model interfaces
import IUsers from "@/domains/twitter/core/models/IUsers.model";
import ITimeline from "@/domains/twitter/core/models/ITimeline.model";
import IMessage from "@/domains/twitter/core/models/IMessage.model";

const { hasLoader, hasNotification } = new Notification();
const { storeData } = new Store();
const { sortArrayByDate, getTimeBetweenDates } = new Date();
const notifications = { hasLoader: hasLoader, hasNotification: hasNotification };

export const UseGetTimelineMessages = getTimelineMessages({
  HTTP: { get: getService },
  services: {
    notifications,
    store: { onStore: storeData },
    manipulator: { sortDates: sortArrayByDate, getDifferentDates: getTimeBetweenDates },
  },
  modelCollecion: { IUsers: ITimeline, IMessage },
});

export const UseHandleUserByState = handleUserByState({
  HTTP: { get: getService },
  services: {
    notifications,
  },
  modelCollecion: { IUsers },
});

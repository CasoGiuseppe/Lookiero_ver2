import { getTimelineMessages } from "@/domains/twitter/core/usecases/getTimelineMessages.usecase";

// mock Classes
class MockTimeLine {
  constructor(payload = {}) {
    return payload;
  }
}

// mock API response
export const mockAPIResponse = [
  { owner: true, name: "me", messages: [{ date: new Date(), text: "text" }] },
  { owner: false, name: "you", messages: [{ date: "Jan 01 2022 12:00:00", text: "text" }] },
];
const mockPageResource = (url) => {
  const responseCases = {
    "http://mock_url": mockAPIResponse,
    "http://noData.response": [],
    "http://mock_throw_error": () => {
      throw new Error();
    },
  };
  return responseCases[url];
};

// mock services
const mockHasNotification = ({ $notify, message }) => {
  $notify.message = message;
};

const mockStore = ({ $store, $moduleName, params }) => {
  $store.module[$moduleName] = params;
};

// mock Date manipulator
const mockSort = ({ obj }) => obj.sort((prev, next) => new Date(next["date"]) - new Date(prev["date"]));
const mockDiff = ({ date }) => {
  const start = new Date();
  const end = new Date(date);
  return (start.getTime() - end.getTime()) / 1000;
};

const mockNotifications = { hasLoader: () => {}, hasNotification: mockHasNotification };
const mockManipulator = { sortDates: mockSort, getDifferentDates: mockDiff };
const mockModels = { IUsers: MockTimeLine, IMessage: MockTimeLine };

export const mockBaseFn = getTimelineMessages({
  HTTP: { get: mockPageResource },
  services: {
    notifications: mockNotifications,
    store: { onStore: mockStore },
    manipulator: mockManipulator,
  },
  modelCollecion: mockModels,
});

export const mockThrwoErrorNoFn = getTimelineMessages({
  HTTP: { get: null, patch: null },
});

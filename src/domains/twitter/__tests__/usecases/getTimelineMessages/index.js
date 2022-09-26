import { getTimelineMessages } from "@/domains/twitter/core/usecases/getTimelineMessages.usecase";

// mock Classes
class MockTimeLine {
  constructor(payload = {}) {
    return payload;
  }
}

// mock API response
const mockPageResource = (url) => {
  const responseCases = {
    "http://mock_url": { data: [{ param: "value" }] },
    "http://noData.response": { data: [] },
    "http://mock_throw_error": () => {
      throw new Error();
    },
  };
  return responseCases[url];
};

// mock services
const mockNotifications = { hasLoader: () => {}, hasNotification: () => {} };
const mockManipulator = { sortDates: () => {}, getDifferentDates: () => {} };
const mockModels = { IUsers: MockTimeLine, IMessage: MockTimeLine };
const mockStore = () => {};

export const mockBaseFn = getTimelineMessages({
  HTTP: { get: mockPageResource },
  services: {
    notifications: mockNotifications,
    store: { onStore: mockStore },
    manipulator: mockManipulator,
  },
  modelCollecion: mockModels,
});

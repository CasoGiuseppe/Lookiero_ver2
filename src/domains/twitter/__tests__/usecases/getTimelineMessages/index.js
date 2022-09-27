import { getTimelineMessages } from "@/domains/twitter/core/usecases/getTimelineMessages.usecase";

// mock Classes
class MockTimeLine {
  constructor(payload = {}) {
    return payload;
  }
}

// mock API response
const mockAPIResponse = [{ owner: "me", data: { name: "name" }, messages: [{ date: new Date(), text: "text" }] }];
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
  console.log(message);
  $notify.message = message;
};
const mockNotifications = { hasLoader: () => {}, hasNotification: mockHasNotification };
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

export const mockThrwoErrorNoFn = getTimelineMessages({
  HTTP: { get: null },
});

import { handleUserByState } from "@/domains/twitter/core/usecases/handleUserByState.usecase";

// mock Classes
class MockTimeLine {
  constructor(payload = {}) {
    return payload;
  }
}

// mock services
const mockHasNotification = ({ $notify, message }) => {
  $notify.message = message;
};

const mockStore = ({ $store, $moduleName, params }) => {
  $store.module[$moduleName] = params;
};

// mock API response
export const mockAPIResponse = [
  { owner: true, name: "me", following: undefined, messages: [{ date: new Date(), text: "text" }] },
  { owner: false, name: "you", following: true, messages: [{ date: "Jan 01 2022 12:00:00", text: "text" }] },
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

const mockNotifications = { hasLoader: () => {}, hasNotification: mockHasNotification };
const mockModels = { IUsers: MockTimeLine };

export const mockBaseFn = handleUserByState({
  HTTP: { get: mockPageResource, patch: mockPageResource },
  services: {
    notifications: mockNotifications,
    store: { onStore: mockStore },
  },
  modelCollecion: mockModels,
});

export const mockThrwoErrorNoFn = handleUserByState({
  HTTP: { get: null },
});

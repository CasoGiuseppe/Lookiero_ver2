export const HTTPHeader = {
  "Content-Type": "application/json;charset=UTF-8",
  "Access-Control-Allow-Origin": "*",
};

export const API_NAMESPACE = import.meta.env.VITE_APP_API_NAMESPACE;
export const BASE_COSMETIC_STORE = {
  hasLoader: {
    state: false,
  },
  hasNotification: {
    state: false,
    type: null,
    message: null,
  },
};

export const BASE_ENDPOINT = "people/";

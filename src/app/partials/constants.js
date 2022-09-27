export const HTTPHeader = {
  "Content-Type": "application/json;charset=UTF-8",
  "Access-Control-Allow-Origin": "*",
};

export const API_NAMESPACE = import.meta.env.VITE_APP_API_NAMESPACE;
export const API_ENDPOINT = import.meta.env.VITE_APP_API_ENDPOINT;
export const API_BASE_PATH = `${API_NAMESPACE}${API_ENDPOINT}`;
export const API_DELAY_MAX = 2300000000;
export const API_DELAY_MIN = 600;

export const BASE_COSMETIC_STORE = {
  hasLoader: {
    state: false,
  },
  hasNotification: [],
};

export const BASE_ENDPOINT = "people/";

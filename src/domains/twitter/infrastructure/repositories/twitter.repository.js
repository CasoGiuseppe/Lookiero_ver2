import { get } from "@/app/services/http.services";

/**
 * get service from an specific endpoint
 * @param {string} url - endpoint URL
 * @returns {void}
 */
export const getService = async (url, params = {}) => {
  if (!url) throw new Error("Url param is required");
  return await get(url, params);
};

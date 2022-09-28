/**
 * create unique uuid
 * @returns {string}
 */
export const uuid = () => Date.now().toString(36) + Math.random().toString(36).substring(2);

/**
 * create timeout
 * @param {number} ms - time to wait
 * @returns {Promise}
 */
export const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

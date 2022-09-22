class Http {
  /**
   * @param {string} url - endpoint url
   * @param  {array} params - all params that endpoint need ( if necessary )
   * @returns {object} - endpoint response
   */
  async get(url, ...params) {
    const response = await fetch(url, ...params);
    return await response.json();
  }

  /**
   * @param {string} url - endpoint url
   * @param  {any} value - new value to use in request
   * @returns {object} - endpoint response
   */
  async patch(url, value) {
    const response = await fetch(url, {
      method: "patch",
      body: value,
    });
    return await response.json();
  }

  /**
   * @param {string} url - endpoint url
   * @param  {any} value - new value to add
   * @returns {object} - endpoint response
   */
  async post(url, value) {
    const response = await fetch(url, {
      method: "post",
      body: JSON.stringify(value),
    });
    return await response.json();
  }
}

const { get, patch, post } = new Http();
export { get, patch, post };

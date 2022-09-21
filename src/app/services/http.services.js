class Http {
  /**
   * @param {string} url - endpoint url
   * @param  {array} params - all params that endpoint need ( if necessary )
   * @returns {void}
   */
  async get(url, ...params) {
    const response = await fetch(url, ...params);
    return await response.json();
  }

  async patch(url, value) {
    const response = await fetch(url, {
      method: "patch",
      body: value,
    });
    return await response.json();
  }
}

const { get, patch } = new Http();
export { get, patch };

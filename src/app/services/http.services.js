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
}

const { get } = new Http();
export { get };

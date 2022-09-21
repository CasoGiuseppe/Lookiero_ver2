class Http {
  async get(url, ...params) {
    const response = await fetch(url, ...params);
    return (await response.json());
  }
};

export default new Http()
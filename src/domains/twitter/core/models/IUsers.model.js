export default class IUsers {
  constructor(payload = {}) {
    this.name = payload.data.name;
    this.following = payload.data.following;
  }
}

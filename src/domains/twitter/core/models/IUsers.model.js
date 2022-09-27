export default class IUsers {
  constructor(payload = {}) {
    this.id = payload.id;
    this.name = payload.data.name;
    this.following = payload.following;
  }
}

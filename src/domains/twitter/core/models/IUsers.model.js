export default class IUsers {
  constructor(payload = {}) {
    this.id = payload.id;
    this.author = payload.data.name;
    this.following = payload.following;
  }
}

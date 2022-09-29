export default class IUsers {
  constructor(payload = {}) {
    this.id = payload.id || null;
    this.author = payload.data.name || null;
    this.following = payload.following || null;
  }
}

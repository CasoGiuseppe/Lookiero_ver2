export default class IMessage {
  constructor(payload = {}) {
    this.date = payload.date || null;
    this.message = payload.content || null;
  }
}

export default class IMessage {
  constructor(payload = {}) {
    this.author = payload.author || null;
    this.date = payload.date || null;
    this.message = payload.text || null;
  }
}

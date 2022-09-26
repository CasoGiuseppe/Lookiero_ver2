export default class ITimeline {
  constructor(payload = {}) {
    this.author = payload.data.name || null;
  }
}

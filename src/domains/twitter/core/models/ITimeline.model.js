import IEmbedd from "./IEmbedd.model";
export default class ITimeline {
  constructor(payload = {}) {
    this.id = payload.id || null;
    this.owner = payload.owner || false;
    this.author = new IEmbedd(payload)?.name || null;
  }
}

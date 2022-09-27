import IEmbedd from "./IEmbedd.model";
export default class ITimeline {
  constructor(payload = {}) {
    this.id = payload.id;
    this.author = new IEmbedd(payload)?.name || null;
  }
}

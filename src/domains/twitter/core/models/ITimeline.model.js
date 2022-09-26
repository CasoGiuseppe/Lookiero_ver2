import IEmbedd from "./IEmbedd.model";
export default class ITimeline {
  constructor(payload = {}) {
    this.author = new IEmbedd(payload)?.name || null;
  }
}

export class CustomEventDataPageMoveRoute {
  get repeat() {
    return this._repeat;
  }
  set repeat(value) {
    this._repeat = value;
  }
  get skippable() {
    return this._skippable;
  }
  set skippable(value) {
    this._skippable = value;
  }
  get wait() {
    return this._wait;
  }
  set wait(value) {
    this._wait = value;
  }
  get list() {
    return this._list;
  }
  set list(value) {
    this._list = value;
  }

  constructor() {
    this.initialize();
  }

  initialize() {
    this.repeat = true;
    this.skippable = false;
    this.wait = false;
    this.list = [{
      code: 0,
      parameters: [],
    }];
  }
}
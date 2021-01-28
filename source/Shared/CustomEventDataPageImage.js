export class CustomEventDataPageImage {
  get characterIndex() {
    return this._characterIndex;
  }
  set characterIndex(value) {
    this._characterIndex = value;
  }
  get characterName() {
    return this._characterName;
  }
  set characterName(value) {
    this._characterName = value;
  }
  get direction() {
    return this._direction;
  }
  set direction(value) {
    this._direction = value;
  }
  get pattern() {
    return this._pattern;
  }
  set pattern(value) {
    this._pattern = value;
  }
  get tileId() {
    return this._tileId;
  }
  set tileId(value) {
    this._tileId = value;
  }

  constructor() {
    this.initialize();
  }

  initialize() {
    this.characterIndex = 0;
    this.characterName = '';
    this.direction = 2;
    this.pattern = 1;
    this.tileId = 0;
  }
}
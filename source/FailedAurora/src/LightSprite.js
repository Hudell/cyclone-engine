export class LightSprite extends PIXI.Sprite {
  get id() {
    return this._id;
  }

  get screenX() {
    return this._screenX;
  }

  get screenY() {
    return this._screenY;
  }

  get h() {
    return this._h;
  }

  get character() {
    return this._character;
  }

  constructor(character) {
    super();
    this.initialize(character);
  }

  initialize(character) {
    this._id = null;
    this._character = character;
    this._width = 0;
    this._height = 0;
    this._screenX = 0;
    this._screenY = 0;
    this._h = 0;
    this._initialized = false;
    this._light = null;
    this._renderedLight = null;
    this.blendMode = PIXI.BLEND_MODES.SCREEN;
    // this.blendMode = 31;
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
  }

  isReadyForInitialization(id) {
    const cachedBitmap = this.getCachedBitmap(id);
    return cachedBitmap.width && cachedBitmap.height;
  }

  isValid() {
    return Boolean(this._id);
  }

  deleted() {
    return !this._id && this._initialized;
  }

  initializeLight(id) {
    if (!id || !this.isReadyForInitialization(id)) {
      return;
    }

    this._initialized = true;
    this._id = id;
    this._characterOriginX = null;
    this._characterOriginY = null;
    this._characterSize = null;
    this._lastDirection = 0;

    const data = this.getData(this._id);
    const cachedBitmap = this.getCachedBitmap(this._id);

    this._width = cachedBitmap.width;
    this._height = cachedBitmap.height;
    this._intensity = data.intensity.clamp(0, 100);

    const c = 100 - (this._intensity + data.variation);
    this._variation = (c < 0 ? (data.variation + c) : data.variation);
    this._dynamicIntensity = this._variation > 0;
    this._syncWithDirection = Boolean(data.syncWithDirection);
    this._originX = data.offsetX;
    this._originY = data.offsetY;

    if (this._syncWithDirection) {
      if (typeof this._originX !== 'object') {
        this._originX = { 2: this._originX, 4 : this._originX, 6 : this._originX, 8 : this._originX };
      }
      if (typeof this._originY !== 'object') {
        this._originY = { 2: this._originY, 4 : this._originY, 6: this._originY, 8 : this._originY };
      }
    }

    this._currentScale = 1.0;
    this.setSize(Number(data.size) || 100);
    this._transition = this._character._lightTransition;
    if (this._transition !== null && this._transition <= 0) {
      this._transition = null;
    }

    this._targetIntensity = this._intensity;
    if (this._transition) {
      this._intensity = 0;
      this._transitionUp = true;
      this._dynamicIntensity = true;
    }
    this.setRendering();
  }

  setSize(size) {
    if (size <= 0) {
      size = 100;
    }

    const ratio = size / 100;
    this.scale.x = ratio;
    this.scale.y = ratio;
    this._currentScale = this.scale.x;
  }

  setRendering() {
    this._light = null;
    this._renderedLight = null;
    this.texture = new PIXI.Texture(this.getCachedBitmap(this._id).baseTexture);
  }

  getCachedBitmap(id, direction = 2) {
    return CycloneAurora.getCachedBitmap(id, direction);
  }

  getData(id) {
    return CycloneAurora.getData(id);
  }

  getIntensity() {
    return this._intensity + Math.randomInt(this._variation);
  }

  refreshLight() {
    if (this._id === this._character.lightId) {
      return;
    }

    if (this._transition) {
      if (this._targetIntensity !== 0) {
        this._targetIntensity = 0;
        this._transition = -this._transition;
        this._transitionUp = false;
        this._dynamicIntensity = true;
        return;
      }

      if (this._intensity > 0) {
        return;
      }
    }

    this.initializeLight(this._character.lightId);
  }

  refreshScreenPosition() {
    if (this._syncWithDirection) {
      const d = this._character._direction;
      if (d !== this._lastDirection){
        this._light.bitmap = this.getCachedBitmap(this._id, d);
        this._lastDirection = d;
      }

      this._screenX = this._character.lightScreenX() + this._originX[d];
      this._screenY = this._character.lightScreenY() + this._originY[d];
      return;
    }

    this._screenX = this._character.lightScreenX() + this._originX;
    this._screenY = this._character.lightScreenY() + this._originY;
  }

  refreshOffsets() {
    this._character._originX = this._character._lightOriginX;
    this._character._originY = this._character._lightOriginY;
    this._originX = this._character._originX;
    this._originY = this._character._originY;

    if (this._syncWithDirection) {
      this._originX = {
        2: this._originX,
        4: this._originX,
        6: this._originX,
        8: this._originX,
      };
      this._originY = {
        2: this._originY,
        4: this._originY,
        6: this._originY,
        8: this._originY,
      };
    }
  }

  refreshSize() {
    this._characterSize = this._character._lightSize;
    this.setSize(this._characterSize);
  }

  refreshTransition() {
    this._intensity += this._transition;
    if (this._transitionUp && this._intensity >= this._targetIntensity) {
      this._intensity = this._targetIntensity;
      this.alpha = this.getIntensity() * 0.01;
      this._dynamicIntensity = (this._variation > 0);
    }
  }

  update() {
    this.refreshLight();
    if (!this.isValid()) {
      return;
    }

    if (this._characterOriginX !== this._character._lightOriginX) {
      this.refreshOffsets();
    }
    if (this._characterSize !== this._character._lightSize) {
      this.refreshSize();
    }
    if (this._intensity !== this._targetIntensity) {
      this.refreshTransition();
    }

    this.refreshScreenPosition();
    this.x = this._screenX;
    this.y = this._screenY;
    if (this._dynamicIntensity) {
      this.alpha = this.getIntensity() * 0.01;
    }
  }
}
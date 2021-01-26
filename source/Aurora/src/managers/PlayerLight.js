export class PlayerLight {
  static get enabled() {
    return this._enabled;
  }

  static set enabled(value) {
    this._enabled = value;
  }

  static get radius() {
    return 60;
  }

  static get color() {
    return '#FFFFFF';
  }

  static get flicker() {
    return false;
  }

  static get flickerFrequency() {
    const min = 3;
    const rng = Math.floor((Math.random() * 8) + 1);

    return min + rng;
  }

  static get flashlightSwitch() {
    return 0;
  }

  static shouldShowFlashlight() {
    return this.flashlightSwitch > 0 && $gameSwitches.value(this.flashlightSwitch);
  }

  static getPlayerPosition() {
    return CycloneAurora.getCharacterPosition($gamePlayer);
  }

  static refresh(lightmask) {
    if (!this.enabled) {
      return;
    }

    this._showingFlashlight = this.shouldShowFlashlight();
    this.flickeringDelay = this.flickerFrequency;

    const canvas = lightmask._maskBitmap.canvas;
    const ctx = canvas.getContext('2d');

    ctx.globalCompositeOperation = 'lighter';

    const [x, y, direction] = this.getPlayerPosition();

    if (this._showingFlashlight) {
      lightmask._maskBitmap.makeFlashlightEffect(x, y, 0, this.radius, this.color, 'black', direction);
    } else if (this.radius < 100) {
      lightmask._maskBitmap.radialgradientFillRect(x, y, 0, this.radius, '#999999', 'black', this.flicker && !this.flickeringDelay);
    } else {
      lightmask._maskBitmap.radialgradientFillRect(x, y, 20, this.radius, this.color, 'black', this.flicker && !this.flickeringDelay);
    }

    ctx.globalCompositeOperation = 'source-over';
  }

  static update() {
    if (!this.enabled) {
      return;
    }

    if (this.shouldShowFlashlight() !== this._showingFlashlight) {
      CycloneAurora.dirty = true;
      return;
    }

    if (this.flicker && !this.shouldShowFlashlight()) {
      if (this.flickeringDelay > 0) {
        this.flickeringDelay--;
      } else {
        CycloneAurora.dirty = true;
        return;
      }
    }
  }

  static register() {
    CycloneAurora.registerEvent('afterRefreshMask', (...args) => {
      this.refresh(...args);
    });
    CycloneAurora.registerEvent('updateMask', (...args) => {
      this.update(...args);
    });

    this.enabled = true;
    this.flickeringDelay = this.flickerFrequency;
  }
}
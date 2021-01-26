export class EventLight {
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

  static shouldShowFlashlight() {
    return false;
  }

  static getEventPosition(event) {
    return CycloneAurora.getCharacterPosition(event);
  }

  static refresh(lightmask) {
    if (!this.enabled) {
      return;
    }

    const events = $gameMap._events.filter(event => event && event.aurora);
    if (!events.length) {
      return;
    }

    const canvas = lightmask._maskBitmap.canvas;
    const ctx = canvas.getContext('2d');

    ctx.globalCompositeOperation = 'lighter';

    for (const event of events) {
      if (!event) {
        continue;
      }

      const [x, y, direction] = this.getEventPosition(event);

      const radius = event.aurora.radius ?? this.radius;
      const color = event.aurora.color ?? this.color;
      const flicker = event.aurora.flicker ?? this.flicker;
      const flashlight = event.aurora.flashlight ?? false;

      if (flashlight) {
        lightmask._maskBitmap.makeFlashlightEffect(x, y, 0, radius, color, 'black', direction);
      } else if (radius < 100) {
        lightmask._maskBitmap.radialgradientFillRect(x, y, 0, radius, '#999999', 'black', flicker && Math.randomInt(10) === 3);
      } else {
        lightmask._maskBitmap.radialgradientFillRect(x, y, 20, radius, color, 'black', flicker && Math.randomInt(10) === 3);
      }
    }

    ctx.globalCompositeOperation = 'source-over';
  }

  static update() {
    if (!this.enabled) {
      return;
    }
  }

  static register() {
    CycloneAurora.registerEvent('afterRefreshMask', (...args) => {
      this.refresh(...args);
    });
    // CycloneAurora.registerEvent('updateMask', (...args) => {
    //   this.update(...args);
    // });

    this.enabled = true;
  }
}
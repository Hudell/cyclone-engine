import { MaskBitmap } from './MaskBitmap';

export class Lightmask extends PIXI.Container {
  constructor(...args) {
    super(...args);
    this.initialize();
  }

  initialize() {
    this._width = Graphics.width;
    this._height = Graphics.height;
    this._sprites = [];
    this.createMaskBitmap();
  }

  get width() {
    return this._width;
  }
  get height() {
    return this._height;
  }
  get sprites() {
    return this._sprites;
  }
  get currentMapId() {
    return this._currentMapId;
  }
  set currentMapId(value) {
    this._currentMapId = value;
  }
  get currentDisplayX() {
    return this._currentDisplayX;
  }
  set currentDisplayX(value) {
    this._currentDisplayX = value;
  }
  get currentDisplayY() {
    return this._currentDisplayY;
  }
  set currentDisplayY(value) {
    this._currentDisplayY = value;
  }

  update() {
    this.updateMask();
  }

  createMaskBitmap() {
    this._maskBitmap = new MaskBitmap(Graphics.width, Graphics.height);
  }

  maskColor() {
    return CycloneAurora.runEvent('calculateMaskColor', {
      returnOnValue: true,
    }, this) ?? CycloneAurora.defaultMaskColor;
  }

  walkColor(newRGB, currentRGB, colorName, tintSpeed) {
    if (newRGB[colorName] < currentRGB[colorName]) {
      currentRGB[colorName] = currentRGB[colorName] - tintSpeed;
      if (newRGB[colorName] > currentRGB[colorName]) {
        currentRGB[colorName] = newRGB[colorName];
      }
    } else if(newRGB[colorName] > currentRGB[colorName]) {
      currentRGB[colorName] = currentRGB[colorName] + tintSpeed;
      if (newRGB[colorName] < currentRGB[colorName]) {
        currentRGB[colorName] = newRGB[colorName];
      }
    }

    newRGB[colorName] = newRGB[colorName].clamp(0, 255);
  }

  refreshMaskColor() {
    const destinationColor = this.maskColor();
    let newColor = destinationColor;

    if (CycloneAurora.lastMaskColor !== undefined && destinationColor !== CycloneAurora.lastMaskColor) {
      let currentColor = CycloneAurora.lastMaskColor;
      let currentRGB = CycloneAurora.currentRGB;

      if (!!currentRGB || currentColor.charAt(0) == '#') {
        newColor = CycloneAurora.colorNameToHex(destinationColor);
        if (newColor === false) {
          newColor = destinationColor;
        }

        if (currentRGB === undefined) {
          currentRGB = CycloneAurora.hexToRgb(currentColor);
        }
        const newRGB = CycloneAurora.hexToRgb(newColor);

        this.walkColor(newRGB, currentRGB, 'red', CycloneAurora.tintSpeed);
        this.walkColor(newRGB, currentRGB, 'green', CycloneAurora.tintSpeed);
        this.walkColor(newRGB, currentRGB, 'blue', CycloneAurora.tintSpeed);

        newColor = '#' + ((1 << 24) + (Math.floor(currentRGB.red) << 16) + (Math.floor(currentRGB.green) << 8) + Math.floor(currentRGB.blue)).toString(16).slice(1);
        CycloneAurora.currentRGB = currentRGB;
      }
    } else {
      CycloneAurora.currentRGB = undefined;
    }

    CycloneAurora.lastMaskColor = newColor;
  }


  refreshMask() {
    CycloneAurora.runEvent('beforeRefreshMask', {}, this);

    this.popAllSprites();

    if (CycloneAurora.isActive()) {
      CycloneAurora.showing = CycloneAurora.shouldShowLightMask();

      if (CycloneAurora.showing) {
        CycloneAurora.runEvent('refreshMask', {}, this);

        let backOpacity = CycloneAurora.defaultBackOpacity;
        if (CycloneAurora.opacityVariable > 0) {
          backOpacity = $gameVariables.value(CycloneAurora.opacityVariable).clamp(0, 255);
        }

        //calculates what will be the new mask color
        this.refreshMaskColor();
        CycloneAurora.runEvent('refreshMaskColor', {}, this);

        CycloneAurora.lastOpacity = backOpacity;

        // Adds the mask sprite
        this.addSprite(0, 0, this._maskBitmap, backOpacity);
        this._maskBitmap.fillRect(0, 0, Graphics.width, Graphics.height, CycloneAurora.lastMaskColor);

        CycloneAurora.runEvent('afterRefreshMask', {}, this);
      }
    }
  }

  updateMask() {
    if (!CycloneAurora.isActive()){
      if (this._sprites.length > 0) {
        CycloneAurora.dirty = true;
      }
      return;
    }

    let newId = 0;
    let newDisplayX = 0;
    let newDisplayY = 0;

    if ($gameMap !== undefined && $gameMap !== null) {
      newId = $gameMap._mapId;
      newDisplayX = $gameMap._displayX;
      newDisplayY = $gameMap._displayY;
    }

    if (newId !== this.currentMapId || newDisplayY !== this.currentDisplayY || newDisplayX !== this.currentDisplayX) {
      CycloneAurora.dirty = true;
    }

    if (CycloneAurora.shouldShowLightMask() !== CycloneAurora.showing) {
      CycloneAurora.dirty = true;
    }

    if (CycloneAurora.lastMaskColor !== this.maskColor()) {
      CycloneAurora.dirty = true;
    }

    // if (CycloneAurora.opacityVariable > 0) {
    //   var backOpacity = $gameVariables.value(CycloneAurora.opacityVariable).clamp(0, 255);
    //   if (backOpacity !== CycloneAurora.lastOpacity) {
    //     CycloneAurora.dirty = true;
    //   }
    // }

    CycloneAurora.runEvent('updateMask', {}, this);

    if (CycloneAurora.dirty) {
      this.refreshMask();
      CycloneAurora.dirty = false;
      this.currentMapId = newId;
      this.currentDisplayX = newDisplayX;
      this.currentDisplayY = newDisplayY;
    }
  }

  addSprite(x, y, bitmap, opacity, blendMode, rotation, anchorX, anchorY) {
    if (opacity === undefined) opacity = 255;
    if (blendMode === undefined) blendMode = 2;
    if (rotation === undefined) rotation = 0;
    if (anchorX === undefined) anchorX = 0;
    if (anchorY === undefined) anchorY = 0;

    const sprite = new Sprite(this.viewport);
    sprite.bitmap = bitmap;
    sprite.opacity = opacity;
    sprite.blendMode = blendMode;
    sprite.x = x;
    sprite.y = y;

    this._sprites.push(sprite);
    this.addChild(sprite);

    sprite.rotation = rotation;
    sprite.ax = anchorX;
    sprite.ay = anchorY;
    sprite.opacity = opacity;

    return sprite;
  }

  popSprite() {
    const sprite = this._sprites.pop();

    if (sprite) {
      this.removeChild(sprite);
    }

    return sprite;
  }

  popAllSprites() {
    let sprite;
    while (this._sprites.length > 0) {
      sprite = this._sprites.pop();

      if (sprite) {
        this.removeChild(sprite);
      }
    }
  }

}
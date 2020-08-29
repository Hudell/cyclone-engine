// ColorManager polyfill for MV

if (Utils.RPGMAKER_NAME === 'MV') {
  window.ColorManager = class ColorManager {
    static loadWindowskin() {
      this._windowskin = ImageManager.loadSystem('Window');
    }

    static textColor(n) {
      const px = 96 + (n % 8) * 12 + 6;
      const py = 144 + Math.floor(n / 8) * 12 + 6;
      return this._windowskin.getPixel(px, py);
    }

    static normalColor() {
      return this.textColor(0);
    }

    static systemColor() {
      return this.textColor(16);
    }

    static crisisColor() {
      return this.textColor(17);
    }

    static deathColor() {
      return this.textColor(18);
    }

    static gaugeBackColor() {
      return this.textColor(19);
    }

    static hpGaugeColor1() {
      return this.textColor(20);
    }

    static hpGaugeColor2() {
      return this.textColor(21);
    }

    static mpGaugeColor1() {
      return this.textColor(22);
    }

    static mpGaugeColor2() {
      return this.textColor(23);
    }

    static mpCostColor() {
      return this.textColor(23);
    }

    static powerUpColor() {
      return this.textColor(24);
    }

    static powerDownColor() {
      return this.textColor(25);
    }

    static ctGaugeColor1() {
      return this.textColor(26);
    }

    static ctGaugeColor2() {
      return this.textColor(27);
    }

    static tpGaugeColor1() {
      return this.textColor(28);
    }

    static tpGaugeColor2() {
      return this.textColor(29);
    }

    static tpCostColor() {
      return this.textColor(29);
    }

    static pendingColor() {
      return this._windowskin.getPixel(120, 120);
    }

    static hpColor(actor) {
      if (!actor) {
        return this.normalColor();
      } else if (actor.isDead()) {
        return this.deathColor();
      } else if (actor.isDying()) {
        return this.crisisColor();
      } else {
        return this.normalColor();
      }
    }

    static mpColor() {
      return this.normalColor();
    }

    static tpColor() {
      return this.normalColor();
    }

    static paramchangeTextColor(change) {
      if (change > 0) {
        return this.powerUpColor();
      } else if (change < 0) {
        return this.powerDownColor();
      } else {
        return this.normalColor();
      }
    }

    static damageColor(colorType) {
      switch (colorType) {
        case 0: // HP damage
          return '#ffffff';
        case 1: // HP recover
          return '#b9ffb5';
        case 2: // MP damage
          return '#ffff90';
        case 3: // MP recover
          return '#80b0ff';
        default:
          return '#808080';
      }
    }

    static outlineColor() {
      return 'rgba(0, 0, 0, 0.6)';
    }

    static dimColor1() {
      return 'rgba(0, 0, 0, 0.6)';
    }

    static dimColor2() {
      return 'rgba(0, 0, 0, 0)';
    }

    static itemBackColor1() {
      return 'rgba(32, 32, 32, 0.5)';
    }

    static itemBackColor2() {
      return 'rgba(0, 0, 0, 0.5)';
    }
  };

  const oldLoadSystemImages = Scene_Boot.loadSystemImages;
  Scene_Boot.loadSystemImages = function() {
    oldLoadSystemImages.call(this);
    ColorManager.loadWindowskin();
  };
}



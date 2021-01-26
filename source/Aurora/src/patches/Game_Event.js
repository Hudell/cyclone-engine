import { EventLight } from '../managers/EventLight';

CycloneAurora.patchClass(Game_Event, $super => class {
  enableLight(flashlight, radius, color, flicker) {
    this.aurora = {
      flashlight: flashlight ?? false,
      radius: radius ?? EventLight.radius,
      color: color ?? EventLight.color,
      flicker: flicker ?? EventLight.flicker,
    };

    CycloneAurora.dirty = true;
  }

  disableLight() {
    if (this.aurora) {
      CycloneAurora.dirty = true;
    }

    delete this.aurora;
  }

  enableFlashlight() {
    this.enableLight(true);
  }

  disableFlashlight() {
    this.enableLight(false);
  }

  update(...args) {
    const { _x, _y, _direction } = this;
    $super.update.call(this, ...args);

    if (!this.aurora) {
      return;
    }

    if (this.isMoving() || _x !== this._x || _y !== this._y || _direction !== this._direction) {
      CycloneAurora.dirty = true;
    }
  }

  // $.checkNoteTags = function(){
  //   if (!this.event().meta) return;

  //   var orangeLight = {
  //     flashlight : false,
  //     flicker : eventLight.Param.eventFlicker,
  //     radius : eventLight.Param.eventRadius,
  //     color : eventLight.Param.eventColor
  //   };

  //   var add = false;

  //   if (this.event().meta.light_radius !== undefined) {
  //     add = true;
  //     orangeLight.radius = this.event().meta.light_radius;
  //   }

  //   if (this.event().meta.light_color !== undefined) {
  //     add = true;
  //     orangeLight.color = this.event().meta.light_color;
  //   }

  //   if (this.event().meta.light_flickle !== undefined) {
  //     add = true;
  //     orangeLight.flicker = this.event().meta.light_flickle;
  //   }

  //   if (this.event().meta.light_flickler !== undefined) {
  //     add = true;
  //     orangeLight.flicker = this.event().meta.light_flickler;
  //   }

  //   if (this.event().meta.light_flicker !== undefined) {
  //     add = true;
  //     orangeLight.flicker = this.event().meta.light_flicker;
  //   }

  //   if (this.event().meta.light) {
  //     add = true;
  //   }

  //   if (this.event().meta.flashlight) {
  //     add = true;
  //     orangeLight.flashlight = true;
  //   }

  //   if (add) {
  //     this.orangeLight = orangeLight;
  //   } else {
  //     this.orangeLight = undefined;
  //   }
  // };


  initialize(...args) {
    $super.initialize.call(this, ...args);
    // this.checkNoteTags();
  }
});

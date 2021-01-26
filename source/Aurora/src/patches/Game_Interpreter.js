CycloneAurora.patchClass(Game_Interpreter, $super => class {
  enableEventLight(eventId, flashlight, radius, color, flicker) {
    if (eventId <= 0) {
      return;
    }

    const eventData = $gameMap.event(eventId);
    if (eventData) {
      eventData.enableLight(flashlight, radius, color, flicker);
    }
  }

  disableEventLight(eventId) {
    if (eventId <= 0) {
      return;
    }

    const eventData = $gameMap.event(eventId);
    if (eventData) {
      eventData.disableLight();
    }
  }

  enableEventFlashlight(eventId) {
    this.enableEventLight(eventId, true);
  }

  disableEventFlashlight(eventId) {
    this.enableEventLight(eventId, false);
  }

  enableLight(...args) {
    this.enableEventLight(this._eventId, ...args);
  }

  disableLight() {
    this.disableEventLight(this._eventId);
  }

  enableFlashlight() {
    this.enableEventLight(this._eventId, true);
  }

  disableFlashlight() {
    this.enableEventLight(this._eventId, false);
  }
});

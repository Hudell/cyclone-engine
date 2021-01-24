CycloneEvents.patchClass(Game_System, $super => class {
  clearSelfSwitches(mapId, eventId) {
    const switches = ['A', 'B', 'C', 'D'];

    for (const switchLetter of switches) {
      const key = [mapId, eventId, switchLetter];
      $gameSelfSwitches.setValue(key, false);
    }
  }

  initCustomEvents(mapId) {
    if (this._customEvents === undefined) {
      this._customEvents = {};
    }

    if (this._customEvents[mapId] === undefined) {
      this._customEvents[mapId] = {};
    }
  }

  addCustomEvent(mapId, event) {
    this.initCustomEvents(mapId);
    this.clearSelfSwitches(mapId, event.id);
    this._customEvents[mapId][event.id] = event;

    return event;
  }

  removeCustomEvent(mapId, eventId) {
    this.initCustomEvents(mapId);
    this.clearSelfSwitches(mapId, eventId);
    delete this._customEvents[mapId][eventId];
  }

  clearCustomEvents(mapId) {
    this.initCustomEvents(mapId);
    this._customEvents[mapId] = {};
  }

  getCustomEvents(mapId) {
    this.initCustomEvents(mapId);
    return this._customEvents[mapId];
  }
});

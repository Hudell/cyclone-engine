export class CustomEvent extends Game_Event {
  initialize(mapId, eventId, eventData) {
    this._eventData = eventData;
    super.initialize(mapId, eventId);
  }

  event() {
    return this._eventData;
  }

  revive(data) {
    return new CustomEvent(data.mapId, data.id, data.eventData);
  }
}

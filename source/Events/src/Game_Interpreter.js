CycloneEvents.patchClass(Game_Interpreter, $super => class {
  waitForEventMovement(eventId) {
    this._waitingForEventMovement = eventId;
    if (this._waitingForEventMovement) {
      this._waitMode = 'eventMovement';
    }
  }

  updateWaitMode(...args) {
    if (this._waitMode == 'eventMovement') {
      if (this._waitingForEventMovement) {
        const eventId = this._waitingForEventMovement;
        const event = this.character(eventId);

        if (event) {
          if (event.isMoving() || event.isJumping() || event.isBalloonPlaying()) {
            return true;
          }

          if (event._xDestination !== undefined && event._yDestination !== undefined) {
            return true;
          }
        }
      }

      this._waitMode = '';
    }

    return $super.updateWaitMode.call(this, ...args);
  }
});

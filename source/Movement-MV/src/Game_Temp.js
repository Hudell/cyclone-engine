CycloneMovement.patchClass(Game_Temp, $super => class {
  setDestination(...args) {
    if (CycloneMovement.disableMouseMovement) {
      return;
    }

    $super.setDestination.call(this, ...args);
  }
});

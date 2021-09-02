CycloneEvents.patchClass(Game_Temp, $super => class {
  // Updates Game_Temp.prototype.setDestination to only be executed when the player has no destination set on itself
  setDestination(x, y) {
    if ($gamePlayer._xDestination === undefined && $gamePlayer._destinationCharacter === undefined && $gamePlayer._yDestination === undefined) {
      $super.setDestination.call(this, x, y);
    }
  }
});
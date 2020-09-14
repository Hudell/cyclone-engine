CycloneMovement.patchClass(Game_Party, $super => class {
  steps() {
    return Math.floor(this._steps);
  }

  increaseSteps() {
    this._steps += CycloneMovement.stepSize;
  }
});

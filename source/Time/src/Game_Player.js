CycloneTime.patchClass(Game_Player, $super => class {
  performTransfer(...args) {
    $super.performTransfer.call(this, ...args);
    CycloneTime.updateWeather();
    CycloneTime.updateVariables();
  }
});


if (Utils.RPGMAKER_NAME === 'MV') {
  Scene_Map.prototype.isAnyButtonPressed = function() {
    return false;
  };
}
if (Utils.RPGMAKER_NAME === 'MV') {
  DataManager.isMapObject = function(object) {
    return !!(object.data && object.events);
  };
}
CycloneAdvancedMaps.patchClass(Game_Event, $super => class {
  isMapPassable(x, y, d) {
    const blockRegionId = CycloneAdvancedMaps.params.blockEventRegionId;
    const unblockRegionId = CycloneAdvancedMaps.params.unblockEventRegionId;

    if (blockRegionId > 0 || unblockRegionId > 0) {
      const newX = $gameMap.roundXWithDirection(x, d);
      const newY = $gameMap.roundYWithDirection(y, d);
      const regionId = $gameMap.regionId(newX, newY);

      if (regionId > 0) {
        if (regionId === blockRegionId) {
          return false;
        }

        if (regionId === unblockRegionId) {
          return true;
        }
      }
    }

    return $super.isMapPassable.call(this, x, y, d);
  }
});

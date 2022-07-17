CycloneAdvancedMaps.patchClass(Game_Player, $super => class {
  performTransfer() {
    if (this.isTransferring()) {
      if (CycloneAdvancedMaps.params.commonEventId > 0) {
        $gameTemp.reserveCommonEvent(CycloneAdvancedMaps.params.commonEventId);
      }
    }

    $super.performTransfer.call(this);
  }

  isMapPassable(x, y, d) {
    const blockRegionId = CycloneAdvancedMaps.blockPlayerRegionId;
    const unblockRegionId = CycloneAdvancedMaps.unblockPlayerRegionId;

    if (blockRegionId > 0 || unblockRegionId > 0) {
      const newX = $gameMap.roundXWithDirection(x, d);
      const newY = $gameMap.roundYWithDirection(y, d);
      const regionId = $gameMap.regionId(newX, newY);

      if (regionId > 0) {
        if (regionId === blockRegionId) {
          return false;
        }

        if (regionId === unblockRegionId) {
          return false;
        }
      }
    }

    return $super.isMapPassable.call(this, x, y, d);
  }
});
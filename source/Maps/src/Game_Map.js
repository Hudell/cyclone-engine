CycloneMaps.patchClass(Game_Map, $super => class {
  tileWidth() {
    const customWidth = CycloneMaps.params.tileWidth;
    if (typeof customWidth === 'number' && customWidth > 0) {
      return customWidth;
    }

    return $super.tileWidth.call(this);
  }

  tileHeight() {
    const customHeight = CycloneMaps.params.tileHeight;
    if (typeof customHeight === 'number' && customHeight > 0) {
      return customHeight;
    }

    return $super.tileHeight.call(this);
  }

  isBush(x, y) {
    if ($super.isBush.call(this, x, y)) {
      return true;
    }

    const bushRegionId = CycloneMaps.params.bushRegionId;
    if (!bushRegionId) {
      return false;
    }

    if (!this.isValid(x, y)) {
      return false;
    }

    return $gameMap.regionId(x, y) === bushRegionId;
  }

  checkPassage(x, y, bit) {
    const blockRegionId = CycloneMaps.blockRegionId;
    const unblockRegionId = CycloneMaps.unblockRegionId;

    if (blockRegionId > 0 || unblockRegionId > 0) {
      const regionId = this.regionId(x, y);

      if (regionId > 0) {
        if (regionId === blockRegionId) {
          return false;
        }

        if (regionId === unblockRegionId) {
          return true;
        }
      }
    }

    return $super.checkPassage.call(this, x, y, bit);
  }
});
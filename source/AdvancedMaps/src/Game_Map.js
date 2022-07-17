CycloneAdvancedMaps.patchClass(Game_Map, $super => class {
  setup(...args) {
    $super.setup.call(this, ...args);
    if (CycloneAdvancedMaps.params.overlayEnabled) {
      CycloneAdvancedMaps.loadMapCustomLayers();
    }
  }

  tileWidth() {
    const customWidth = CycloneAdvancedMaps.params.tileWidth;
    if (typeof customWidth === 'number' && customWidth > 0) {
      return customWidth;
    }

    return $super.tileWidth.call(this);
  }

  tileHeight() {
    const customHeight = CycloneAdvancedMaps.params.tileHeight;
    if (typeof customHeight === 'number' && customHeight > 0) {
      return customHeight;
    }

    return $super.tileHeight.call(this);
  }

  isBush(x, y) {
    if ($super.isBush.call(this, x, y)) {
      return true;
    }

    const bushRegionId = CycloneAdvancedMaps.params.bushRegionId;
    if (!bushRegionId) {
      return false;
    }

    if (!this.isValid(x, y)) {
      return false;
    }

    return $gameMap.regionId(x, y) === bushRegionId;
  }

  checkRegionPassability(x, y) {
    const blockRegionId = CycloneAdvancedMaps.params.blockRegionId;
    const unblockRegionId = CycloneAdvancedMaps.params.unblockRegionId;

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

    return null;
  }

  checkPassage(x, y, bit) {
    const region = this.checkRegionPassability(x, y);
    if (typeof region === 'boolean') {
      return region;
    }

    return $super.checkPassage.call(this, x, y, bit);
  }
});
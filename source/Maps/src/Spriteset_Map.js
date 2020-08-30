CycloneMaps.patchClass(Spriteset_Map, $super => class {
  createLowerLayer() {
    CycloneMaps.clearSettings();
    $super.createLowerLayer.call(this);
  }

  loadOverlayBitmap(folderName, fileName) {
    if (CycloneMaps.params.organizedFolders) {
      return ImageManager.loadBitmap(`img/overlays/${ folderName }/`, fileName);
    }

    return ImageManager.loadParallax(fileName);
  }

  createOverlayLayer(folderName, fileNamePrefix, tagName, zValue, visibilitySwitchId = 0, maxOpacity = 255) {
    if (!$dataMap?.meta?.[tagName] && !$dataMap?.meta?.all) {
      return null;
    }

    const bitmap = this.loadOverlayBitmap(folderName, fileNamePrefix + $gameMap._mapId);
    const layer = new Sprite(bitmap);
    layer.z = zValue;

    this._tilemap.addChild(layer);

    if (visibilitySwitchId > 0) {
      layer.opacity = $gameSwitches.value(visibilitySwitchId) ? maxOpacity : 0;
    }

    return layer;
  }

  createGroundLayer() {
    this._groundLayer = this.createOverlayLayer('grounds', CycloneMaps.params.groundLayerFileName, 'ground', CycloneMaps.groundZ);
  }

  createParallaxLayer() {
    const { parallaxLayerFileName, parallaxSwitchId } = CycloneMaps.params;
    this._parallaxLayer = this.createOverlayLayer('pars', parallaxLayerFileName, 'par', CycloneMaps.parallaxZ, parallaxSwitchId);
  }

  createShadowLayer() {
    const { shadowLayerFileName, shadowSwitchId } = CycloneMaps.params;
    this._shadowLayer = this.createOverlayLayer('shadows', shadowLayerFileName, 'shadow', CycloneMaps.shadowZ, shadowSwitchId);
  }

  createLightLayer() {
    const { lightLayerFileName, lightSwitchId, lightOpacity } = CycloneMaps.params;
    this._lightLayer = this.createOverlayLayer('lights', lightLayerFileName, 'light', CycloneMaps.lightZ, lightSwitchId, lightOpacity);
    if (this._lightLayer) {
      this._lightLayer.blendMode = 1;
    }
  }

  createFogLayer() {
    CycloneMaps.fogFileName = this.getOverlayVariable('fogName');
    CycloneMaps.fogOpacity = this.getOverlayIntVariable('fogOpacity', 255);
    CycloneMaps.fogMoveX = this.getOverlayIntVariable('xMove', 0);
    CycloneMaps.fogMoveY = this.getOverlayIntVariable('yMove', 0);
    CycloneMaps.fogBlendMode = this.getOverlayIntVariable('fogBlend', 0);
    CycloneMaps.fogDuration = this.getOverlayIntVariable('fogDuration', 1);

    if (!CycloneMaps.fogFileName) {
      return;
    }

    const bitmap = this.loadOverlayBitmap('fogs', CycloneMaps.fogFileName);
    if (!bitmap) {
      return;
    }

    const layer = new TilingSprite();
    layer.bitmap = bitmap;
    layer.width = Graphics.width;
    layer.height = Graphics.height;

    layer.blendMode = CycloneMaps.fogBlendMode;
    layer.opacity = 0;
    layer.origin.x = $gameMap.displayX() * $gameMap.tileWidth();
    layer.origin.y = $gameMap.displayY() * $gameMap.tileHeight();
    layer.z = CycloneMaps.fogZ;

    CycloneMaps.fogNewX = 0;
    CycloneMaps.fogNewY = 0;

    this._tilemap.addChild(layer);
    this._fogLayer = layer;
    CycloneMaps.changedFogFileName = false;
  }

  createCharacters() {
    if (!CycloneMaps.params.enableOverlays) {
      $super.createCharacters.call(this);
      return;
    }

    this.createGroundLayer();
    $super.createCharacters.call(this);
    this.createParallaxLayer();
    this.createShadowLayer();
    this.createFogLayer();
    this.createLightLayer();
  }

  getOverlayVariable(variableName) {
    if ($dataMap?.meta?.[variableName] === undefined) {
      return false;
    }

    return CycloneMaps.getValueMaybeVariable($dataMap.meta[variableName]);
  }

  getOverlayIntVariable(variableName, defaultValue) {
    const value = parseInt(this.getOverlayVariable(variableName)) ?? defaultValue;
    return CycloneMaps.defaultIfNaN(value, defaultValue);
  }

  updateLayerOpacity(layer, maxOpacity, opacityChange) {
    const newOpacity = (layer.opacity + opacityChange).clamp(0, maxOpacity);

    if (layer.opacity !== newOpacity) {
      layer.opacity = newOpacity;
    }
  }

  updateLayer(layerName, update, folderName, fileNamePrefix, tagName, zValue, switchId, maxOpacity = 255, opacityChange = 10) {
    let layer = this[layerName];

    if (!layer) {
      layer = this.createOverlayLayer(folderName, fileNamePrefix, tagName, zValue, switchId, maxOpacity);
      update = false;
    }

    if (!layer) {
      return;
    }

    layer.x = $gameMap.displayX() * (0 - $gameMap.tileWidth());
    layer.y = $gameMap.displayY() * (0 - $gameMap.tileHeight());

    if (switchId > 0) {
      this.updateLayerOpacity(layer, maxOpacity, opacityChange * ($gameSwitches.value(switchId) ? 1 : -1));
    }

    if (update) {
      layer.bitmap = this.loadOverlayBitmap(folderName, fileNamePrefix + $gameMap._mapId);
    }

    this[layerName] = layer;
  }

  updateGroundLayer() {
    const { groundLayerFileName } = CycloneMaps.params;

    this.updateLayer('_groundLayer', CycloneMaps.changedGroundFileName, 'grounds', CycloneMaps.groundName || groundLayerFileName, 'ground', CycloneMaps.groundZ, 0);
    CycloneMaps.changedGroundFileName = false;
  }

  updateParallaxLayer() {
    const { parallaxLayerFileName, parallaxSwitchId } = CycloneMaps.params;

    this.updateLayer('_parallaxLayer', CycloneMaps.changedParallaxFileName, 'pars', CycloneMaps.parallaxName || parallaxLayerFileName, 'par', CycloneMaps.parallaxZ, parallaxSwitchId);
    CycloneMaps.changedParallaxFileName = false;
  }

  updateShadowLayer() {
    const { shadowLayerFileName, shadowSwitchId } = CycloneMaps.params;

    this.updateLayer('_shadowLayer', CycloneMaps.changedShadowFileName, 'shadows', CycloneMaps.shadowName || shadowLayerFileName, 'shadow', CycloneMaps.shadowZ, shadowSwitchId);
    CycloneMaps.changedShadowFileName = false;
  }

  stepFogLayerOpacity(stepSize = -10, maxOpacity = 255) {
    this._fogLayer.opacity = (this._fogLayer.opacity + stepSize).clamp(0, maxOpacity);
  }

  isFogEnabled() {
    const { fogSwitchId } = CycloneMaps.params;
    return fogSwitchId > 0 && $gameSwitches.value(fogSwitchId);
  }

  fadeOutOpacity() {
    // if a manual fade out was triggered
    if (CycloneMaps.needsFogFadeOut) {
      // If there's a new opacity level set by a plugin command, use that instead of the map's default
      const targetOpacity = CycloneMaps.newFogOpacity || CycloneMaps.fogOpacity;
      const transition = targetOpacity / (CycloneMaps.fogFadeOutDuration || 1);

      if (this._fogLayer.opacity > 0) {
        this.stepFogLayerOpacity(0 - transition, this._fogLayer.opacity);
        return;
      }

      // When the manual fade out is complete, we reset the temporary data and deactivate the fog switch
      CycloneMaps.needsFogFadeOut = false;
      CycloneMaps.newFogOpacity = false;
      CycloneMaps.newFogOpacityDuration = 0;
      CycloneMaps.currentOpacityTarget = 0;

      const fogSwitchId = CycloneMaps.params.fogSwitchId;
      if (fogSwitchId > 0) {
        $gameSwitches.setValue(fogSwitchId, false);
      }

      return;
    }

    // If there's no manual fade out requested, then the switch was turned off - so use the default fade out
    if (this._fogLayer.opacity > 0) {
      this.stepFogLayerOpacity(-10, this._fogLayer.opacity);
    }
  }

  updateFogOpacity() {
    if (!this.isFogEnabled() || CycloneMaps.needsFogFadeOut) {
      this.fadeOutOpacity();
      return;
    }

    // If there's a new opacity level set by a plugin command, use that instead of the map's default
    const targetOpacity = CycloneMaps.newFogOpacity || CycloneMaps.fogOpacity;
    const duration = CycloneMaps.newFogOpacityDuration || CycloneMaps.fogDuration;
    const transition = targetOpacity / duration;

    // If the opacity is not at the desired level yet, fade it in
    if (this._fogLayer.opacity < targetOpacity) {
      this.stepFogLayerOpacity(transition, targetOpacity);
    } else if (this._fogLayer.opacity > targetOpacity) {
      this._fogLayer.opacity = targetOpacity;
    }
  }

  updateFogLayer() {
    if (!this._fogLayer) {
      this.createFogLayer();
      if (!this._fogLayer) {
        return;
      }
    }

    this._fogLayer.blendMode = CycloneMaps.fogBlendMode;
    CycloneMaps.fogNewX += CycloneMaps.fogMoveX;
    CycloneMaps.fogNewY += CycloneMaps.fogMoveY;

    this._fogLayer.origin.x = $gameMap.displayX() * $gameMap.tileWidth() - CycloneMaps.fogNewX;
    this._fogLayer.origin.y = $gameMap.displayY() * $gameMap.tileHeight() - CycloneMaps.fogNewY;
    this.updateFogOpacity();

    if (CycloneMaps.changedFogFileName && CycloneMaps.fogFileName) {
      this._fogLayer.bitmap = this.loadOverlayBitmap('fogs', CycloneMaps.fogFileName);
      CycloneMaps.changedFogFileName = false;
    }
  }

  updateLightLayer() {
    const { lightLayerFileName, lightSwitchId, lightOpacity } = CycloneMaps.params;
    this.updateLayer('_lightLayer', CycloneMaps.changedLightFileName, 'lights', CycloneMaps.lightName || lightLayerFileName, 'light', CycloneMaps.lightZ, lightSwitchId, lightOpacity, 1);
    CycloneMaps.changedLightFileName = false;
  }

  updateTilemap() {
    if (CycloneMaps.params.enableOverlays) {
      this.updateGroundLayer();
      this.updateParallaxLayer();
      this.updateShadowLayer();
      this.updateFogLayer();
      this.updateLightLayer();
    }

    $super.updateTilemap.call(this);
  }
});
import { defaultIfNaN } from '../../Utils/defaultIfNaN';
import { getValueMaybeVariable } from '../../Utils/getValueMaybeVariable';

CycloneAdvancedMaps.patchClass(Spriteset_Map, $super => class {
  createLowerLayer() {
    CycloneAdvancedMaps.clearSettings();
    $super.createLowerLayer.call(this);
  }

  loadOverlayBitmap(folderName, fileName) {
    const overlayFolder = CycloneAdvancedMaps.params.overlayFolder || 'img/overlays';

    if (CycloneAdvancedMaps.params.organizedFolders) {
      CycloneAdvancedMaps.params.debug && console.log('Loading bitmap: ', `${overlayFolder}/${ folderName }/${fileName}`);

      return ImageManager.loadBitmap(`${overlayFolder}/${ folderName }/`, fileName);
    }

    CycloneAdvancedMaps.params.debug && console.log('Loading bitmap: ', `${overlayFolder}/${fileName}`);
    return ImageManager.loadBitmap(`${overlayFolder}/`, fileName);
    // return ImageManager.loadParallax(fileName);
  }

  createOverlayLayer(folderName, fileNamePrefix, tagName, zValue, visibilitySwitchId = 0, maxOpacity = 255) {
    if (!this.getMeta(tagName) && !this.getMeta('all')) {
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

  createLowerOverlayLayers() {
    
  }

  createGroundLayer() {
    this._groundLayer = this.createOverlayLayer('grounds', CycloneAdvancedMaps.params.groundLayerFileName, 'ground', CycloneAdvancedMaps.groundZ);
  }

  createParallaxLayer() {
    const { parallaxLayerFileName, parallaxSwitchId } = CycloneAdvancedMaps.params;
    this._parallaxLayer = this.createOverlayLayer('pars', parallaxLayerFileName, 'par', CycloneAdvancedMaps.parallaxZ, parallaxSwitchId);
  }

  createShadowLayer() {
    const { shadowLayerFileName, shadowSwitchId } = CycloneAdvancedMaps.params;
    this._shadowLayer = this.createOverlayLayer('shadows', shadowLayerFileName, 'shadow', CycloneAdvancedMaps.shadowZ, shadowSwitchId);
  }

  createLightLayer() {
    const { lightLayerFileName, lightSwitchId, lightOpacity } = CycloneAdvancedMaps.params;
    this._lightLayer = this.createOverlayLayer('lights', lightLayerFileName, 'light', CycloneAdvancedMaps.lightZ, lightSwitchId, lightOpacity);
    if (this._lightLayer) {
      this._lightLayer.blendMode = 1;
    }
  }

  createFogLayer() {
    CycloneAdvancedMaps.fogFileName = this.getOverlayVariable('fogName');
    CycloneAdvancedMaps.fogOpacity = this.getOverlayIntVariable('fogOpacity', 255);
    CycloneAdvancedMaps.fogMoveX = this.getOverlayIntVariable('xMove', 0);
    CycloneAdvancedMaps.fogMoveY = this.getOverlayIntVariable('yMove', 0);
    CycloneAdvancedMaps.fogBlendMode = this.getOverlayIntVariable('fogBlend', 0);
    CycloneAdvancedMaps.fogDuration = this.getOverlayIntVariable('fogDuration', 1);

    if (!CycloneAdvancedMaps.fogFileName) {
      return;
    }

    const bitmap = this.loadOverlayBitmap('fogs', CycloneAdvancedMaps.fogFileName);
    if (!bitmap) {
      return;
    }

    const layer = new TilingSprite();
    layer.bitmap = bitmap;
    layer.width = Graphics.width;
    layer.height = Graphics.height;

    layer.blendMode = CycloneAdvancedMaps.fogBlendMode;
    layer.opacity = 0;
    layer.origin.x = $gameMap.displayX() * $gameMap.tileWidth();
    layer.origin.y = $gameMap.displayY() * $gameMap.tileHeight();
    layer.z = CycloneAdvancedMaps.fogZ;

    CycloneAdvancedMaps.fogNewX = 0;
    CycloneAdvancedMaps.fogNewY = 0;

    this._tilemap.addChild(layer);
    this._fogLayer = layer;
    CycloneAdvancedMaps.changedFogFileName = false;
  }

  createCharacters() {
    if (!CycloneAdvancedMaps.params.enableOverlays) {
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

  getMeta(name) {
    if ($dataMap && $dataMap.meta) {
      return $dataMap.meta[name];
    }
  }

  getOverlayVariable(variableName) {
    if (this.getMeta(variableName) === undefined) {
      return false;
    }

    return getValueMaybeVariable($dataMap.meta[variableName]);
  }

  getOverlayIntVariable(variableName, defaultValue) {
    const value = parseInt(this.getOverlayVariable(variableName)) ?? defaultValue;
    return defaultIfNaN(value, defaultValue);
  }

  updateLayerOpacity(layer, maxOpacity, opacityChange) {
    const newOpacity = (layer.opacity + opacityChange).clamp(0, maxOpacity);

    if (layer.opacity !== newOpacity) {
      layer.opacity = newOpacity;
    }
  }

  updateLayer(layerName, update, folderName, fileNamePrefix, tagName, zValue, switchId, maxOpacity = 255, opacityChange = 10) {
    update && CycloneAdvancedMaps.params.debug && console.log('UPDATE layer ', layerName, folderName, fileNamePrefix, tagName);
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
    const { groundLayerFileName } = CycloneAdvancedMaps.params;

    this.updateLayer('_groundLayer', CycloneAdvancedMaps.changedGroundFileName, 'grounds', CycloneAdvancedMaps.groundName || groundLayerFileName, 'ground', CycloneAdvancedMaps.groundZ, 0);
    CycloneAdvancedMaps.changedGroundFileName = false;
  }

  updateParallaxLayer() {
    const { parallaxLayerFileName, parallaxSwitchId } = CycloneAdvancedMaps.params;

    this.updateLayer('_parallaxLayer', CycloneAdvancedMaps.changedParallaxFileName, 'pars', CycloneAdvancedMaps.parallaxName || parallaxLayerFileName, 'par', CycloneAdvancedMaps.parallaxZ, parallaxSwitchId);
    CycloneAdvancedMaps.changedParallaxFileName = false;
  }

  updateShadowLayer() {
    const { shadowLayerFileName, shadowSwitchId } = CycloneAdvancedMaps.params;

    this.updateLayer('_shadowLayer', CycloneAdvancedMaps.changedShadowFileName, 'shadows', CycloneAdvancedMaps.shadowName || shadowLayerFileName, 'shadow', CycloneAdvancedMaps.shadowZ, shadowSwitchId);
    CycloneAdvancedMaps.changedShadowFileName = false;
  }

  stepFogLayerOpacity(stepSize = -10, maxOpacity = 255) {
    this._fogLayer.opacity = (this._fogLayer.opacity + stepSize).clamp(0, maxOpacity);
  }

  isFogEnabled() {
    const { fogSwitchId } = CycloneAdvancedMaps.params;
    return fogSwitchId > 0 && $gameSwitches.value(fogSwitchId);
  }

  fadeOutOpacity() {
    // if a manual fade out was triggered
    if (CycloneAdvancedMaps.needsFogFadeOut) {
      // If there's a new opacity level set by a plugin command, use that instead of the map's default
      const targetOpacity = CycloneAdvancedMaps.newFogOpacity || CycloneAdvancedMaps.fogOpacity;
      const transition = targetOpacity / (CycloneAdvancedMaps.fogFadeOutDuration || 1);

      if (this._fogLayer.opacity > 0) {
        this.stepFogLayerOpacity(0 - transition, this._fogLayer.opacity);
        return;
      }

      // When the manual fade out is complete, we reset the temporary data and deactivate the fog switch
      CycloneAdvancedMaps.needsFogFadeOut = false;
      CycloneAdvancedMaps.newFogOpacity = false;
      CycloneAdvancedMaps.newFogOpacityDuration = 0;
      CycloneAdvancedMaps.currentOpacityTarget = 0;

      const fogSwitchId = CycloneAdvancedMaps.params.fogSwitchId;
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
    if (!this.isFogEnabled() || CycloneAdvancedMaps.needsFogFadeOut) {
      this.fadeOutOpacity();
      return;
    }

    // If there's a new opacity level set by a plugin command, use that instead of the map's default
    const targetOpacity = CycloneAdvancedMaps.newFogOpacity || CycloneAdvancedMaps.fogOpacity;
    const duration = CycloneAdvancedMaps.newFogOpacityDuration || CycloneAdvancedMaps.fogDuration;
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

    this._fogLayer.blendMode = CycloneAdvancedMaps.fogBlendMode;
    CycloneAdvancedMaps.fogNewX += CycloneAdvancedMaps.fogMoveX;
    CycloneAdvancedMaps.fogNewY += CycloneAdvancedMaps.fogMoveY;

    this._fogLayer.origin.x = $gameMap.displayX() * $gameMap.tileWidth() - CycloneAdvancedMaps.fogNewX;
    this._fogLayer.origin.y = $gameMap.displayY() * $gameMap.tileHeight() - CycloneAdvancedMaps.fogNewY;
    this.updateFogOpacity();

    if (CycloneAdvancedMaps.changedFogFileName && CycloneAdvancedMaps.fogFileName) {
      this._fogLayer.bitmap = this.loadOverlayBitmap('fogs', CycloneAdvancedMaps.fogFileName);
      CycloneAdvancedMaps.changedFogFileName = false;
    }
  }

  updateLightLayer() {
    const { lightLayerFileName, lightSwitchId, lightOpacity } = CycloneAdvancedMaps.params;
    this.updateLayer('_lightLayer', CycloneAdvancedMaps.changedLightFileName, 'lights', CycloneAdvancedMaps.lightName || lightLayerFileName, 'light', CycloneAdvancedMaps.lightZ, lightSwitchId, lightOpacity, 1);
    CycloneAdvancedMaps.changedLightFileName = false;
  }

  updateTilemap() {
    if (CycloneAdvancedMaps.params.enableOverlays) {
      this.updateGroundLayer();
      this.updateParallaxLayer();
      this.updateShadowLayer();
      this.updateFogLayer();
      this.updateLightLayer();
    }

    $super.updateTilemap.call(this);
  }
});
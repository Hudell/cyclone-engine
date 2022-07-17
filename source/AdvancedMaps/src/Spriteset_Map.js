import { defaultIfNaN } from '../../Utils/defaultIfNaN';
import { getValueMaybeVariable } from '../../Utils/getValueMaybeVariable';

CycloneAdvancedMaps.patchClass(Spriteset_Map, $super => class {
  getLayerFolderName(layerData) {
    switch (CycloneAdvancedMaps.params.folders) {
      case 'perLayer':
        return layerData.tagName;
      case 'perMap':
        return $gameMap._mapId ? String($gameMap._mapId) : '';
    }

    return '';
  }

  getLayerFileName(layerData) {
    const fileNamePrefix = layerData.fileName || '';
    const tagFileName = this.getMeta(layerData.tagName);
    const fileName = typeof tagFileName === 'string' ? tagFileName : '';

    const fileNameSuffix = layerData.appendMapId ? $gameMap._mapId : '';
    return `${fileNamePrefix}${fileName}${fileNameSuffix}`;
  }

  loadOverlayBitmap(layerData) {
    const bitmapPath = this.getLayerFileName(layerData);
    if (!bitmapPath) {
      return null;
    }

    CycloneAdvancedMaps.params.debug && console.log('Loading bitmap: ', bitmapPath);
    const overlayFolder = CycloneAdvancedMaps.params.overlayPath || 'img/overlays';
    const folderName = this.getLayerFolderName(layerData);
    const path = folderName ? `${overlayFolder}/${folderName}` : overlayFolder;

    return ImageManager.loadBitmap(`${path}/`, bitmapPath);
  }

  isLayerEnabled(layerData) {
    if (layerData.switchId > 0) {
      const switchValue = $gameSwitches.value(layerData.switchId);
      return layerData.invertSwitch ? !switchValue : switchValue;
    }

    return true;
  }

  isLayerAllowed(layerData, debug = false) {
    if (layerData.mapList?.includes($gameMap._mapId)) {
      debug && CycloneAdvancedMaps.params.debug && console.log(`Layer ${layerData.layerName || layerData.tagName} allowed by map list. (Map ${ $gameMap._mapId })`);
      return true;
    }

    if (layerData.tagName) {
      if ((this.getMeta(layerData.tagName) || this.getMeta('all'))) {
        debug && CycloneAdvancedMaps.params.debug && console.log(`Layer ${layerData.layerName || layerData.tagName} allowed by tag. (Map ${ $gameMap._mapId })`);
        return true;
      }

      debug && CycloneAdvancedMaps.params.debug && console.log(`Layer ${layerData.layerName || layerData.tagName} blocked by tag. (Map ${ $gameMap._mapId })`);
      return false;
    }

    if (!layerData.mapList?.length) {
      debug && CycloneAdvancedMaps.params.debug && console.log(`Layer ${layerData.layerName || layerData.tagName} allowed by lack of filters. (Map ${ $gameMap._mapId })`);
      return true;
    }

    debug && CycloneAdvancedMaps.params.debug && console.log(`Layer ${layerData.layerName || layerData.tagName} blocked by map list. (Map ${ $gameMap._mapId })`);
    return false;
  }

  createOverlayLayer(layerData) {
    if (!this.isLayerAllowed(layerData, true)) {
      return null;
    }

    const bitmap = this.loadOverlayBitmap(layerData);
    if (!bitmap) {
      return null;
    }

    const layer = layerData.position?.tiling ? new TilingSprite(bitmap) : new Sprite(bitmap);

    if (layerData.position?.tiling) {
      layer.width = Graphics.width;
      layer.height = Graphics.height;
    }

    layer.z = layerData.z || 0;

    this._tilemap.addChild(layer);

    if (layerData.fadeIn) {
      layer.opacity = 0;
    } else {
      layer.opacity = this.isLayerEnabled(layerData) ? (layerData.opacity || 255) : 0;
    }

    if (layerData.blendMode) {
      layer.blendMode = layerData.blendMode;
    }

    return layer;
  }

  createLowerOverlayLayers() {
    for (const layer of CycloneAdvancedMaps.layers) {
      if (layer.z > 1) {
        continue;
      }

      this[layer.id] = this.createOverlayLayer(layer);
    }
  }

  createUpperOverlayLayers() {
    for (const layer of CycloneAdvancedMaps.layers) {
      if (layer.z > 1) {
        this[layer.id] = this.createOverlayLayer(layer);
      }
    }
  }

  createCharacters() {
    if (!CycloneAdvancedMaps.params.overlayEnabled) {
      return $super.createCharacters.call(this);
    }

    this.createLowerOverlayLayers();
    $super.createCharacters.call(this);
    this.createUpperOverlayLayers();
  }

  getMeta(name) {
    if ($dataMap && $dataMap.meta) {
      return $dataMap.meta[name];
    }
  }

  getLayerPosition(layerData) {
    const boundToScreen = layerData.position?.boundTo === 'screen';

    const top = boundToScreen ? 0 : $gameMap.displayY() * (0 - $gameMap.tileHeight());
    const left = boundToScreen ? 0 : $gameMap.displayX() * (0 - $gameMap.tileWidth());
    const x = layerData.position?.x || 0;
    const y = layerData.position?.y || 0;

    if (layerData.position?.unit === 'pixels') {
      return [left + x, top + y];
    }

    return [
      left + x * $gameMap.tileWidth(),
      top + y * $gameMap.tileHeight(),
    ];
  }

  updateOverlayLayer(layerData) {
    let layer = this[layerData.id];

    const bitmap = layer?.bitmap || this.loadOverlayBitmap(layerData);
    if (!bitmap) {
      return;
    }

    if (!layer) {
      layer = this.createOverlayLayer(layerData);
      layerData.changed = false;
    }

    if (!layer) {
      return;
    }

    layerData.extraX -= layerData.position?.moveX || 0;
    layerData.extraY -= layerData.position?.moveY || 0;

    const [x, y] = this.getLayerPosition(layerData);
    if (layerData.position?.tiling) {
      if (layerData.position?.boundTo === 'screen') {
        layer.origin.x = $gameMap.displayX() * $gameMap.tileWidth() + layerData.extraX;
        layer.origin.y = $gameMap.displayY() * $gameMap.tileHeight() + layerData.extraY;
      } else {
        layer.origin.x = layerData.extraX;
        layer.origin.y = layerData.extraY;
      }
      layer.x = x;
      layer.y = y;
    } else {
      layer.x = x + layerData.extraX;
      layer.y = y + layerData.extraY;
    }

    this.updateLayerOpacity(layer, layerData);

    if (layerData.changed) {
      layer.bitmap = this.loadOverlayBitmap(layerData);
      layerData.changed = false;
    }

    this[layerData.id] = layer;
  }

  updateOverlayLayers() {
    for (const layer of CycloneAdvancedMaps.layers) {
      if (this.isLayerAllowed(layer, layer.changed)) {
        this.updateOverlayLayer(layer);
      }
    }
  }

  updateLayerOpacity(layer, layerData) {
    const opacity = this.isLayerEnabled(layerData) ? layerData.opacity ?? 255 : 0;
    if (layer.opacity === opacity) {
      return;
    }

    if (layerData.oneTimeOpacityDuration) {
      layerData.oneTimeOpacityChange = Math.ceil(Math.abs(layer.opacity - layerData.opacity) / layerData.oneTimeOpacityDuration);
      CycloneAdvancedMaps.params.debug && console.log('Single use opacity change calculated: ', layerData.oneTimeOpacityChange);
      layerData.oneTimeOpacityDuration = undefined;
    }
    const opacityChange = (layerData.oneTimeOpacityChange || layerData.opacityChange || 10) * (opacity > layer.opacity ? 1 : -1);

    // If the opacity is decreasing, the minimum is the target, otherwise it's 0
    const min = opacityChange > 0 ? 0 : opacity;
    // If the opacity is increasing, the maximum is the target, otherwise it's 255
    const max = opacityChange > 0 ? opacity : 255;

    const newOpacity = (layer.opacity + opacityChange).clamp(min, max);

    if (layer.opacity !== newOpacity) {
      layer.opacity = newOpacity;
    }

    if (newOpacity === opacity && layerData.oneTimeOpacityChange) {
      delete layerData.oneTimeOpacityChange;
    }
  }

  updateTilemap() {
    if (CycloneAdvancedMaps.params.overlayEnabled) {
      this.updateOverlayLayers();
    }

    $super.updateTilemap.call(this);
  }
});
const regionColors = [
  '#e75858',
  '#c0986f',
  '#cbcf32',
  '#8ab24c',
  '#22aa47',
  '#1cbf97',
  '#7ec1df',
  '#4da4dc',
  '#4f36a9',
  '#725fb9',
  '#d48de4',
  '#fa5e84'
];

CycloneMapEditor.patchClass(Bitmap, $super => class {
  drawNormalTile(tileId, x, y, drawWidth, drawHeight) {
    const bitmap =  CycloneMapEditor.loadTilesetBitmap(tileId);

    const sourceX = ((Math.floor(tileId / 128) % 2) * 8 + (tileId % 8)) * CycloneMapEditor.tileWidth;
    const sourceY = (Math.floor((tileId % 256) / 8) % 16) * CycloneMapEditor.tileHeight;

    this.blt(bitmap, sourceX, sourceY, CycloneMapEditor.tileWidth, CycloneMapEditor.tileHeight, x, y, drawWidth ?? CycloneMapEditor.tileWidth, drawHeight ?? CycloneMapEditor.tileHeight);
    return bitmap;
  }

  drawAutoTileTable(bitmap, table, tileX, tileY, x, y, drawWidth, drawHeight) {
    const halfWidth = CycloneMapEditor.tileWidth / 2;
    const halfHeight = CycloneMapEditor.tileHeight / 2;
    const drawHalfWidth = (drawWidth ?? CycloneMapEditor.tileWidth) / 2;
    const drawHalfHeight = (drawHeight ?? CycloneMapEditor.tileHeight) / 2;

    for (let i = 0; i < 4; i++) {
      const tableX = table[i][0];
      const tableY = table[i][1];

      const sourceX = (tileX * CycloneMapEditor.tileWidth) + (tableX * halfWidth);
      const sourceY = (tileY * CycloneMapEditor.tileHeight) + (tableY * halfHeight);
      const targetX = x + (i % 2) * halfWidth;
      const targetY = y + Math.floor(i / 2) * halfHeight;

      this.blt(bitmap, sourceX, sourceY, halfWidth, halfHeight, targetX, targetY, drawHalfWidth, drawHalfHeight);
    }

    return bitmap;
  }

  drawTileA1(bitmap, tileId, x, y, drawWidth, drawHeight) {
    let tileX = 0;
    let tileY = 0;
    let autotileTable = Tilemap.FLOOR_AUTOTILE_TABLE;
    const kind = Tilemap.getAutotileKind(tileId);
    const shape = Tilemap.getAutotileShape(tileId);

    switch(kind) {
      case 0:
        tileX = 0;
        tileY = 0;
        break;
      case 1:
        tileX = 0;
        tileY = 3;
        break;
      case 2:
        tileX = 6;
        tileY = 0;
        break;
      case 3:
        tileX = 6;
        tileY = 3;
        break;
      default:
        tileX = Math.floor((kind % 8) / 4) * 8;
        tileY = Math.floor(kind / 8) * 6 + (Math.floor((kind % 8) / 2) % 2) * 3;

        if (kind % 2 === 1) {
          tileX += 6;
          autotileTable = Tilemap.WATERFALL_AUTOTILE_TABLE;
        }
        break;
    }

    return this.drawAutoTileTable(bitmap, autotileTable[shape], tileX, tileY, x, y, drawWidth, drawHeight);
  }

  drawTileA2(bitmap, tileId, x, y, drawWidth, drawHeight) {
    const kind = Tilemap.getAutotileKind(tileId);
    const tileX = (kind % 8) * 2;
    const tileY = (Math.floor(kind / 8) - 2) * 3;
    const shape = Tilemap.getAutotileShape(tileId);

    return this.drawAutoTileTable(bitmap, Tilemap.FLOOR_AUTOTILE_TABLE[shape], tileX, tileY, x, y, drawWidth, drawHeight);
  }

  drawTileA3(bitmap, tileId, x, y, drawWidth, drawHeight) {
    const kind = Tilemap.getAutotileKind(tileId);
    const tileX = (kind % 8) * 2;
    const tileY = (Math.floor(kind / 8) - 6) * 2;
    const shape = Tilemap.getAutotileShape(tileId);

    return this.drawAutoTileTable(bitmap, Tilemap.WALL_AUTOTILE_TABLE[shape], tileX, tileY, x, y, drawWidth, drawHeight);
  }

  drawTileA4(bitmap, tileId, x, y, drawWidth, drawHeight) {
    const kind = Tilemap.getAutotileKind(tileId);
    const tileX = (kind % 8) * 2;
    const tileY = Math.floor((Math.floor(kind / 8) - 10) * 2.5 + (Math.floor(kind / 8) % 2 === 1 ? 0.5 : 0));
    const shape = Tilemap.getAutotileShape(tileId);
    let autotileTable = Tilemap.FLOOR_AUTOTILE_TABLE;

    if (Math.floor(kind / 8) % 2 === 1) {
      autotileTable = Tilemap.WALL_AUTOTILE_TABLE;
    }

    return this.drawAutoTileTable(bitmap, autotileTable[shape], tileX, tileY, x, y, drawWidth, drawHeight);
  }

  drawAutoTile(tileId, x, y, drawWidth, drawHeight) {
    const bitmap =  CycloneMapEditor.loadTilesetBitmap(tileId);

    if (Tilemap.isTileA1(tileId)) {
      return this.drawTileA1(bitmap, tileId, x, y, drawWidth, drawHeight);
    }

    if (Tilemap.isTileA2(tileId)) {
      return this.drawTileA2(bitmap, tileId, x, y, drawWidth, drawHeight);
    }

    if (Tilemap.isTileA3(tileId)) {
      return this.drawTileA3(bitmap, tileId, x, y, drawWidth, drawHeight);
    }

    if (Tilemap.isTileA4(tileId)) {
      return this.drawTileA4(bitmap, tileId, x, y, drawWidth, drawHeight);
    }
  }

  drawTile(tileId, x, y, drawWidth, drawHeight) {
    if (tileId <= 0) {
      return;
    }

    if (tileId >= Tilemap.TILE_ID_A1) {
      return this.drawAutoTile(tileId, x, y, drawWidth, drawHeight);
    }

    return this.drawNormalTile(tileId, x, y, drawWidth, drawHeight);
  }

  drawIcon(iconIndex, x, y) {
    const bitmap = ImageManager.loadSystem('IconSet');
    const pw = ImageManager.iconWidth;
    const ph = ImageManager.iconHeight;
    const sx = (iconIndex % 16) * pw;
    const sy = Math.floor(iconIndex / 16) * ph;
    this.blt(bitmap, sx, sy, pw, ph, x, y);
  }

  drawRegion(regionId, x, y, drawWidth, drawHeight) {
    const realDrawWidth = drawWidth ?? CycloneMapEditor.tileWidth;
    const realDrawHeight = drawHeight ?? CycloneMapEditor.tileHeight;

    if (regionId > 0) {
      const color = regionColors[regionId % regionColors.length];
      this.fillRect(x, y, realDrawWidth, realDrawHeight, `${ color}66`);
    }

    let iconIndex = CycloneMapEditor.regionIcons.get(regionId) ?? 0;
    if (iconIndex) {
      const {iconWidth, iconHeight} = ImageManager;
      const diffX = (realDrawWidth - iconWidth) / 2;
      const diffY = (realDrawHeight - iconHeight) / 2;

      this.drawIcon(iconIndex, x + diffX, y + diffY);
    } else {
      this.drawText(regionId, x, y, realDrawWidth, realDrawHeight, 'center');
    }
  }

  drawShadow(shadowId, x, y, drawWidth, drawHeight) {
    const halfWidth = (drawWidth ?? CycloneMapEditor.tileWidth) / 2;
    const halfHeight = (drawHeight ?? CycloneMapEditor.tileHeight) / 2;

    if (shadowId <= 0 || shadowId > 15) {
      return;
    }

    const table = shadowId.toString(2).padZero(4);
    for (let i = 0; i < 4; i++) {
      if (table[3 - i] !== '1') {
        continue;
      }

      const drawX = x + (i % 2) * halfWidth;
      const drawY = y + Math.floor(i / 2) * halfHeight;

      this.fillRect(drawX, drawY, halfWidth, halfHeight, '#00000066');
    }
  }
});

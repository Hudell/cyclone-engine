import { DirectionHelper } from '../../Utils/DirectionHelper';

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
    if (tileId === undefined) {
      return;
    }

    const bitmap =  CycloneMapEditor.loadTilesetBitmap(tileId);
    if (!bitmap) {
      return;
    }

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
      const targetX = x + (i % 2) * drawHalfWidth;
      const targetY = y + Math.floor(i / 2) * drawHalfHeight;

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
    if (!bitmap) {
      return;
    }

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

    if (Tilemap.isAutotile(tileId)) {
      return this.drawAutoTile(tileId, x, y, drawWidth, drawHeight);
    }

    return this.drawNormalTile(tileId, x, y, drawWidth, drawHeight);
  }

  drawIcon(iconIndex, x, y, drawWidth, drawHeight) {
    const bitmap = ImageManager.loadSystem('IconSet');
    const pw = ImageManager.iconWidth;
    const ph = ImageManager.iconHeight;
    const sx = (iconIndex % 16) * pw;
    const sy = Math.floor(iconIndex / 16) * ph;

    const realDrawWidth = drawWidth ?? pw;
    const realDrawHeight = drawHeight ?? ph;

    this.blt(bitmap, sx, sy, pw, ph, x, y, realDrawWidth, realDrawHeight);
  }

  drawRegion(regionId, x, y, drawWidth, drawHeight, stretchIcon = false) {
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

      const iconDrawWidth = stretchIcon ? realDrawWidth : iconWidth;
      const iconDrawHeight = stretchIcon ? realDrawHeight : iconHeight;
      const iconX = stretchIcon ? x : x + diffX;
      const iconY = stretchIcon ? y : y + diffY;

      this.drawIcon(iconIndex, iconX, iconY, iconDrawWidth, iconDrawHeight);
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

  drawCollisionType(collision, x, y, drawWidth, drawHeight) {
    if (collision === 0) {
      return;
    }

    const realDrawWidth = drawWidth ?? CycloneMapEditor.tileWidth;
    const realDrawHeight = drawHeight ?? CycloneMapEditor.tileHeight;

    const colorIndex = collision <= 3 ? collision - 1 : 0;

    const context = this.context;
    context.save();

    const color = ['#00FF00', '#FF0000', '#FF00FF'][colorIndex];
    context.fillStyle = color;
    context.fillRect(x, y, realDrawWidth, realDrawHeight);

    let goesUp = false;
    let goesDown = false;
    let goesLeft = false;
    let goesRight = false;

    if (collision >= 20) {
      const unblockedDirection = collision - 20;
      goesUp = !DirectionHelper.goesUp(unblockedDirection);
      goesDown = !DirectionHelper.goesDown(unblockedDirection);
      goesLeft = !DirectionHelper.goesLeft(unblockedDirection);
      goesRight = !DirectionHelper.goesRight(unblockedDirection);
    } else if (collision > 10) {
      const blockedDirection = collision - 10;
      goesUp = DirectionHelper.goesUp(blockedDirection);
      goesDown = DirectionHelper.goesDown(blockedDirection);
      goesLeft = DirectionHelper.goesLeft(blockedDirection);
      goesRight = DirectionHelper.goesRight(blockedDirection);
    } else if (collision === 4) {
      goesDown = true;
      goesUp = true;
    } else if (collision === 5) {
      goesLeft = true;
      goesRight = true;
    }

    if (collision > 3) {
      const pieceWidth = Math.floor(realDrawWidth / 4);
      const pieceHeight = Math.floor(realDrawHeight / 4);
      context.fillStyle = '#FF00FF';

      if (goesUp) {
        context.fillRect(x, y, realDrawWidth, pieceHeight);
      }
      if (goesDown) {
        context.fillRect(x, y + realDrawHeight - pieceHeight, realDrawWidth, pieceHeight);
      }

      if (goesLeft) {
        context.fillRect(x, y, pieceWidth, realDrawHeight);
      }

      if (goesRight) {
        context.fillRect(x + realDrawWidth - pieceWidth, y, pieceWidth, realDrawHeight);
      }
    }

    context.strokeStyle = '#000000';
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + realDrawWidth, y);
    context.stroke();
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x, y + realDrawHeight);
    context.stroke();
  }
});

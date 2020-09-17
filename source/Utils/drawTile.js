export function getTilesetIndex(tileId) {
  if (Tilemap.isTileA1(tileId)) {
    return 0;
  }

  if (Tilemap.isTileA2(tileId)) {
    return 1;
  }

  if (Tilemap.isTileA3(tileId)) {
    return 2;
  }

  if (Tilemap.isTileA4(tileId)) {
    return 3;
  }

  if (Tilemap.isTileA5(tileId)) {
    return 4;
  }

  return 5 + Math.floor(tileId / 256);
}

export function drawNormalTile(target, tilesetBitmap, tileId, x, y, drawWidth, drawHeight) {
  if (tileId === undefined) {
    return;
  }

  const sourceX = ((Math.floor(tileId / 128) % 2) * 8 + (tileId % 8)) * $gameMap.tileWidth();
  const sourceY = (Math.floor((tileId % 256) / 8) % 16) * $gameMap.tileHeight();

  target.blt(tilesetBitmap, sourceX, sourceY, $gameMap.tileWidth(), $gameMap.tileHeight(), x, y, drawWidth ?? $gameMap.tileWidth(), drawHeight ?? $gameMap.tileHeight());
}

export function drawAutoTileTable(target, bitmap, table, tileX, tileY, x, y, drawWidth, drawHeight) {
  const halfWidth = $gameMap.tileWidth() / 2;
  const halfHeight = $gameMap.tileHeight() / 2;
  const drawHalfWidth = (drawWidth ?? $gameMap.tileWidth()) / 2;
  const drawHalfHeight = (drawHeight ?? $gameMap.tileHeight()) / 2;

  for (let i = 0; i < 4; i++) {
    const tableX = table[i][0];
    const tableY = table[i][1];

    const sourceX = (tileX * $gameMap.tileWidth()) + (tableX * halfWidth);
    const sourceY = (tileY * $gameMap.tileHeight()) + (tableY * halfHeight);
    const targetX = x + (i % 2) * drawHalfWidth;
    const targetY = y + Math.floor(i / 2) * drawHalfHeight;

    target.blt(bitmap, sourceX, sourceY, halfWidth, halfHeight, targetX, targetY, drawHalfWidth, drawHalfHeight);
  }
}

export function drawTileA1(target, bitmap, tileId, x, y, drawWidth, drawHeight) {
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

  drawAutoTileTable(target, bitmap, autotileTable[shape], tileX, tileY, x, y, drawWidth, drawHeight);
}

export function drawTileA2(target, bitmap, tileId, x, y, drawWidth, drawHeight) {
  const kind = Tilemap.getAutotileKind(tileId);
  const tileX = (kind % 8) * 2;
  const tileY = (Math.floor(kind / 8) - 2) * 3;
  const shape = Tilemap.getAutotileShape(tileId);

  drawAutoTileTable(target, bitmap, Tilemap.FLOOR_AUTOTILE_TABLE[shape], tileX, tileY, x, y, drawWidth, drawHeight);
}

export function drawTileA3(target, bitmap, tileId, x, y, drawWidth, drawHeight) {
  const kind = Tilemap.getAutotileKind(tileId);
  const tileX = (kind % 8) * 2;
  const tileY = (Math.floor(kind / 8) - 6) * 2;
  const shape = Tilemap.getAutotileShape(tileId);

  drawAutoTileTable(target, bitmap, Tilemap.WALL_AUTOTILE_TABLE[shape], tileX, tileY, x, y, drawWidth, drawHeight);
}

export function drawTileA4(target, bitmap, tileId, x, y, drawWidth, drawHeight) {
  const kind = Tilemap.getAutotileKind(tileId);
  const tileX = (kind % 8) * 2;
  const tileY = Math.floor((Math.floor(kind / 8) - 10) * 2.5 + (Math.floor(kind / 8) % 2 === 1 ? 0.5 : 0));
  const shape = Tilemap.getAutotileShape(tileId);
  let autotileTable = Tilemap.FLOOR_AUTOTILE_TABLE;

  if (Math.floor(kind / 8) % 2 === 1) {
    autotileTable = Tilemap.WALL_AUTOTILE_TABLE;
  }

  drawAutoTileTable(target, bitmap, autotileTable[shape], tileX, tileY, x, y, drawWidth, drawHeight);
}

export function drawAutoTile(target, tilesetBitmap, tileId, x, y, drawWidth, drawHeight) {
  if (Tilemap.isTileA1(tileId)) {
    return drawTileA1(target, tilesetBitmap, tileId, x, y, drawWidth, drawHeight);
  }

  if (Tilemap.isTileA2(tileId)) {
    return drawTileA2(target, tilesetBitmap, tileId, x, y, drawWidth, drawHeight);
  }

  if (Tilemap.isTileA3(tileId)) {
    return drawTileA3(target, tilesetBitmap, tileId, x, y, drawWidth, drawHeight);
  }

  if (Tilemap.isTileA4(tileId)) {
    return drawTileA4(target, tilesetBitmap, tileId, x, y, drawWidth, drawHeight);
  }
}

export function drawTile(target, tilesetBitmap, tileId, x, y, drawWidth, drawHeight) {
  if (tileId <= 0) {
    return;
  }

  if (tileId >= Tilemap.TILE_ID_A1) {
    return drawAutoTile(target, tilesetBitmap, tileId, x, y, drawWidth, drawHeight);
  }

  return drawNormalTile(target, tilesetBitmap, tileId, x, y, drawWidth, drawHeight);
}

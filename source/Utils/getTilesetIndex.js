export function getTilesetIndex(tileId) {
  if (tileId >= (Tilemap.TILE_ID_A5 + 256) && tileId < Tilemap.TILE_ID_A1) {
    return 11;
  }

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

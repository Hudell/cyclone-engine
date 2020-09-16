CycloneTilePriority.patchClass(Game_Map, $super => class {

  priorityTiles() {
    const list = [];

    if (!$dataMap) {
      return list;
    }

    const flags = this.tilesetFlags();

    const _maybeAddTile = (tileId, x, y) => {
      if (!tileId || tileId >= Tilemap.TILE_ID_A1) {
        return;
      }

      const flag = flags[tileId];
      if (flag & 0x10 === 0) {
        return;
      }

      const tag = flag >> 12;
      if (tag <= 0) {
        return;
      }

      list.push({
        tileId,
        x,
        y,
        tag,
      });
    };

    const width = $dataMap.width;
    const height = $dataMap.height;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        _maybeAddTile($gameMap.tileId(x, y, 0), x, y);
        _maybeAddTile($gameMap.tileId(x, y, 1), x, y);
        _maybeAddTile($gameMap.tileId(x, y, 2), x, y);
        _maybeAddTile($gameMap.tileId(x, y, 3), x, y);
      }
    }

    return list;
  }
});
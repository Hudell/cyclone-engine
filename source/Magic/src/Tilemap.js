CycloneMagic.patchClass(Tilemap, $super => class {
  _addSpotTile(tileId, dx, dy) {
    if (!this._isHigherTile(tileId)) {
      const mapX = Math.round(dx / this._tileWidth) + this._lastStartX;
      const mapY = Math.round(dy / this._tileHeight) + this._lastStartY;

      if ($gameMap.isMagicTile(mapX, mapY, tileId)) {
        // when editing, delay hiding the position until the sprite is added to the spriteset
        if (window.CycloneMapEditor && window.CycloneMapEditor.isPositionBlendSpriteReady(mapX, mapY)) {
          return;
        }
      }
    }

    return $super._addSpotTile.call(this, tileId, dx, dy);
  }

  _maybeAddPuzzlePiece(dx, dy, px, py, mapX, mapY) {
    const pieceId = $gameMap._readMapData(mapX + px, mapY + py, 'puzzle');
    if (!pieceId) {
      return;
    }

    const kind = Tilemap.getAutotileKind(pieceId);
    const tileId = Tilemap.makeAutotileId(kind, 0);
    const pieceShape = pieceId - tileId;
    const pieceX = pieceShape % 4;
    const pieceY = Math.floor(pieceShape / 4);
    const tx = kind % 8;
    const ty = Math.floor(kind / 8);
    let setNumber = 0;
    let bx = 0;
    let by = 0;

    if (Tilemap.isTileA1(tileId)) {
      const waterSurfaceIndex = [0, 1, 2, 1][this.animationFrame % 4];
      setNumber = 0;
      if (kind === 0) {
        bx = waterSurfaceIndex * 2;
        by = 0;
      } else if (kind === 1) {
        bx = waterSurfaceIndex * 2;
        by = 3;
      } else if (kind === 2) {
        bx = 6;
        by = 0;
      } else if (kind === 3) {
        bx = 6;
        by = 3;
      } else {
        bx = Math.floor(tx / 4) * 8;
        by = ty * 6 + (Math.floor(tx / 2) % 2) * 3;
        if (kind % 2 === 0) {
          bx += waterSurfaceIndex * 2;
        } else {
          bx += 6;
          by += this.animationFrame % 3;
        }
      }
    } else if (Tilemap.isTileA2(tileId)) {
      setNumber = 1;
      bx = tx * 2;
      by = (ty - 2) * 3;
    } else {
      return;
    }

    const w1 = this._tileWidth / 2;
    const h1 = this._tileHeight / 2;
    const qsx = pieceX;
    const qsy = pieceY;

    const sx1 = (bx * 2 + qsx) * w1;
    const sy1 = (by * 2 + qsy) * h1;
    const dx1 = dx;
    const dy1 = dy;

    this._lowerLayer.addRect(setNumber, sx1, sy1, dx1, dy1, w1, h1);
  }

  _maybeAddPuzzlePieces(dx, dy) {
    const mapX = Math.round(dx / this._tileWidth) + this._lastStartX;
    const mapY = Math.round(dy / this._tileHeight) + this._lastStartY;
    const w1 = this._tileWidth / 2;
    const h1 = this._tileHeight / 2;

    this._maybeAddPuzzlePiece(dx, dy, 0, 0, mapX, mapY);
    this._maybeAddPuzzlePiece(dx + w1, dy, 0.5, 0, mapX, mapY);
    this._maybeAddPuzzlePiece(dx, dy + h1, 0, 0.5, mapX, mapY);
    this._maybeAddPuzzlePiece(dx + w1, dy + h1, 0.5, 0.5, mapX, mapY);
  }

  _addShadow(layer, bits, dx, dy) {
    this._maybeAddPuzzlePieces(dx, dy);
    $super._addShadow.call(layer, bits, dx, dy);
  }
});
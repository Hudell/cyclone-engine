import { SpriteBlenderTile } from './SpriteBlenderTile';

CycloneTileBlender.patchClass(Spriteset_Map, $super => class {
  createCharacters() {
    this.createBlenderTiles();
    $super.createCharacters.call(this);
  }

  createBlenderTiles() {
    CycloneTileBlender.clearBitmapCache();
    this._blenderTileSprites = [];

    for (const {tiles, x, y } of $gameMap.magicTiles()) {
      this._blenderTileSprites.push(new SpriteBlenderTile(tiles, x, y));
    }

    for (const sprite of this._blenderTileSprites) {
      this._tilemap.addChild(sprite);
    }
  }

  forceBlenderRefresh() {
    for (const sprite of this._blenderTileSprites) {
      this._tilemap.removeChild(sprite);
      sprite.destroy();
    }

    this.createBlenderTiles();
  }
});
import { SpriteBlenderTile } from './SpriteBlenderTile';

CycloneTileBlender.patchClass(Spriteset_Map, $super => class {
  createCharacters() {
    this.createBlenderTiles();
    $super.createCharacters.call(this);
  }

  createBlenderTiles() {
    CycloneTileBlender.clearBitmapCache();
    this._blenderTileSprites = [];

    for (const {tiles, x, y, width, height } of $gameMap.magicTiles()) {
      this._blenderTileSprites.push(new SpriteBlenderTile(tiles, x, y, width, height));
    }

    for (const sprite of this._blenderTileSprites) {
      this._tilemap.addChild(sprite);
    }
  }
});
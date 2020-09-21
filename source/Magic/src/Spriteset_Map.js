import { SpriteBlenderTile } from './SpriteBlenderTile';

CycloneMagic.patchClass(Spriteset_Map, $super => class {
  createCharacters() {
    this.createBlenderTiles();
    $super.createCharacters.call(this);
  }

  createBlenderTiles() {
    CycloneMagic.clearBitmapCache();
    this._blenderTileSprites = [];

    for (const {tiles, x, y, width, height } of $gameMap.magicTiles()) {
      this._blenderTileSprites.push(new SpriteBlenderTile(tiles, x, y, width, height));
    }

    for (const sprite of this._blenderTileSprites) {
      this._tilemap.addChild(sprite);
    }
  }
});
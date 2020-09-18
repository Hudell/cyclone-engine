import { SpriteBlenderTile } from './SpriteBlenderTile';

CycloneTileBlender.patchClass(Spriteset_Map, $super => class {
  createCharacters() {
    this.createBlenderTiles();
    $super.createCharacters.call(this);
  }

  createBlenderTiles() {
    CycloneTileBlender.clearBitmapCache();
    this._blenderTileSprites = [];

    this._blenderTileSprites.push(new SpriteBlenderTile([2864, 2832, 184], 2, 3));
    this._blenderTileSprites.push(new SpriteBlenderTile([2864, 2816, 185], 3, 3));

    this._blenderTileSprites.push(new SpriteBlenderTile([2864, 2849], 5, 3));
    this._blenderTileSprites.push(new SpriteBlenderTile([2864, 2861], 6, 3));

    // for (const {tileId, x, y, tag } of $gameMap.priorityTiles()) {
    //   this._blenderTileSprites.push(new SpriteBlenderTile(tileId, x, y, tag));
    // }

    for (const sprite of this._blenderTileSprites) {
      this._tilemap.addChild(sprite);
    }
  }
});
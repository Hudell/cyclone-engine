import { SpritePriorityTile } from './SpritePriorityTile';

CycloneTilePriority.patchClass(Spriteset_Map, $super => class {
  createCharacters() {
    this.createPriorityTiles();
    $super.createCharacters.call(this);
  }

  createPriorityTiles() {
    CycloneTilePriority.clearBitmapCache();
    this._priorityTileSprites = [];

    for (const {tileId, x, y, tag } of $gameMap.priorityTiles()) {
      this._priorityTileSprites.push(new SpritePriorityTile(tileId, x, y, tag));
    }

    for (const sprite of this._priorityTileSprites) {
      this._tilemap.addChild(sprite);
    }
  }
});
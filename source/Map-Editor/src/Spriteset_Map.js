import { SpriteMapEditorCursor } from './SpriteMapEditorCursor';

CycloneMapEditor.patchClass(Spriteset_Map, $super => class {
  initialize() {
    $super.initialize.call(this);

    this.createMapEditorCursor();
  }

  createMapEditorCursor() {
    this._mapEditorCursor = new SpriteMapEditorCursor();
    this.addChild(this._mapEditorCursor);
  }

  forceBlenderRefresh(hardRefresh = false) {
    if (!window.CycloneMagic) {
      return;
    }

    if (hardRefresh) {
      for (const sprite of this._blenderTileSprites) {
        sprite.parent.removeChild(sprite);
        sprite.destroy();
      }
      this._blenderTileSprites = [];
      this.createBlenderTiles();
      return;
    }

    const magicTiles = $gameMap.magicTiles();
    for (const tile of magicTiles) {
      let found = false;

      for (const sprite of this._blenderTileSprites) {
        if (sprite._mapX !== tile.x || sprite._mapY !== tile.y) {
          continue;
        }

        found = true;
        if (!window.CycloneMagic.isSpriteCached(sprite.spriteId)) {
          sprite._bitmap = null;
        }
        break;
      }

      if (!found) {
        const newSprite = new window.CycloneMagic.SpriteBlenderTile(tile.tiles, tile.x, tile.y, 1, 1);
        this._blenderTileSprites.push(newSprite);
        this._tilemap.addChild(newSprite);
      }
    }

    this._tilemap.refresh();
  }

  // updatePosition() {
  //   if (!CycloneMapEditor.active) {
  //     return $super.updatePosition.call(this);
  //   }

  //   const scale = $gameMap.zoom ?? { x : 1, y : 1};
  //   const screen = $gameScreen;
  //   this.x = -($gameMap.zoom?.x ?? 1) * (scale.x - 1);
  //   this.y = -($gameMap.zoom?.y ?? 1) * (scale.y - 1);
  //   this.x = this.x + screen.shake();

  //   if (this.scale.x !== scale.x || this.scale.y !== scale.y) {
  //     const sw = Graphics.width / scale.x + this._tilemap._margin * 2;
  //     const sh = Graphics.height / scale.y + this._tilemap._margin * 2;

  //     if (sw !== this._tilemap.width || sh !== this._tilemap.height) {
  //       this._tilemap.width = sw;
  //       this._tilemap.height = sh;
  //       this._tilemap.refresh();
  //     }

  //     this.scale = new PIXI.Point(scale.x, scale.y);
  //     this._weather.scale = new PIXI.Point(1.0 / scale.x,  1.0 / scale.y);
  //     this._parallax.move(this._parallax.x, this._parallax.y, Graphics.width / scale.x, Graphics.height / scale.y);
  //   }

  // }
});

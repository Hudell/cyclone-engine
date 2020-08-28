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

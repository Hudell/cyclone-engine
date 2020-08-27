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
});

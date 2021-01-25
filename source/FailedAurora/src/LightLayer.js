import { LightFilterInstance } from './LightFilter';
import { LightSprite } from './LightSprite';
import { BaseLightSprite } from './BaseLightSprite';

export class LightLayer {
  get layerSprite() {
    return this._layerSprite;
  }

  constructor(state) {
    this.initialize(state);
  }

  initialize(lightingState) {
    this._lights = [];
    this._events = [];
    this._player = false;
    this._lightingState = lightingState;
    this._enabled = this._lightingState?.enabled;
    this._layer = new PIXI.Container();
    this._lightMap = new PIXI.RenderTexture.create(Graphics.width, Graphics.height);
    this._filter = LightFilterInstance;
    this._filter.setResolution(Graphics.width, Graphics.height);
    this._filter.blendMode = 32;
    this._layerSprite = new BaseLightSprite(this._lightMap);
    this._layerSprite.addFilter(this._filter);
  }

  update() {
    if (this._enabled !== Boolean(this._lightingState?.enabled)) {
      this._enabled = Boolean(this._lightingState?.enabled);
      this._layerSprite.visible = this._enabled;
    }

    if (!this._enabled) {
      return;
    }

    this._lightingState.update();
    let i = 0;
    while (i < this._lights.length) {
      this._lights[i].update();
      if (this._lights[i].deleted()) {
        this.deleteLight(this._lights[i]);
      } else {
        i++;
      }
    }

    // this._filter.setAmbientLightColor(this._lightingState.ambientLight);
    Graphics._app.renderer.render(this._layer, this._lightMap);
  }

  addLight(spriteLight) {
    this._lights.push(spriteLight);
    this._layer.addChild(spriteLight);
  }

  deleteLight(spriteLight) {
    if (spriteLight.character instanceof Game_Player) {
      this._player = false;
    } else if (spriteLight.character instanceof Game_Event) {
      this._events.remove(spriteLight.character.eventId());
    }

    this._lights.remove(spriteLight);
    this._layer.removeChild(spriteLight);
  }

  addEvent(event) {
    const id = event.eventId();
    if (!this._events.includes(id)) {
      this._events.push(id);
      this.addLight(new LightSprite(event));
    }
  }

  addPlayer() {
    if (!this._player) {
      this._player = true;
      this.addLight(new LightSprite($gamePlayer));
    }
  }

  addCharacter(character) {
    this.addLight(new LightSprite(character));
  }

  addMapLights() {
    const events = $gameMap.events();
    for (const event of events) {
      if (event && event.hasLight()) {
        this.addEvent(event);
      }
    }
    if ($gamePlayer.hasLight()) {
      this.addPlayer();
    }

    const tiles = $gameMap.tileLights;
    for (const tileId in tiles) {
      if (tiles[tileId]) {
        this.addCharacter(tiles[tileId]);
      }
    }
  }
}
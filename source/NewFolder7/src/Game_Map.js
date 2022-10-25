/* eslint-disable complexity */
import { CustomEvent } from '../../Shared/CustomEvent';
import { CustomEventData } from '../../Shared/CustomEventData';
import { ArcherData } from './events/Archer';
import { CastleData } from './events/Castle';
import { PawnData } from './events/Pawn';
import { TowerData } from './events/Tower';
import { TreeData } from './events/Tree';
import { WarriorData } from './events/Warrior';

const FOAM_REGIONS = {
  DOWN_LEFT: 1,
  DOWN: 2,
  DOWN_RIGHT: 3,
  LEFT: 4,
  ALL_SIDES: 5,
  RIGHT: 6,
  UP_LEFT: 7,
  UP: 8,
  UP_RIGHT: 9,

  LEFT_RIGHT: 10,
  UP_DOWN: 15,

  ALL_DOWN: 12,
  ALL_RIGHT: 16,
  ALL_LEFT: 14,
  ALL_UP: 18,
};

const OBJECT_REGIONS = {
  TREE: 20,
};

const TROOP_REGIONS = {
  BLUE_TERRITORY: 21,
  BLUE_WARRIOR: 22,
  BLUE_CASTLE: 23,
  BLUE_TOWER: 24,

  RED_TERRITORY: 31,
  RED_WARRIOR: 32,
  RED_CASTLE: 33,
  RED_TOWER: 34,

  PURPLE_TERRITORY: 41,
  PURPLE_WARRIOR: 42,
  PURPLE_CASTLE: 43,
  PURPLE_TOWER: 44,

};

CycloneNewFolder7.patchClass(Game_Map, $super => class {
  initialize(...args) {
    $super.initialize.call(this, ...args);
    this._mouseX = -1;
    this._mouseY = -1;
    this._selectedX = -1;
    this._selectedY = -1;
    this._addingTroop = false;
    this._territories = [];
    this._territoryChanged = false;
    this._refreshGrid = false;
    this._passabilityCache = [];
  }

  markGridAsRefreshed() {
    this._refreshGrid = false;
  }

  update(...args) {
    $super.update.call(this, ...args);

    this._mouseX = this.canvasToMapX(TouchInput._mouseX);
    this._mouseY = this.canvasToMapY(TouchInput._mouseY);

    CycloneNewFolder7.update();

    let flagTiles = false;
    while (this._territoryChanged) {
      flagTiles = true;
      this._territoryChanged = false;
      this._refreshGrid = true;
    }

    if (flagTiles) {
      CycloneNewFolder7.flagConnectedTiles();
    }
  }

  mapToCanvasX(mapX) {
    const tileWidth = this.tileWidth();
    return (mapX - this._displayX) * tileWidth;
  }

  mapToCanvasY(mapY) {
    const tileHeight = this.tileHeight();
    return (mapY - this._displayY) * tileHeight;
  }

  clearSelection() {
    this._addingTroop = false;
    this._selectedX = -1;
    this._selectedY = -1;
  }

  prepareToAddTroop() {
    this.clearSelection();
    this._addingTroop = true;
  }

  selectedTroop() {
    if (!this.isValid(this._selectedX, this._selectedY)) {
      return;
    }

    return this.eventsXy(this._selectedX, this._selectedY).find((e) => e.isTroop());
  }

  getIndexForNewEvent() {
    let index = 1;
    while (index < this._events.length && !!this._events[index]) {
      index++;
    }

    return index;
  }

  addEvent(eventData, index = undefined) {
    // If it's a custom event data, make sure to add an end command to all pages.
    if (eventData.endAllPages) {
      eventData.endAllPages();
    }

    if (!index) {
      index = this.getIndexForNewEvent();
    }

    eventData.id = index;
    const gameEvent = new CustomEvent(this._mapId, index, eventData);
    // $gameSystem.clearSelfSwitches(this._mapId, index);

    this._events[index] = gameEvent;

    if (SceneManager._scene instanceof Scene_Map && SceneManager._scene._spriteset && SceneManager._scene._spriteset._characterSprites) {
      const sprite = new Sprite_Character(gameEvent);
      SceneManager._scene._spriteset._characterSprites.push(sprite);
      SceneManager._scene._spriteset._tilemap.addChild(sprite);
    }

    return gameEvent;
  }

  createFoamEvent(x, y, characterIndex = 0) {
    const eventData = new CustomEventData();
    eventData.page.image.direction = 2;
    eventData.page.image.characterName = '!foam';
    eventData.page.image.characterIndex = characterIndex;
    eventData.page.priorityType = 0;
    eventData.page.moveFrequency = 5;
    eventData.page.moveSpeed = 6;
    eventData.page.walkAnime = false;
    eventData.page.stepAnime = true;
    eventData.page.moveType = 3;
    eventData.animation = {
      framesBetweenChanges: 6,
      list: [
        { pattern: 0, direction: 2 },
        { pattern: 1, direction: 2 },
        { pattern: 2, direction: 2 },
        { pattern: 0, direction: 4 },
        { pattern: 1, direction: 4 },
        { pattern: 2, direction: 4 },
        { pattern: 0, direction: 6 },
        { pattern: 1, direction: 6 },
      ],
    };
    eventData.x = x;
    eventData.y = y;

    return $gameMap.addEvent(eventData);
  }

  createTreeEvent(x, y) {
    const eventData = new TreeData();
    eventData.x = x;
    eventData.y = y;

    return $gameMap.addEvent(eventData);
  }

  createTowerEvent(x, y, color = 'blue') {
    const eventData = new TowerData(color);
    eventData.x = x;
    eventData.y = y;
    eventData.color = color;

    const event = $gameMap.addEvent(eventData);
    event.color = color;

    return event;
  }

  createCastleEvent(x, y, color = 'blue') {
    for (let castleX = x - 2; castleX <= x + 2; castleX++) {
      this.setTerritory(castleX, y, color, true);
      this.setTerritory(castleX, y - 1, color, true);
    }

    const eventData = new CastleData(color);
    eventData.x = x;
    eventData.y = y;
    eventData.color = color;

    const event = $gameMap.addEvent(eventData);
    event.color = color;

    return event;
  }

  createWarriorEvent(x, y, color = 'blue') {
    this._addingTroop = false;

    const eventData = new WarriorData(color);
    eventData.x = x;
    eventData.y = y;

    const event = $gameMap.addEvent(eventData);
    event.color = color;
    this.setTerritory(x, y, color, true);
    event.buildRange(event.maxDistance());
    return event;
  }

  createPawnEvent(x, y) {
    const eventData = new PawnData();
    eventData.x = x;
    eventData.y = y;

    const event = $gameMap.addEvent(eventData);
    this.setTerritory(x, y, 'blue', true);
    event.buildRange(event.maxDistance());
    return event;
  }

  createArcherEvent(x, y) {
    const eventData = new ArcherData();
    eventData.x = x;
    eventData.y = y;

    this.setTerritory(x, y, 'blue', true);
    const event = $gameMap.addEvent(eventData);
    event.buildRange(event.maxDistance());
    return event;
  }

  createBridgeEvent(x, y) {
    const eventData = new CustomEventData();
    eventData.page.image.tileId = this.layeredTiles(x, y).includes(84) ? 84 : 69;
    eventData.page.priorityType = 0;
    eventData.page.through = true;
    eventData.x = x;
    eventData.y = y;
    return $gameMap.addEvent(eventData);
  }

  // eslint-disable-next-line complexity
  createEventForRegion(x, y, regionId) {
    switch(regionId) {
      case FOAM_REGIONS.DOWN:
        return this.createFoamEvent(x, y, 0);
      case FOAM_REGIONS.LEFT:
        return this.createFoamEvent(x, y, 2);
      case FOAM_REGIONS.RIGHT:
        return this.createFoamEvent(x, y, 1);
      case FOAM_REGIONS.UP:
        return this.createFoamEvent(x, y, 3);
      case FOAM_REGIONS.DOWN_RIGHT:
        return this.createFoamEvent(x, y, 4);
      case FOAM_REGIONS.DOWN_LEFT:
        return this.createFoamEvent(x, y, 5);
      case FOAM_REGIONS.UP_RIGHT:
        return this.createFoamEvent(x, y, 6);
      case FOAM_REGIONS.UP_LEFT:
        return this.createFoamEvent(x, y, 7);

      case FOAM_REGIONS.ALL_SIDES:
        this.createFoamEvent(x, y, 4);
        this.createFoamEvent(x, y, 7);
        return true;
      case FOAM_REGIONS.ALL_DOWN:
        this.createFoamEvent(x, y, 4);
        this.createFoamEvent(x, y, 2);
        return true;
      case FOAM_REGIONS.ALL_UP:
        this.createFoamEvent(x, y, 7);
        this.createFoamEvent(x, y, 1);
        return true;
      case FOAM_REGIONS.ALL_LEFT:
        this.createFoamEvent(x, y, 5);
        this.createFoamEvent(x, y, 3);
        return true;
      case FOAM_REGIONS.ALL_RIGHT:
        this.createFoamEvent(x, y, 6);
        this.createFoamEvent(x, y, 0);
        return true;
      case FOAM_REGIONS.LEFT_RIGHT:
        this.createFoamEvent(x, y, 2);
        this.createFoamEvent(x, y, 1);
        return true;
      case FOAM_REGIONS.UP_DOWN:
        this.createFoamEvent(x, y, 3);
        this.createFoamEvent(x, y, 0);
        return true;

      case OBJECT_REGIONS.TREE:
        return this.createTreeEvent(x, y);

      case TROOP_REGIONS.BLUE_WARRIOR:
        return this.createWarriorEvent(x, y, 'blue');
      case TROOP_REGIONS.RED_WARRIOR:
        return this.createWarriorEvent(x, y, 'red');
      case TROOP_REGIONS.PURPLE_WARRIOR:
        return this.createWarriorEvent(x, y, 'purple');

      case TROOP_REGIONS.BLUE_TERRITORY:
        return this.setTerritory(x, y, 'blue');

      case TROOP_REGIONS.RED_TERRITORY:
        return this.setTerritory(x, y, 'red');

      case TROOP_REGIONS.PURPLE_TERRITORY:
        return this.setTerritory(x, y, 'purple');

      case TROOP_REGIONS.BLUE_CASTLE:
        return this.createCastleEvent(x, y, 'blue');
      case TROOP_REGIONS.RED_CASTLE:
        return this.createCastleEvent(x, y, 'red');
      case TROOP_REGIONS.PURPLE_CASTLE:
        return this.createCastleEvent(x, y, 'purple');

      case TROOP_REGIONS.BLUE_TOWER:
        this.setTerritory(x, y, 'blue');
        this.createTowerEvent(x, y, 'blue');
        return true;
      case TROOP_REGIONS.RED_TOWER:
        this.setTerritory(x, y, 'red');
        this.createTowerEvent(x, y, 'red');
        return true;
      case TROOP_REGIONS.PURPLE_TOWER:
        this.setTerritory(x, y, 'purple');
        this.createTowerEvent(x, y, 'purple');
        return true;
    }
  }

  setupEvents(...args) {
    $super.setupEvents.call(this, ...args);

    // Create "foam" events based on the regions.
    for (let x = 0; x < $dataMap.width; x++) {
      for (let y = 0; y < $dataMap.height; y++) {
        const regionId = this.tileId(x, y, 5);

        if (!this.createEventForRegion(x, y, regionId)) {
          continue;
        }

        const tag = this.terrainTag(x, y);
        if (tag === 1) {
          this.createBridgeEvent(x, y);
        }
      }
    }
  }

  setTerritory(x, y, color, connected) {
    const item = this._territories.find((t) => t.x === x && t.y === y);
    if (item) {
      item.color = color;
    } else {
      this._territories.push({ x, y, color, connected });
    }
    this._territoryChanged = true;

    const troops = this.troopsXy(x, y);
    for (const troop of troops) {
      if (troop.color !== color) {
        troop.erase();
      }
    }
  }

  findTerritory(x, y, color) {
    if (color) {
      return this._territories.find((t) => t.x === x && t.y === y && t.color === color);
    }

    return this._territories.find((t) => t.x === x && t.y === y);
  }

  unflagArmyTerritory(color) {
    const territories = this.armyTerritories(color);
    for (const territory of territories) {
      territory.connected = false;
    }
  }

  countTerritory(color) {
    return this.armyTerritories(color).length;
  }

  countTowers(color) {
    return this.armyTowers(color).length;
  }

  armyTerritories(color) {
    return this._territories.filter((t) => t.color === color);
  }

  armyTowers(color) {
    return this.events().filter((t) => t.name === 'tower' && t.color === color);
  }

  canAddTroopTo(x, y, color = 'blue') {
    if (this.eventsXyNt(x, y).find((e) => e.isBlocker())) {
      return false;
    }

    const castle = this.armyCastle(color);
    if (castle) {
      if (castle._x === x && castle._y === y - 1) {
        return true;
      }
    }

    // if (this.castleXy(x, y)) {
    //   return false;
    // }

    // if (this.towerXy(x, y)) {
    //   return false;
    // }

    // if (!CycloneNewFolder7.canAffordNewTroop(color)) {
    //   return false;
    // }

    // if (this.findTerritory(x, y, color)) {
    //   return true;
    // }

    // if (this.findTerritory(x + 1, y, color) && $gameMap.isPassable(x + 1, y, 4) && $gameMap.isPassable(x, y, 6)) {
    //   return true;
    // }

    // if (this.findTerritory(x - 1, y, color) && $gameMap.isPassable(x - 1, y, 6) && $gameMap.isPassable(x, y, 4)) {
    //   return true;
    // }

    // if (this.findTerritory(x, y + 1, color) && $gameMap.isPassable(x, y + 1, 8) && $gameMap.isPassable(x, y, 2)) {
    //   return true;
    // }

    // if (this.findTerritory(x, y - 1, color) && $gameMap.isPassable(x, y - 1, 2) && $gameMap.isPassable(x, y, 8)) {
    //   return true;
    // }

    return false;
  }

  troops(color) {
    const allTroops = $gameMap.events().filter((e) => e.isTroop());
    if (color) {
      return allTroops.filter((t) => t.color === color);
    }
    return allTroops;
  }

  countTroops(color) {
    return this.troops(color).length;
  }

  countFreeTroops(color = 'blue') {
    return this.troops(color)?.filter((t) => !t._usedTurn).length;
  }

  troopsXy(x, y) {
    return this.eventsXyNt(x, y).filter((e) => e.isTroop());
  }

  towerXy(x, y) {
    return this.events().find((e) => e.name === 'tower' && (e.posNt(x, y) || e.posNt(x - 1, y)));
  }

  castleXy(x, y) {
    return this.events().find((e) => e.name === 'castle' && e._x >= x - 2 && e._x <= x + 2 && e._y >= y && e.y <= y + 1);
  }

  castles() {
    return this.events().filter((e) => e.name === 'castle');
  }

  armyCastle(color = 'blue') {
    return this.castles().find((e) => e.color === color);
  }

  isTileFree(x, y, warriorColor) {
    if (this.eventsXyNt(x, y).filter((e) => e.isBlocker()).length) {
      if (!warriorColor || this.troopsXy(x, y).find(e => e.color === warriorColor)) {
        return false;
      }
    }

    if (this.towerXy(x, y)) {
      return false;
    }

    if (this.castleXy(x, y)) {
      return false;
    }

    return true;
  }

  movingTroop() {
    return this.troops().find((t) => t.isMoving() || t._direction !== 2);
  }

  possibleTroopLocations(color = 'blue') {
    const locations = [];

    const castle = this.armyCastle(color);
    if (castle) {
      locations.push({x: castle._x, y: castle._y + 1 });
    }

    // for (let x = 0; x < this.width(); x++) {
    //   for (let y = 0; y < this.height(); y++) {
    //     if (this.canAddTroopTo(x, y, color)) {
    //       locations.push({x, y});
    //     }
    //   }
    // }
    return locations;
  }

  scrollTo(x, y) {
    this._scrollTargetX = Math.max(0, Math.min(x, this.width()));
    this._scrollTargetY = Math.max(0, Math.min(y, this.height()));
    this._scrollSpeed = 4;
  }

  updateScroll() {
    if (this._scrollTargetX !== undefined && this._scrollTargetY !== undefined) {
      const scrollDistance = this.scrollDistance();
      if (Math.abs(this._scrollTargetX - this._displayX) < scrollDistance) {
        this._displayX = this._scrollTargetX;
      }
      if (Math.abs(this._scrollTargetY - this._displayY) < scrollDistance) {
        this._displayY = this._scrollTargetY;
      }

      if (this._scrollTargetX !== this._displayX || this._scrollTargetY !== this._displayY) {
        const lastX = this._displayX;
        const lastY = this._displayY;
        const moveX = Math.min(scrollDistance, Math.abs(lastX - this._scrollTargetX));
        const moveY = Math.min(scrollDistance, Math.abs(lastY - this._scrollTargetY));

        if (this._scrollTargetX > lastX) {
          this.scrollRight(moveX);
        } else if (this._scrollTargetX < lastX) {
          this.scrollLeft(moveX);
        }

        if (this._scrollTargetY > lastY) {
          this.scrollDown(moveY);
        } else if (this._scrollTargetY < lastX) {
          this.scrollUp(moveY);
        }
      } else {
        delete this._scrollTargetX;
        delete this._scrollTargetY;
      }
      return;
    }

    return $super.updateScroll.call(this);
  }

  isScrolling() {
    return $super.isScrolling.call(this) || (this._scrollTargetX !== undefined && this._scrollTargetY !== undefined);
  }

  centerX() {
    return (Graphics.width / $gameMap.tileWidth() - 1) / 2.0;
  }

  centerY() {
    return (Graphics.height / $gameMap.tileHeight() - 1) / 2.0;
  }

  setCenterPos(x, y) {
    this.setDisplayPos(x - this.centerX(), y - this.centerY());
  }


  checkTrappedTiles() {
    const width = this.width();
    const height = this.height();
    const cache = {};

    for (const terr of this._territories) {
      const index = terr.x + (terr.y * width);
      cache[index] = terr.color;
    }
    if (!this._passabilityCache.length) {
      for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
          this._passabilityCache[x + (y * width)] = {
            down: y < height -1 && this.isPassable(x, y, 2) && this.isPassable(x, y + 1, 8),
            left: x > 0 && this.isPassable(x, y, 4) && this.isPassable(x - 1, y, 6),
            right: x < width - 1 && this.isPassable(x, y, 6) && this.isPassable(x + 1, y, 4),
            up: y > 0 && this.isPassable(x, y, 8) && this.isPassable(x, y + 1, 2),
          };
        }
      }
    }

    const allColors = ['red', 'blue', 'purple'];

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const index = x + (y * width);
        if (this.troopsXy(x, y).length) {
          continue;
        }

        const myColor = cache[index];

        const upColor = y > 0 && cache[index - width];
        const downColor = y < height - 1 && cache[index + width];
        const leftColor = x > 0 && cache[index - 1];
        const rightColor = x < width - 1 && cache[index + 1];

        const upLeftColor = y > 0 && x > 0 && cache[index - width - 1];
        const upRightColor = y > 0 && x < width - 1 && cache[index - width + 1];
        const downLeftColor = y < height - 1 && x > 0 && cache[index + width - 1];
        const downRightColor = y < height - 1 && x < width - 1 && cache[index + width + 1];

        const upUpColor = y > 1 && cache[index - width - width];
        const downDownColor = y < height - 2 && cache[index + width + width];
        const leftLeftColor = x > 1 && cache[index - 2];
        const rightRightColor = x < width - 2 && cache[index + 2];

        const {left: leftPassable, right: rightPassable, down: downPassable,up: upPassable } = this._passabilityCache;

        // const leftPassable = x > 0 && this._passabilityCache[index].left;
        // const rightPassable = x < width - 1 && this.isPassable(x, y, 6) && this.isPassable(x + 1, y, 4);
        // const downPassable = y < height - 1 && this.isPassable(x, y, 2) && this.isPassable(x, y + 1, 8);
        // const upPassable = y > 0 && this.isPassable(x, y, 8) && this.isPassable(x, y - 1, 2);

        for (const color of allColors) {
          if (myColor === color) {
            continue;
          }

          const upOk = upColor === color || (upLeftColor === color && upRightColor === color && upUpColor == color);

          if (upPassable && upColor !== color) {
            continue;
          }

          const downOk = downColor === color || (downLeftColor === color && downRightColor === color && downDownColor === color);

          if (downPassable && downColor !== color) {
            continue;
          }

          const leftOk = leftColor === color || (downLeftColor === color && upLeftColor === color && leftLeftColor === color);
          if (leftPassable && leftColor !== color) {
            continue;
          }

          const rightOk = rightColor === color || (downRightColor === color && upRightColor === color && rightRightColor === color);
          if (rightPassable && rightColor !== color) {
            continue;
          }

          if (!upPassable && !downPassable && !leftPassable && !rightPassable && (!upOk || !leftOk || !rightOk || !downOk)) {
            continue;
          }

          this.setTerritory(x, y, color);
          break;
        }
      }
    }
  }
});

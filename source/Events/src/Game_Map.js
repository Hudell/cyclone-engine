import { CustomEvent } from '../../Shared/CustomEvent';

CycloneEvents.patchClass(Game_Map, $super => class {
  getIndexForNewEvent() {
    let index = 1;
    while (index < this._events.length && !!this._events[index]) {
      index++;
    }

    return index;
  }

  addEvent(eventData, temporary = false, index = undefined) {
    // If it's a custom event data, make sure to add an end command to all pages.
    if (eventData.endAllPages) {
      eventData.endAllPages();
    }

    if (!index) {
      index = this.getIndexForNewEvent();
    }

    eventData.id = index;
    const gameEvent = new CustomEvent(this._mapId, index, eventData);
    $gameSystem.clearSelfSwitches(this._mapId, index);

    this._events[index] = gameEvent;

    if (SceneManager._scene instanceof Scene_Map && SceneManager._scene._spriteset && SceneManager._scene._spriteset._characterSprites) {
      const sprite = new Sprite_Character(gameEvent);
      SceneManager._scene._spriteset._characterSprites.push(sprite);
      SceneManager._scene._spriteset._tilemap.addChild(sprite);
    }

    if (!temporary) {
      $gameSystem.addCustomEvent(this._mapId, eventData);
    }

    return gameEvent;
  }

  setupEvents() {
    $super.setupEvents.call(this);

    const customEvents = $gameSystem.getCustomEvents(this._mapId);
    for (const eventId in customEvents) {
      if (!customEvents[eventId]) {
        continue;
      }

      const newEventId = this.getIndexForNewEvent();
      customEvents[eventId].eventId = newEventId;
      this._events[newEventId] = new CustomEvent(this._mapId, newEventId, customEvents[eventId]);
    }
  }

  addEventAt(eventData, x, y, temporary = false, index = undefined) {
    eventData.x = x;
    eventData.y = y;
    return this.addEvent(eventData, temporary, index);
  }

  spawnEvent(eventData, tileList, temporary = false) {
    for (let i = 0; i < tileList.length; i++) {
      const newEventData = JsonEx.makeDeepCopy(eventData);
      newEventData.x = tileList[i].x;
      newEventData.y = tileList[i].y;
      this.addEvent(newEventData, temporary);
    }
  }

  getEventData(eventIdOrigin) {
    const event = $dataMap.events[eventIdOrigin];
    if (!event) {
      return undefined;
    }

    return JsonEx.makeDeepCopy(event);
  }

  getEventDataFrom(mapIdOrigin, eventIdOrigin, callback) {
    CycloneEvents.getAnotherMapData(mapIdOrigin, () => {
      const variableName = `$Map${ mapIdOrigin.padZero(3) }`;

      if (!window[variableName]) {
        return;
      }

      const event = window[variableName].events[eventIdOrigin];
      if (!event) {
        return;
      }

      const eventData = JsonEx.makeDeepCopy(event);
      if (eventData.note) {
        DataManager.extractMetadata(eventData);
      }
      callback.call(this, eventData);
    });
  }

  copyEvent(eventIdOrigin, x, y, temporary = false, newIndex = undefined) {
    const eventData = this.getEventData(eventIdOrigin);
    if (eventData) {
      $gameMap.addEventAt(eventData, x, y, temporary, newIndex);
    }
  }

  getRegionTileList(regionId) {
    const tileList = [];

    for (let x = 0; x < $gameMap.width(); x++) {
      for (let y = 0; y < $gameMap.height(); y++) {
        if ($gameMap.eventsXy(x, y).length) {
          continue;
        }

        if ($gameMap.regionId(x, y) !== regionId) {
          continue;
        }

        tileList.push({ x, y });
      }
    }

    return tileList;
  }

  getRandomRegionTile(regionId) {
    const tileList = this.getRegionTileList(regionId);

    if (tileList.length) {
      const index = Math.randomInt(tileList.length);
      return tileList[index];
    }
  }

  copyEventToRegion(eventIdOrigin, regionId, temporary = false, newIndex = undefined) {
    const tile = this.getRandomRegionTile(regionId);
    if (tile) {
      this.copyEvent(eventIdOrigin, tile.x, tile.y, temporary, newIndex);
    }
  }

  copyEventFrom(mapIdOrigin, eventIdOrigin, x, y, temporary = false, newIndex = undefined, callback = undefined) {
    this.getEventDataFrom(mapIdOrigin, eventIdOrigin, (eventData) => {
      const event = $gameMap.addEventAt(eventData, x, y, temporary, newIndex);

      callback && callback.call(this, event);
    });
  }

  copyEventFromMapToRegion(mapIdOrigin, eventIdOrigin, regionId, temporary = false, newIndex = undefined, callback = undefined) {
    const tile = this.getRandomRegionTile(regionId);
    if (tile) {
      this.copyEventFrom(mapIdOrigin, eventIdOrigin, tile.x, tile.y, temporary, newIndex, callback);
    }
  }

  spawnMapEvent(eventIdOrigin, regionId, temporary) {
    const eventData = this.getEventData(eventIdOrigin);
    const tileList = this.getRegionTileList(regionId);

    if (eventData && tileList) {
      this.spawnEvent(eventData, tileList, temporary);
    }
  }

  spawnMapEventFrom(mapIdOrigin, eventIdOrigin, regionId, temporary) {
    const tileList = this.getRegionTileList(regionId);
    if (tileList.length > 0) {
      this.getEventDataFrom(mapIdOrigin, eventIdOrigin, (eventData) => {
        $gameMap.spawnEvent(eventData, tileList, temporary);
      });
    }
  }

  createActorAt(...args) {
    return CycloneEvents.createActorAt(...args);
  }

  createNormalEventAt(...args) {
    return CycloneEvents.createNormalEventAt(...args);
  }

  createTriggerEventAt(...args) {
    return CycloneEvents.createTriggerEventAt(...args);
  }

  createTeleportEventAt(...args) {
    return CycloneEvents.createTeleportEventAt(...args);
  }

  createParallelProcess(...args) {
    return CycloneEvents.createParallelProcess(...args);
  }
});

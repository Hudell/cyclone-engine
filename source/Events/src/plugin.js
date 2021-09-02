import { CyclonePlugin } from '../../Core/main';
import { CustomEventData } from '../../Shared/CustomEventData';
import { loadFileAsync } from '../../Utils/loadFileAsync';
import { EventTriggers, EventPriorities } from './constants';

class CycloneEvents extends CyclonePlugin {
  static register() {
    super.initialize('CycloneEvents');

    super.register({
    });

    this.registerCommand('copyEvent', {
      eventId: 'int',
      x: 'int',
      y: 'int',
      temporary: 'boolean',
      newIndex: 'int',
    }, (eventIdOrigin, x, y, temporary, newIndex) => {
      return $gameMap.copyEvent(eventIdOrigin, x, y, temporary, newIndex);
    });

    this.registerCommand('copyEventFrom', {
      mapId: 'int',
      eventId: 'int',
      x: 'int',
      y: 'int',
      temporary: 'boolean',
      newIndex: 'int',
      wait: 'boolean',
    }, (mapId, eventId, x, y, temporary, newIndex, wait) => {
      if (!wait) {
        return $gameMap.copyEventFrom(mapId, eventId, x, y, temporary, newIndex);
      }

      // #ToDo: make the interpreter wait for copying to be complete
    });

    this.registerCommand('createActorAt', {
      actorId: 'int',
      x: 'int',
      y: 'int',
      d: 'int',
      commonEventId: 'int',
      temporary: 'boolean',
    }, (actorId, x, y, d, commonEventId, temporary) => {
      return this.createActorAt(actorId, x, y, d, commonEventId, temporary);
    });

    this.registerCommand('createNormalEventAt', {
      characterName: 'string',
      characterIndex: 'int',
      x: 'int',
      y: 'int',
      d: 'int',
      commonEventId: 'int',
      temporary: 'boolean',
    }, (characterName, characterIndex, x, y, d, commonEventId, temporary) => {
      return this.createNormalEventAt(characterName, x, y, d, commonEventId, temporary);
    });

    this.registerCommand('createTriggerEventAt', {
      x: 'int',
      y: 'int',
      commonEventId: 'int',
      temporary: 'boolean',
    }, (x, y, commonEventId, temporary) => {
      return this.createTriggerEventAt(x, y, commonEventId, temporary);
    });

    this.registerCommand('createTeleportEventAt', {
      x: 'int',
      y: 'int',
      newMapId: 'int',
      newX: 'int',
      newY: 'int',
      newDirection: 'int',
      fadeType: 'int',
      temporary: 'boolean',
    }, (x, y, newMapId, newX, newY, newDirection, fadeType, temporary) => {
      return this.createTeleportEventAt(x, y, newMapId, newX, newY, newDirection, fadeType, temporary);
    });
  }

  static getAnotherMapData(mapId, callback) {
    const variableName = `$Map${ mapId.padZero(3) }`;
    const fileName = `data/Map${ mapId.padZero(3) }.json`;

    const onLoad = (xhr, filePath, name) => {
      if (xhr.status < 400) {
        window[name] = JSON.parse(xhr.responseText);
        DataManager.onLoad(window[name]);

        callback();
      }
    };

    if (window[variableName] === undefined || window[variableName] === null) {
      loadFileAsync(fileName, undefined, onLoad);
    } else {
      callback();
    }
  }

  static createActorAt(actorId, x, y, d, scriptOrCommonEventId, temporary) {
    const actor = $gameActors.actor(actorId);
    if (!actor) {
      return;
    }

    return this.createNormalEventAt(actor.characterName(), actor.characterIndex(), x, y, d, scriptOrCommonEventId, temporary);
  }

  static createNormalEventAt(characterName, characterIndex, x, y, d, scriptOrCommonEventId, temporary) {
    const eventData = new CustomEventData();
    eventData.page.image.direction = d;
    eventData.page.image.characterName = characterName;
    eventData.page.image.characterIndex = characterIndex;
    eventData.page.callScriptOrCommonEvent(scriptOrCommonEventId);

    return $gameMap.addEventAt(eventData, x, y, temporary);
  }

  static createTriggerEventAt(x, y, scriptOrCommonEventId, temporary) {
    const eventData = new CustomEventData();
    eventData.page.trigger = EventTriggers.PLAYER_TOUCH;
    eventData.page.priorityType = EventPriorities.UNDER_PLAYER;
    eventData.page.callScriptOrCommonEvent(scriptOrCommonEventId);

    return $gameMap.addEventAt(eventData, x, y, temporary);
  }

  static createTeleportEventAt(x, y, newMapId, newX, newY, newDirection, fadeType, temporary) {
    const eventData = new CustomEventData();
    eventData.page.trigger = EventTriggers.PLAYER_TOUCH;
    eventData.page.priorityType = EventPriorities.UNDER_PLAYER;

    if (newDirection === undefined) {
      newDirection = $gamePlayer.direction();
    }

    if (fadeType === undefined) {
      fadeType = 0;
    }

    eventData.page.addCommand({
      code: 201,
      parameters: [0, newMapId, newX, newY, newDirection, fadeType],
    });

    return $gameMap.addEventAt(eventData, x, y, temporary);
  }

  static createParallelProcess(scriptOrCommonEventId, temporary, autoErase) {
    const eventData = new CustomEventData();
    eventData.page.trigger = EventTriggers.PARALLEL;
    eventData.page.priorityType = EventPriorities.UNDER_PLAYER;
    eventData.page.callScriptOrCommonEvent(scriptOrCommonEventId);

    if (autoErase === true) {
      eventData.page.addCommand({
        code: 214,
      });
    }

    return $gameMap.addEventAt(eventData, temporary);
  }
}

globalThis.CycloneEvents = CycloneEvents;
CycloneEvents.register();

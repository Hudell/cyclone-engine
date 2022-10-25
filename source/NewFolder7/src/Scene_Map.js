/* eslint-disable complexity */
import { WindowHud } from './windows/WindowHud';
import { WindowSelection } from './windows/WindowSelection';
import { TEAMS } from './consts';

CycloneNewFolder7.patchClass(Scene_Map, $super => class {
  tryTriggeringEvent() {
    if ($gameMap.isAnyEventStarting() || $gameMap.isEventRunning() || !$gamePlayer.canStartLocalEvents()) {
      return false;
    }

    if (TouchInput.isTriggered() || this._touchCount > 0) {
      if (TouchInput.isPressed()) {
        if (this._touchCount === 0 || this._touchCount >= 15) {
          if (CycloneNewFolder7.currentTeam !== TEAMS.blue) {
            return false;
          }

          const x = $gameMap.canvasToMapX(TouchInput.x);
          const y = $gameMap.canvasToMapY(TouchInput.y);

          const events = $gameMap.troopsXy(x, y);

          for (let i = 0; i < events.length; i++) {
            if (events[i].color !== 'blue') {
              continue;
            }

            if (events[i]._usedTurn) {
              return true;
            }

            events[i].start();
            return true;
          }

          const troop = $gameMap.selectedTroop();
          if (troop && troop.canWalkTo(x, y)) {
            troop.walkTo(x, y);
            $gameMap.clearSelection();
            return true;
          }

          if ($gameMap._addingTroop && $gameMap.canAddTroopTo(x, y, 'blue')) {
            CycloneNewFolder7.payForTroop();
            const event = $gameMap.createWarriorEvent(x, y);
            event._usedTurn = false;

            CycloneNewFolder7.flagConnectedTiles();
            return true;
          }

          $gameMap.clearSelection();
          return true;
        }
      }
    }

    return false;
  }

  processMapTouch(...args) {
    if (!this.tryTriggeringEvent()) {
      return $super.processMapTouch.call(this, ...args);
    }
  }

  updateScene() {
    $super.updateScene.call(this);

    if (Input.isTriggered('up')) {
      $gameMap.scrollUp(3);
    } else if (Input.isRepeated('up')) {
      $gameMap.scrollUp(2);
    } else if (Input.isTriggered('down')) {
      $gameMap.scrollDown(3);
    } else if (Input.isRepeated('down')) {
      $gameMap.scrollDown(2);
    }

    if (Input.isTriggered('left')) {
      $gameMap.scrollLeft(3);
    } else if (Input.isRepeated('left')) {
      $gameMap.scrollLeft(2);
    } else if (Input.isTriggered('right')) {
      $gameMap.scrollRight(3);
    } else if (Input.isRepeated('right')) {
      $gameMap.scrollRight(2);
    }
  }

  createAllWindows(...args) {
    $super.createAllWindows.call(this, ...args);

    this._mapSelectionWindow = new WindowSelection();
    this.addWindow(this._mapSelectionWindow);

    this._hudWindow = new WindowHud();
    this.addWindow(this._hudWindow);
  }
});

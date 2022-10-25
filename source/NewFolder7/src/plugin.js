import '../../Core/main.min';
import { COLORS, TEAMS } from './consts';

let currentTeam = -1;
let gold = 0;
let redGold = 0;
let yellowGold = 0;
let purpleGold = 0;
let delay = 0;

class CycloneNewFolder7 extends CyclonePlugin {
  static get currentTeam() {
    return currentTeam;
  }

  static get gold() {
    return gold;
  }
  static get territory() {
    return $gameMap.countTerritory('blue');
  }
  static get goldChange() {
    return this.getGoldChange('blue');
  }

  static register() {
    super.initialize('CycloneNewFolder7');

    super.register({});
  }

  static startTurn() {
    const color = COLORS[currentTeam];
    console.log('start turn', color);

    const castle = $gameMap.armyCastle(color);
    if (castle) {
      castle.flagConnectedTiles();
    }
    const troops = $gameMap.troops(color);
    for (const troop of troops) {
      const territory = $gameMap.findTerritory(troop._x, troop._y, color);
      if (!territory?.connected) {
        troop.erase();
        console.log('erase troop', color);
        continue;
      }

      troop._usedTurn = false;
    }

    console.log('getGoldChange', color);
    const goldChange = this.getGoldChange(color);
    this.setArmyGold(this.getArmyGold(color) + goldChange, color);

    if (currentTeam === TEAMS.blue) {
      const castle = $gameMap.armyCastle('blue');
      if (castle) {
        castle.center(castle._x, castle._y);
      } else {
        const troops = $gameMap.troops('blue');
        if (troops.length) {
          const someIdx = Math.randomInt(troops.length);
          troops[someIdx].center(troops[someIdx].x, troops[someIdx].y);
        } else {
          const territories = $gameMap.armyTerritories('blue');
          const tileIdx = Math.randomInt(territories.length);
          const tile = territories[tileIdx];
          $gameMap.setCenterPos(tile.x, tile.y);
        }
      }
    }
  }

  static endMovement() {
    if (currentTeam === TEAMS.blue) {
      this.flagConnectedTiles();
    }
  }

  static getGoldChange(color = 'blue') {
    const castle = $gameMap.armyCastle(color);
    const base = castle ? 10 : 0;

    const territories = castle ? castle._connectedTiles : $gameMap.countTerritory(color);
    const troops = $gameMap.countTroops(color);
    const towers = $gameMap.countTowers(color);

    return base + territories - troops * 10 - towers * 2;
  }

  static update() {
    if (currentTeam === TEAMS.blue) {
      delay = 0;
      return;
    }

    if (currentTeam > TEAMS.blue) {
      const color = COLORS[currentTeam];

      if ($gameMap.movingTroop() || $gameMap.isScrolling()) {
        return;
      }

      if (delay > 0) {
        delay--;
        return;
      }

      const troops = $gameMap.troops(color).filter((t) => !t._usedTurn);
      if (troops.length) {
        const troopIdx = Math.randomInt(troops.length);
        troops[troopIdx].doSomething();
        delay = 10;
        return;
      }

      if (this.canAffordNewTroop(color)) {
        console.log(color, 'can afford new troop');
        const locations = $gameMap.possibleTroopLocations(color);
        if (locations.length) {
          console.log('has location');
          // const preferredLocations = locations.filter((t) => $gameMap.findTerritory(t.x, t.y)?.color !== color);
          // const idx = Math.randomInt(preferredLocations.length > 0 ? preferredLocations.length : locations.length);
          // const tile = preferredLocations.length > 0 && preferredLocations.length >= idx ? preferredLocations[idx] : locations[idx];
          const tile = locations[0];

          this.payForTroop(color);
          const event = $gameMap.createWarriorEvent(tile.x, tile.y, color);
          event._usedTurn = false;
          delay = 10;
          return;
        }
      }
    }

    console.log('skip turn');
    this.skipTurn();
  }

  static skipTurn() {
    this.endTurn();
    this.startTurn();
    delay = 10;
  }

  static endTurn() {
    $gameMap.clearSelection();
    $gameMap._territoryChanged = true;
    $gameMap.checkTrappedTiles();

    currentTeam++;
    while (currentTeam !== 0) {
      if (currentTeam >= 4) {
        currentTeam = 0;
        return;
      }

      const castle = $gameMap.armyCastle(COLORS[currentTeam]);
      if (castle) {
        return;
      }

      currentTeam++;
    }
  }

  static countFreeTroops(color = 'blue') {
    return $gameMap.countFreeTroops(color);
  }

  static countTroops(color = 'blue') {
    return $gameMap.countTroops(color);
  }

  static getTroopPrice(color = 'blue') {
    let price = 10;
    const troops = $gameMap.troops(color);

    for (let i = 0; i < troops.length; i++) {
      price *= 1.2;
    }

    return Math.floor(Math.min(99, price));
  }

  static getTowerPrice(color = 'blue') {
    let price = 20;
    const troops = $gameMap.troops(color);

    for (let i = 0; i < troops.length; i++) {
      price *= 1.2;
    }

    return Math.floor(Math.min(99, price));
  }

  static getArmyGold(color = 'blue') {
    switch (color) {
      case 'red':
        return redGold;
      case 'yellow':
        return yellowGold;
      case 'purple':
        return purpleGold;
      default:
        return gold;
    }
  }

  static setArmyGold(value, color = 'blue') {
    switch(color) {
      case 'red':
        redGold = Math.floor(value);
        return;
      case 'yellow':
        yellowGold = Math.floor(value);
        return;
      case 'purple':
        purpleGold = Math.floor(value);
        return;
      default:
        gold = Math.floor(value);
        return;
    }
  }

  static canAffordNewTroop(color = 'blue') {
    return this.getArmyGold(color) >= this.getTroopPrice(color);
  }

  static payForTroop(color) {
    this.setArmyGold(this.getArmyGold(color) - this.getTroopPrice(color), color);
  }

  static flagConnectedTiles() {
    const castles = $gameMap.castles();
    for (const castle of castles) {
      castle.flagConnectedTiles();
    }
  }

  static connectedTiles() {
    const castle = $gameMap.armyCastle('blue');
    return castle?._connectedTiles || 0;
  }
}

globalThis.CycloneNewFolder7 = CycloneNewFolder7;
CycloneNewFolder7.register();

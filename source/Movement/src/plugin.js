import { CyclonePlugin } from '../../Core/main';
import { LZString } from '../../Libs/lz-string.min';

let currentMapCollisionTable = false;
const checkedTiles = new Set();

class CycloneMovement extends CyclonePlugin {
  static register() {
    super.initialize('CycloneMovement');

    super.register({
      stepCount: {
        type: 'int',
        defaultValue: 4,
      },
      followerStepsBehind: {
        type: 'int',
        defaultValue: 6,
      },
      triggerAllEvents: 'boolean',
      triggerTouchEventAfterTeleport: 'boolean',
      blockRepeatedTouchEvents: {
        type: 'booelan',
        defaultValue: true,
      },
      ignoreEmptyEvents: {
        type: 'boolean',
        defaultValue: true,
      },
      autoLeaveVehicles: 'boolean',
    });

    this.stepCount = [1, 2, 4].includes(this.params.stepCount) ? this.params.stepCount : 4;
    this.collisionStepCount = Math.min(4, this.stepCount);
    this.stepSize = 1 / this.stepCount;
    this.collisionSize = 1 / this.collisionStepCount;
    this.followerStepsBehind = Number(this.params.followerStepsBehind || 1).clamp(1, this.stepCount);
    this.triggerAllEvents = this.params.triggerAllEvents === true;
    this.autoLeaveVehicles = this.params.autoLeaveVehicles === true;
    this.triggerTouchEventAfterTeleport = this.params.triggerTouchEventAfterTeleport === true;
    this.blockRepeatedTouchEvents = this.params.blockRepeatedTouchEvents !== false;
    this.ignoreEmptyEvents = this.params.ignoreEmptyEvents !== false;
    this.diagonalPathfinding = true;
  }

  static get currentMapCollisionTable() {
    return currentMapCollisionTable;
  }

  static isRoundNumber(n) {
    return Math.floor(n) === n;
  }

  static goesLeft(d) {
    return d && d % 3 === 1;
  }

  static goesRight(d) {
    return d && d % 3 === 0;
  }

  static goesUp(d) {
    return d >= 7 && d <= 9;
  }

  static goesDown(d) {
    return d >= 1 && d <= 3;
  }

  static isDiagonal(d) {
    return this.isVertical(d) && this.isHorizontal(d);
  }

  static isVertical(d) {
    return this.goesDown(d) || this.goesUp(d);
  }

  static isHorizontal(d) {
    return this.goesLeft(d) || this.goesRight(d);
  }

  static getFirstDirection(diagonalDirection) {
    if (!diagonalDirection) {
      return diagonalDirection;
    }

    if (diagonalDirection > 6) {
      return 8;
    }
    if (diagonalDirection < 4) {
      return 2;
    }
    return diagonalDirection;
  }

  static getAlternativeDirection(direction, diagonalDirection) {
    if (direction === diagonalDirection) {
      return direction;
    }

    switch (diagonalDirection) {
      case 7:
        return direction == 8 ? 4 : 8;
      case 9:
        return direction == 8 ? 6 : 8;
      case 1:
        return direction == 2 ? 4 : 2;
      case 3:
        return direction == 2 ? 6 : 2;
      default:
        break;
    }

    return direction;
  }

  static xWithDirection(x, d, stepSize = undefined) {
    stepSize = stepSize ?? this.stepSize;

    if (this.goesLeft(d)) {
      return x - stepSize;
    }

    if (this.goesRight(d)) {
      return x + stepSize;
    }

    return x;
  }

  static yWithDirection(y, d, stepSize = undefined) {
    stepSize = stepSize ?? this.stepSize;

    if (this.goesDown(d)) {
      return y + stepSize;
    }

    if (this.goesUp(d)) {
      return y - stepSize;
    }

    return y;
  }

  static roundXWithDirection(x, d, stepSize = undefined) {
    return $gameMap.roundX(this.xWithDirection(x, d, stepSize));
  }

  static roundYWithDirection(y, d, stepSize = undefined) {
    return $gameMap.roundY(this.yWithDirection(y, d, stepSize));
  }

  static parseCollisionData(note) {
    let json;
    try {
      json = LZString.decompress(note);
    } catch(e) {
      console.error('Failed to decompress data from CycloneMapEditor event.');
      console.log(note);
      console.log(e);
      return;
    }

    let data;
    try {
      data = JSON.parse(json);

    } catch(e) {
      console.error('Failed to parse data from CycloneMapEditor event.');
      console.log(json);
      console.log(e);
      return;
    }

    return data;
  }

  static setupCollision() {
    if (!$gameMap._loaded) {
      return;
    }

    const stepCount = this.collisionStepCount;
    currentMapCollisionTable = new Array($dataMap.width * $dataMap.height * stepCount * stepCount);
    this.loadDefaultCollisionTable();
    this.loadCustomCollision();
  }

  static loadDefaultCollisionTable() {
    const { width, height } = $dataMap;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const downPassable = $gameMap.isPassable(x, y, 2);
        const leftPassable = $gameMap.isPassable(x, y, 4);
        const rightPassable = $gameMap.isPassable(x, y, 6);
        const upPassable = $gameMap.isPassable(x, y, 8);

        this.applyTileCollision(x, y, downPassable, leftPassable, rightPassable, upPassable);
      }
    }
  }

  static setBlockCollision(x, y, collision) {
    const index = this.collisionIndex(x, y);
    currentMapCollisionTable[index] = collision;
  }

  static applyFullTileCollision(x, y, collision) {
    const size = this.collisionSize;
    for (let subX = x; subX < x + 1; subX += size) {
      for (let subY = y; subY < y + 1; subY += size) {
        this.setBlockCollision(subX, subY, collision);
      }
    }
  }

  static applyTileDirectionCollision(x, y, direction, collision) {
    const size = this.collisionSize;

    if (direction === 2 || direction === 8) {
      const subY = y + (direction === 2 ? 1 - size : 0);
      for (let subX = x; subX < x + 1; subX += size) {
        this.setBlockCollision(subX, subY, collision);
      }
      return;
    }

    const subX = x + (direction === 6 ? 1 - size : 0);
    for (let subY = y; subY < y + 1; subY += size) {
      this.setBlockCollision(subX, subY, collision);
    }
  }

  static collisionIndex(x, y, useEditorStepCount = false) {
    const stepCount = useEditorStepCount ? 4 : this.collisionStepCount;

    const intX = Math.floor(x * stepCount);
    const intY = Math.floor(y * stepCount);
    const height = $gameMap.height() * stepCount;
    const width = $gameMap.width() * stepCount;
    return (intY % height) * width + (intX % width);
  }

  static setupCustomCollision(compressedData) {
    const data = CycloneMovement.parseCollisionData(compressedData);
    if (!data || !data.collision) {
      return;
    }

    const increment = this.collisionSize;

    for (let x = 0; x < $dataMap.width; x += increment) {
      for (let y = 0; y < $dataMap.height; y += increment) {
        const editorIndex = this.collisionIndex(x, y);
        const customCollision = Number(data.collision[editorIndex] || 0);

        if (customCollision > 0) {
          this.setBlockCollision(x, y, customCollision);
        }
      }
    }
  }

  static loadCustomCollision() {
    for (const event of $dataMap.events) {
      if (!event) {
        continue;
      }

      if (event.name !== 'CycloneMapEditor') {
        continue;
      }

      this.setupCustomCollision(event.note);
      return;
    }
  }

  static isPositionPassable(x, y, d) {
    const index = this.collisionIndex(x, y);

    const collision = currentMapCollisionTable[index];
    if (!collision || collision === 1) {
      return true;
    }

    return false;
  }

  static applyTileCollision(x, y, down, left, right, up) {
    if (down === left && down === right && down === up) {
      this.applyFullTileCollision(x, y, down ? 1 : 2);
      return;
    }

    this.applyFullTileCollision(x, y, 1);

    if (!down) {
      this.applyTileDirectionCollision(x, y, 2, 2);
    }

    if (!left) {
      this.applyTileDirectionCollision(x, y, 4, 2);
    }

    if (!right) {
      this.applyTileDirectionCollision(x, y, 6, 2);
    }

    if (!up) {
      this.applyTileDirectionCollision(x, y, 8, 2);
    }
  }

  static tileIdx(x, y) {
    const width = $dataMap.width;
    return y * width + x || 0;
  }

  static markTileAsChecked(x, y) {
    const idx = this.tileIdx(x, y);
    checkedTiles.add(idx);
  }

  static isTileChecked(x, y) {
    const idx = this.tileIdx(x, y);
    return checkedTiles.has(idx);
  }

  static clearCheckedTiles() {
    checkedTiles.clear();
  }

  static markEventAsChecked(event) {
    if (this.blockRepeatedTouchEvents && event.isTriggerIn([1, 2])) {
      this.markTileAsChecked(event.x, event.y);
    }
  }
}

globalThis.CycloneMovement = CycloneMovement;
CycloneMovement.register();

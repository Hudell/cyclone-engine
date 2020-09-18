import { CyclonePlugin } from '../../Core/main';
import { LZString } from '../../Libs/lz-string.min';
import { DirectionHelper } from '../../Utils/DirectionHelper';

let currentMapCollisionTable = false;

class CycloneMovement extends CyclonePlugin {
  static register() {
    super.initialize('CycloneMovement');

    super.register({
      stepCount: {
        type: 'int',
        defaultValue: 1,
      },
      collisionStepCount: {
        type: 'int',
        defaultValue: 1,
      },
      followerStepsBehind: {
        type: 'int',
        defaultValue: 3,
      },
      triggerAllEvents: 'boolean',
      ignoreEmptyEvents: {
        type: 'boolean',
        defaultValue: true,
      },
      autoLeaveVehicles: 'boolean',
      diagonalPathfinding: {
        type: 'boolean',
        defaultValue: true,
      },
      disableMouseMovement: 'boolean',
      maxOffset: {
        type: 'float',
        defaultValue: 0.75,
      },
      sidestepEvents: 'boolean',
    });

    this.stepCount = [1, 2, 4].includes(this.params.stepCount) ? this.params.stepCount : 1;
    this.collisionStepCount = Math.min(this.stepCount, [1, 2, 4].includes(this.params.collisionStepCount) ? this.params.collisionStepCount : 1);
    this.stepSize = 1 / this.stepCount;
    this.collisionSize = 1 / this.collisionStepCount;
    this.followerStepsBehind = Number(this.params.followerStepsBehind || 1).clamp(1, this.stepCount);
    this.triggerAllEvents = this.params.triggerAllEvents === true;
    this.autoLeaveVehicles = this.params.autoLeaveVehicles === true;
    this.ignoreEmptyEvents = this.params.ignoreEmptyEvents !== false;
    this.diagonalPathfinding = this.params.diagonalPathfinding !== false;
    this.disableMouseMovement = this.params.disableMouseMovement === true;
  }

  static get currentMapCollisionTable() {
    return currentMapCollisionTable;
  }

  static isRoundNumber(n) {
    return Math.floor(n) === n;
  }

  static goesLeft(d) {
    return DirectionHelper.goesLeft(d);
  }

  static goesRight(d) {
    return DirectionHelper.goesRight(d);
  }

  static goesUp(d) {
    return DirectionHelper.goesUp(d);
  }

  static goesDown(d) {
    return DirectionHelper.goesDown(d);
  }

  static isDiagonal(d) {
    return DirectionHelper.isDiagonal(d);
  }

  static isVertical(d) {
    return DirectionHelper.isVertical(d);
  }

  static isHorizontal(d) {
    return DirectionHelper.isHorizontal(d);
  }

  static shareADirection(dir1, dir2) {
    return DirectionHelper.shareADirection(dir1, dir2);
  }

  static getFirstDirection(diagonalDirection) {
    return DirectionHelper.getFirstDirection(diagonalDirection);
  }

  static getAlternativeDirection(direction, diagonalDirection) {
    return DirectionHelper.getAlternativeDirection(direction, diagonalDirection);
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

  static decompress(data) {
    if (!data.startsWith('v=')) {
      return LZString.decompress(data);
    }

    const idx = data.indexOf(';') + 1;
    return LZString.decompressFromBase64(data.substring(idx));
  }

  static parseCollisionData(note) {
    let json;
    try {
      json = this.decompress(note);
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
    if (!$gameMap?._loaded) {
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

  static applySingleTileCollision(x, y, blockUp, blockDown, blockLeft, blockRight) {
    const collision = this._mergeCustomCollisionValues(blockUp, blockDown, blockLeft, blockRight) || 1;
    this.setBlockCollision(x, y, collision);
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

  static applyTileCornerCollision(x, y, horz, vert, collision) {
    const size = this.collisionSize;

    const blockY = vert === 2 ? y + 1 - size : y;
    const blockX = horz === 6 ? x + 1 - size : x;

    this.setBlockCollision(blockX, blockY, collision);
  }

  static collisionIndex(x, y, useEditorStepCount = false) {
    const stepCount = useEditorStepCount ? 4 : this.collisionStepCount;

    const intX = Math.floor(x * stepCount);
    const intY = Math.floor(y * stepCount);
    const height = $gameMap.height() * stepCount;
    const width = $gameMap.width() * stepCount;
    return (intY % height) * width + (intX % width);
  }

  // eslint-disable-next-line complexity
  static _mergeCustomCollisionValues(blockUp, blockDown, blockLeft, blockRight) {
    if (blockLeft && blockRight && blockDown && blockUp) {
      return 20;
    }

    if (blockUp) {
      if (blockLeft) {
        if (blockRight) {
          return 22;
        }
        return 17;
      }
      if (blockRight) {
        if (blockDown) {
          return 24;
        }
        return 19;
      }

      if (blockDown) {
        return 4;
      }

      return 18;
    }

    if (blockDown) {
      if (blockLeft) {
        if (blockRight) {
          return 28;
        }

        return 11;
      }
      if (blockRight) {
        return 13;
      }
      return 12;
    }

    if (blockLeft) {
      if (blockRight) {
        return 5;
      }
      return 14;
    }

    if (blockRight) {
      return 16;
    }
  }

  // If the collision is using less than 4 blocks per tile, then merge the sub-blocks into bigger blocks.
  // This is needed for the directional passabilities to work properly
  // eslint-disable-next-line complexity
  static _mergeCustomCollisions(x, y, data) {
    const radix = data.radix ?? 10;
    if (this.collisionStepCount === 4) {
      const editorIndex = this.collisionIndex(x, y);
      return parseInt(data.collision[editorIndex], radix) || 0;
    }

    // merge every sub-block into a single one
    const diffCount = Math.floor(4 / this.collisionStepCount);
    const diffSize = 1 / diffCount;
    let result = false;
    let blockUp = false;
    let blockDown = false;
    let blockRight = false;
    let blockLeft = false;

    for (let blockX = 0; blockX < diffCount; blockX++) {
      for (let blockY = 0; blockY < diffCount; blockY++) {
        const editorIndex = this.collisionIndex(x + blockX * diffSize, y + blockY * diffSize, true);
        const customCollision = parseInt(data.collision[editorIndex], radix) || 0;

        if (customCollision === 2) {
          return 2;
        }

        let goesUp = false;
        let goesLeft = false;
        let goesRight = false;
        let goesDown = false;

        if (customCollision >= 20) {
          const d = customCollision - 20;
          goesUp = !DirectionHelper.goesUp(d);
          goesLeft = !DirectionHelper.goesLeft(d);
          goesRight = !DirectionHelper.goesRight(d);
          goesDown = !DirectionHelper.goesDown(d);
        } else if (customCollision > 10) {
          const d = customCollision - 10;
          goesUp = DirectionHelper.goesUp(d);
          goesLeft = DirectionHelper.goesLeft(d);
          goesRight = DirectionHelper.goesRight(d);
          goesDown = DirectionHelper.goesDown(d);
        } else if (customCollision === 4) {
          goesUp = true;
          goesDown = true;
        } else if (customCollision === 5) {
          goesLeft = true;
          goesRight = true;
        } else {
          if (result === false) {
            result = customCollision;
          }
          continue;
        }

        if (goesUp && blockY === 0) {
          blockUp = true;
        }

        if (goesDown && blockY === diffCount - 1) {
          blockDown = true;
        }

        if (goesLeft && blockX === 0) {
          blockLeft = true;
        }

        if (goesRight && blockX === diffCount - 1) {
          blockRight = true;
        }
      }
    }

    return this._mergeCustomCollisionValues(blockUp, blockDown, blockLeft, blockRight) || result || 0;
  }

  static setupCustomCollision(compressedData) {
    const data = CycloneMovement.parseCollisionData(compressedData);
    if (!data || !data.collision) {
      return;
    }

    const increment = this.collisionSize;

    for (let x = 0; x < $dataMap.width; x += increment) {
      for (let y = 0; y < $dataMap.height; y += increment) {
        const customCollision = this._mergeCustomCollisions(x, y, data);
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

    if (collision === 2) {
      return false;
    }

    if (collision >= 20) {
      const unblockedDirection = collision - 20;
      if (!this.shareADirection(d, unblockedDirection)) {
        return false;
      }
    } else if (collision > 10) {
      const blockedDirection = collision - 10;

      if (this.shareADirection(d, blockedDirection)) {
        return false;
      }
    } else if (collision === 4) {
      if (DirectionHelper.goesUp(d) || DirectionHelper.goesDown(d)) {
        return false;
      }
    } else if (collision === 5) {
      if (DirectionHelper.goesLeft(d) || DirectionHelper.goesRight(d)) {
        return false;
      }
    }

    return true;
  }

  static applyTileCollision(x, y, down, left, right, up) {
    if (down === left && down === right && down === up) {
      this.applyFullTileCollision(x, y, down ? 1 : 2);
      return;
    }

    if (CycloneMovement.collisionStepCount === 1) {
      this.applySingleTileCollision(x, y, !up, !down, !left, !right);
      return;
    }

    this.applyFullTileCollision(x, y, 1);

    if (!left) {
      this.applyTileDirectionCollision(x, y, 4, 14);
    }

    if (!right) {
      this.applyTileDirectionCollision(x, y, 6, 16);
    }

    if (!down) {
      this.applyTileDirectionCollision(x, y, 2, 12);

      if (!left) {
        this.applyTileCornerCollision(x, y, 4, 2, 11);
      }
      if (!right) {
        this.applyTileCornerCollision(x, y, 6, 2, 13);
      }
    }

    if (!up) {
      this.applyTileDirectionCollision(x, y, 8, 18);

      if (!left) {
        this.applyTileCornerCollision(x, y, 4, 8, 17);
      }
      if (!right) {
        this.applyTileCornerCollision(x, y, 6, 8, 19);
      }
    }
  }

  static tileIdx(x, y) {
    const width = $dataMap.width;
    return y * width + x || 0;
  }
}

globalThis.CycloneMovement = CycloneMovement;
CycloneMovement.register();

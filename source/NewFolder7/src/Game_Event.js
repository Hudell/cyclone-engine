/* eslint-disable complexity */
import { CustomEventDataPageMoveRoute } from '../../Shared/CustomEventDataPageMoveRoute';

CycloneNewFolder7.patchClass(Game_Event, $super => class {
  initialize(...args) {
    $super.initialize.call(this, ...args);
    this._usedTurn = false;
  }

  setMoveRoute(...args) {
    const eventData = this.event();
    if (!eventData?.animation?.list) {
      this._hasAnimation = false;
      return $super.setMoveRoute.call(this, ...args);
    }

    this.setAnimation(eventData.animation);
  }

  setupPageSettings(...args) {
    $super.setupPageSettings.call(this, ...args);
    const page = this.page();

    if (page.animation) {
      this.setAnimation(page.animation);
    }
  }

  update(...args) {
    $super.update.call(this, ...args);
    if (!this._range && this.isTroop()) {
      this.buildRange(this.maxDistance());
    }
  }

  updateMove(...args) {
    $super.updateMove.call(this, ...args);

    if (!this.isTroop()) {
      return;
    }

    // this.ensureCamera();
    if (this._direction === 2) {
      this.setWalkAnimation();
    }

    // If there's an animation, process it even during movement
    if (this._hasAnimation) {
      this.moveTypeCustom();
    }
  }

  get name() {
    return this.event().name;
  }

  isTroop() {
    if (this._erased) {
      return;
    }

    return ['warrior', 'archer', 'pawn'].includes(this.name);
  }

  isBuilding() {
    return ['castle', 'tower'].includes(this.name);
  }

  isBlocker() {
    return this.isTroop() || this.isBuilding() || this.name === 'tree';
  }

  isMovementBlocker() {
    return this.isNormalPriority() && !this.isTroop() && !this.isBuilding();
  }

  clearDestination() {
    this._xDestination = undefined;
    this._yDestination = undefined;
  }

  updateStop(...args) {
    $super.updateStop.call(this, ...args);

    if (!this.isTroop()) {
      return;
    }

    if (this._xDestination !== undefined && this._yDestination !== undefined) {
      if (this._xDestination == this._x && this._yDestination == this._y) {
        // If the character reached the destination, check if there's a direction to face
        this.clearDestination();
      }

      if (this._xDestination !== undefined) {
        if (!this.isMoving()) {
          // const xDistance = this._x - this._xDestination;
          // const yDistance = this._y - this._yDestination;

          const direction = this.findDirectionTo(this._xDestination, this._yDestination);
          if (direction > 0) {
            this.walk(direction, 1);
            return;
          }
        }
      }
    }

    if (this._direction === 4) {
      this._direction = 2;
      $gameMap.setTerritory(this._x, this._y, this.color);
      this.buildRange(this.maxDistance());
      CycloneNewFolder7.endMovement();
    }
  }

  maxDistance() {
    return 6;
  }

  updatePattern(...args) {
    if (this._hasAnimation) {
      return;
    }

    $super.updatePattern.call(this, ...args);
  }

  setAnimation(animation) {
    this._hasAnimation = true;
    const moveRoute = new CustomEventDataPageMoveRoute();
    const list = [];

    for (const item of animation.list) {
      const lines = [];
      if ('direction' in item) {
        lines.push(`this._direction = ${item.direction}`);
      }
      if ('pattern' in item) {
        lines.push(`this._pattern = ${item.pattern}`);
      }
      if ('characterIndex' in item) {
        lines.push(`this._characterIndex = ${item.characterIndex}`);
      }
      if ('mirror' in item) {
        lines.push(`this._mirror = ${item.mirror}`);
      }
      if ('script' in item) {
        lines.push(item.script);
      }

      list.push({
        code: 45,
        parameters: [
          lines.join('; '),
        ],
        indent: 0,
      });

      if ((item.wait || animation.framesBetweenChanges) && item.wait !== 0) {
        list.push({
          code: 15,
          parameters: [item.wait || animation.framesBetweenChanges],
          indent: 0,
        });
      }
    }

    list.push({
      code: 0,
      parameters: [],
    });

    moveRoute.list = list;
    $super.setMoveRoute.call(this, moveRoute);
  }

  setImage(characterName, ...args) {
    $super.setImage.call(this, characterName, ...args);

    if (this._characterName) {
      const match = this._characterName.match(/\[(\d+),(\d+)\]/) || false;
      if (match && match.length === 3) {
        const [, columns, rows] = match;

        this._numSpriteColumns = parseInt(columns);
        this._numSpriteRows = parseInt(rows);
        this._isBigCharacter = true;
        return;
      }
    }

    this._numSpriteColumns = undefined;
    this._numSpriteRows = undefined;
  }

  maxPattern() {
    if (!this._numSpriteColumns || !this._numSpriteRows) {
      return 3;
    }

    return this._numSpriteColumns;
  }

  pattern() {
    return this._pattern;
  }

  setTileImage(...args) {
    $super.setTileImage.call(this, ...args);
    this._numSpriteColumns = undefined;
    this._numSpriteRows = undefined;
  }

  screenX() {
    const base = $super.screenX.call(this);

    if (this.name === 'tower') {
      return base + 32;
    }

    return base + (this.event()?.xOffset || 0);
  }

  screenY() {
    const base = $super.screenY.call(this);

    if (this.name === 'tower') {
      return base + 20;
    }

    return base + (this.event()?.yOffset || 0);
  }

  walk(direction, distance = 1) {
    switch(direction) {
      case 1:
        this.walkTo(this._x - distance, this._y + distance);
        break;
      case 2:
        this.walkTo(this._x, this._y + distance);
        break;
      case 3:
        this.walkTo(this._x + distance, this._y + distance);
        break;
      case 4:
        this.walkTo(this._x - distance, this._y);
        break;
      case 6:
        this.walkTo(this._x + distance, this._y);
        break;
      case 7:
        this.walkTo(this._x - distance, this._y - distance);
        break;
      case 8:
        this.walkTo(this._x, this._y - distance);
        break;
      case 9:
        this.walkTo(this._x + distance, this._y - distance);
        break;
    }
  }

  walkTo(x, y) {
    this._usedTurn = true;
    // this.ensureCamera();
    if ($gameMap.distance(x, y, this._x, this._y) <= 1) {
      this._realX = this._x;
      this._realY = this._y;

      this._x = x;
      this._y = y;

      if (this._realX !== this._x) {
        this._mirror = this._realX > this._x;
      }

      this._direction = 4;
      return;
    }

    this._xDestination = x;
    this._yDestination = y;
  }

  canPass(x, y, d) {
    if (x !== this._x || y !== this._y) {
      if (!$gameMap._territories.find((t) => t.x === x && t.y === y && t.color === this.color)) {
        return false;
      }
    }

    return $super.canPass.call(this, x, y, d);
  }

  canGoUp(x, y) {
    if (x !== this._x || y !== this._y) {
      if (!$gameMap.findTerritory(x, y, this.color)) {
        if (!$gameMap.findTerritory(x, y-1, this.color)) {
          return false;
        }
      }
    }

    return $super.canGoUp.call(this, x, y);
  }

  canGoDown(x, y) {
    if (x !== this._x || y !== this._y) {
      if (!$gameMap.findTerritory(x, y, this.color)) {
        if (!$gameMap.findTerritory(x, y +1, this.color)) {
          return false;
        }
      }
    }

    return $super.canGoDown.call(this, x, y);
  }

  canGoLeft(x, y) {
    if (x !== this._x || y !== this._y) {
      if (!$gameMap.findTerritory(x, y, this.color)) {
        if (!$gameMap.findTerritory(x - 1, y, this.color)) {
          return false;
        }
      }
    }

    return $super.canGoLeft.call(this, x, y);
  }

  canGoRight(x, y) {
    if (x !== this._x || y !== this._y) {
      if (!$gameMap.findTerritory(x, y, this.color)) {
        if (!$gameMap.findTerritory(x + 1, y)) {
          return false;
        }
      }
    }

    return $super.canGoRight.call(this, x, y);
  }

  flagConnectedTiles() {
    if (this.name !== 'castle') {
      return;
    }

    $gameMap.unflagArmyTerritory(this.color);
    const checkedTiles = [];
    let currentTiles = [{ x: this._x, y: this._y }];
    let count = 0;

    while (currentTiles.length > 0) {
      const newTiles = [];
      for (const tile of currentTiles) {
        if (checkedTiles.find((t) => t.x === tile.x && t.y === tile.y)) {
          continue;
        }

        checkedTiles.push(tile);
        const territory = $gameMap.findTerritory(tile.x, tile.y, this.color);
        if (!territory) {
          continue;
        }
        territory.connected = true;
        count++;

        newTiles.push({ x: tile.x - 1, y: tile.y });
        newTiles.push({ x: tile.x + 1, y: tile.y });
        newTiles.push({ x: tile.x, y: tile.y - 1 });
        newTiles.push({ x: tile.x, y: tile.y + 1 });
      }

      currentTiles = newTiles;
    }

    this._connectedTiles = count;
    return count;
  }

  buildRange(maxDistance) {
    this._range = [];

    if (!this.isTroop() || this._usedTurn) {
      return;
    }

    let currentTiles = [{ x: this._x, y: this._y }];

    for (let distance = 1; distance <= maxDistance; distance++) {
      const newTiles = [];
      for (const tile of currentTiles) {
        if (!$gameMap.findTerritory(tile.x, tile.y)) {
          if (tile.x !== this._x || tile.y !== this._y) {
            continue;
          }
        }
        const tilesToTry = [
          { x: tile.x - 1, y: tile.y, d: 4 },
          { x: tile.x + 1, y: tile.y, d: 6 },
          { x: tile.x, y: tile.y - 1, d: 8 },
          { x: tile.x, y: tile.y + 1, d: 2 },
        ];

        for (const tileToTry of tilesToTry) {
          if (newTiles.find((t) => t.x === tileToTry.x && t.y === tileToTry.y)) {
            continue;
          }
          const existingTile = this._range.find((t) => t.x === tileToTry.x && t.y === tileToTry.y);
          if (existingTile?.canPass) {
            continue;
          }

          const canPass = this.canPass(tile.x, tile.y, tileToTry.d);
          if (canPass) {
            newTiles.push({
              x: tileToTry.x,
              y: tileToTry.y,
            });
          }
          if (existingTile) {
            existingTile.canPass = canPass;
          } else {
            this._range.push({
              x: tileToTry.x,
              y: tileToTry.y,
              canPass,
              free: $gameMap.isTileFree(tileToTry.x, tileToTry.y),
            });
          }
        }
      }

      currentTiles = newTiles;
    }
  }

  canWalkTo(x, y) {
    const maxDistance = this.maxDistance();
    const distance = $gameMap.distance(x, y, this._x, this._y);

    if (distance > maxDistance) {
      return false;
    }

    if (!$gameMap.isTileFree(x, y, this.color)) {
      return false;
    }

    if (!this._range.length) {
      this.buildRange(maxDistance);
    }

    return this._range.find((t) => t.x === x && t.y === y && t.canPass);
  }

  isCollidedWithEvents(x, y) {
    const events = $gameMap.eventsXyNt(x, y).filter((e) => e.isMovementBlocker());

    return events.length > 0;
  }

  setWalkAnimation() {
    this._direction = 4;
    this.setAnimation({
      framesBetweenChanges: 6,
      list: [
        { pattern: 0 },
        { pattern: 1 },
        { pattern: 2 },
        { pattern: 3 },
        { pattern: 4 },
        { pattern: 5 },
      ]
    });
  }

  setCutLumberAnimation() {
    this._direction = 8;
    this.setAnimation({
      framesBetweenChanges: 6,
      list: [
        { pattern: 0 },
        { pattern: 1 },
        { pattern: 2 },
        { pattern: 3, script: 'this.hitTree();' },
        { pattern: 4 },
        { pattern: 5 },
      ]
    });
  }

  selectTroop() {
    if (this._moved) {
      return;
    }

    $gameMap._selectedX = this._x;
    $gameMap._selectedY = this._y;
    $gameMap._addingTroop = false;

    this.buildRange(this.maxDistance());
  }

  hitTree() {
    const tree = $gameMap.eventsXy(this._x - 1, this._y).find((e) => e.event()?.name === 'tree');
    if (!tree) {
      return;
    }

    tree.setTreeHitAnimation();
  }

  setTreeHitAnimation() {
    this._pattern = 2;
    this._direction = 4;
    this.setAnimation({
      framesBetweenChanges: 6,
      list: [
        { pattern: 1, direction: 4 },
        { pattern: 1, direction: 2 },
        {
          pattern: 0, direction: 2,
          script: 'this.endTreeHitAnimation();',
        }
      ],
    });
  }

  endTreeHitAnimation() {
    this._pattern = 0;
    this._direction = 2;
    this.setAnimation({
      framesBetweenChanges: 6,
      list: [
        { pattern: 0, direction: 2 },
        { pattern: 1, direction: 2 },
        { pattern: 2, direction: 2 },
        { pattern: 0, direction: 4 },
      ],
    });
  }

  setSelfSwitch(letter, value = true) {
    $gameSelfSwitches.setValue([$gameMap._mapId, this._eventId, letter], value);
  }

  doSomething() {
    // this.ensureCamera();
    this.buildRange(this.maxDistance());

    const freeBlocks = this._range.filter((t) => t.free && t.canPass);
    if (!freeBlocks.length) {
      this._usedTurn = true;
      return;
    }
    const newBlocks = freeBlocks.filter((t) => !$gameMap.findTerritory(t.x, t.y, this.color));
    if (newBlocks.length) {
      const idx = Math.randomInt(newBlocks.length);
      const tile = newBlocks[idx];
      this.walkTo(tile.x, tile.y);
      return;
    }

    const idx = Math.randomInt(freeBlocks.length);
    const tile = freeBlocks[idx];
    this.walkTo(tile.x, tile.y);
  }

  center(x, y) {
    return $gameMap.setCenterPos(x, y);
  }

  ensureCamera() {
    if ($gameMap.isScrolling()) {
      return;
    }

    const targetX = (this._xDestination ?? this._x) - $gameMap.centerX();
    const targetY = (this._yDestination ?? this._y) - $gameMap.centerY();

    $gameMap.scrollTo(targetX, targetY);
  }

});

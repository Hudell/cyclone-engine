import { buildEventPageMetadata } from '../../Utils/buildEventPageMetadata';

const uselessCommands = Object.freeze([
  // comments
  108,
  408,
  // label
  118,
  // end of list
  0,
]);

CycloneMovement.patchClass(Game_Event, $super => class {
  get defaultWidth() {
    return this._defaultWidth;
  }
  get defaultHeight() {
    return this._defaultHeight;
  }
  get defaultHitboxX() {
    return this._defaultHitboxX;
  }
  get defaultHitboxY() {
    return this._defaultHitboxY;
  }

  refresh() {
    $super.refresh.call(this);

    this._defaultWidth = 1;
    this._defaultHeight = 1;
    this._defaultHitboxX = 0;
    this._defaultHitboxY = 0;

    const page = this.page();
    if (!page) {
      return;
    }

    buildEventPageMetadata(page);
    this._defaultWidth = this.getHitboxValue(page.meta, 'hitboxWidth', this._defaultWidth, $gameMap.tileWidth());
    this._defaultHeight = this.getHitboxValue(page.meta, 'hitboxHeight', this._defaultHeight, $gameMap.tileHeight());
    this._defaultHitboxX = this.getHitboxValue(page.meta, 'hitboxX', this._defaultHitboxX, $gameMap.tileWidth());
    this._defaultHitboxY = this.getHitboxValue(page.meta, 'hitboxY', this._defaultHitboxY, $gameMap.tileHeight());
  }

  getWidth() {
    return this.defaultWidth;
  }
  getHeight() {
    return this.defaultHeight;
  }

  getHitboxX() {
    return this.defaultHitboxX;
  }

  getHitboxY() {
    return this.defaultHitboxY;
  }

  getHitboxValue(meta, tagName, defaultValue, tileSize) {
    if (meta[tagName] && meta[tagName] !== '0') {
      return Math.floor(parseInt(meta[tagName]) / tileSize * 8) / 8;
    }

    if (meta[tagName] === '0' || meta[tagName] === 0) {
      return 0;
    }

    return defaultValue;
  }

  turnTowardPlayer() {
    const sx = this.deltaXFrom($gamePlayer.x);
    const sy = this.deltaYFrom($gamePlayer.y);

    const asx = Math.abs(sx);
    const asy = Math.abs(sy);

    if (asx < 1 && asy < 1) {
      this.setDirection(10 - $gamePlayer._direction);
      return;
    }

    if (asx > asy) {
      this.setDirection(sx > 0 ? 4 : 6);
      return;
    }

    if (sy !== 0) {
      this.setDirection(sy > 0 ? 8 : 2);
    }
  }

  turnAwayFromPlayer() {
    const sx = this.deltaXFrom($gamePlayer.x);
    const sy = this.deltaYFrom($gamePlayer.y);
    const asx = Math.abs(sx);
    const asy = Math.abs(sy);

    if (asx < 1 && asy < 1) {
      this.setDirection($gamePlayer._direction);
      return;
    }

    if (asx > asy) {
      this.setDirection(sx > 0 ? 6 : 4);
      return;
    }

    if (sy !== 0) {
      this.setDirection(sy > 0 ? 2 : 8);
    }
  }

  hasAnythingToRun() {
    if (!CycloneMovement.ignoreEmptyEvents) {
      return true;
    }

    for (const command of this.list()) {
      if (uselessCommands.includes(Number(command.code))) {
        continue;
      }

      return true;
    }

    return false;
  }

  moveStraight(d) {
    this._lastMove = d;
    return $super.moveStraight.call(this, d);
  }

  moveDiagonally(horz, vert) {
    this._lastMove = { horz, vert };
    return $super.moveDiagonally.call(this, horz, vert);
  }

  repeatMovement() {
    if (!this._repeatMovementCount) {
      return false;
    }

    this._repeatMovementCount--;
    if (!this._lastMove) {
      return true;
    }

    if (typeof this._lastMove === 'number') {
      this.moveStraight(this._lastMove);
      return true;
    }

    if (typeof this._lastMove === 'object') {
      this.moveDiagonally(this._lastMove.horz, this._lastMove.vert);
      return true;
    }

    return true;

  }

  runMoveType(fn) {
    if (this.repeatMovement()) {
      return;
    }

    this._lastMove = 0;
    fn.call(this);

    if (!CycloneMovement.params.applyToEvents || CycloneMovement.params.stepCount === 1) {
      return;
    }

    if (!this._lastMove) {
      return;
    }

    this._repeatMovementCount = Math.max(CycloneMovement.params.stepCount - 1, 0);
  }

  moveTypeRandom() {
    return this.runMoveType($super.moveTypeRandom);
  }

  moveTypeTowardPlayer() {
    return this.runMoveType($super.moveTypeTowardPlayer);
  }

  repeatCommand() {
    if (!this._repeatCommandCount) {
      return false;
    }

    if (!this._lastCommand) {
      return false;
    }

    this.setMovementSuccess(true);
    this.processMoveCommand(this._lastCommand);

    const { skippable } = this._moveRoute || { skippable: true };
    if (this.isMovementSucceeded() || skippable) {
      this._repeatCommandCount--;
    }

    return true;
  }

  updateRoutineMove() {
    if (!CycloneMovement.params.applyToEvents || CycloneMovement.params.stepCount === 1) {
      return $super.updateRoutineMove.call(this);
    }

    if (this.repeatCommand()) {
      if (!this._repeatCommandCount) {
        this.advanceMoveRouteIndex();
      }
      return;
    }

    if (this._waitCount > 0) {
      this._waitCount--;
      return;
    }

    this.setMovementSuccess(true);
    const command = this._moveRoute.list[this._moveRouteIndex];
    if (!command) {
      return;
    }

    this._lastCommand = command;
    this._repeatCommandCount = 0;
    this.processMoveCommand(command);

    if (command.code > 0 && command.code <= 13 && this.isMovementSucceeded()) {
      this._repeatCommandCount = Math.max(CycloneMovement.params.stepCount - 1, 0);
    }

    if (!this._repeatCommandCount) {
      this.advanceMoveRouteIndex();
    }
  }
});

CycloneAsync.patchClass(Game_Interpreter, $super => class {
  command111(params, ...args) {
    const [code, value] = params;
    if (code !== 12) {
      return $super.command111.call(this, params, ...args);
    }

    const script = value.trim().toLowerCase();
    if (script !== 'async') {
      return $super.command111.call(this, params, ...args);
    }

    this._branch[this._indent] = false;
    this.loadCurrentBlock();
    this.skipBranch();
    return true;
  }

  loadCurrentBlock() {
    const commandList = [];
    let index = this._index + 1;

    while (this._list[index].indent > this._indent) {
      const newBlock = { ...this._list[index] };
      newBlock.indent -= (this._indent + 1);

      commandList.push(newBlock);
      index++;
    }

    const eventId = this.isOnCurrentMap() ? this._eventId : 0;
    $gameMap.addAsyncBlock(commandList, this._depth + 1, eventId);
  }

  waitForAsyncJobs() {
    this.setWaitMode('async');
  }

  updateWaitMode() {
    if (this._waitMode !== 'async') {
      return $super.updateWaitMode.call(this);
    }

    if ($gameMap.hasAsyncRunning()) {
      return true;
    }

    this._waitMode = '';
    return false;
  }
});

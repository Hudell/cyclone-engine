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

    const child = new Game_Interpreter(this._depth + 1);
    const eventId = this.isOnCurrentMap() ? this._eventId : 0;
    console.log(commandList);
    child.setup(commandList, eventId);

    this._asyncInterpreters.push(child);
  }

  clear() {
    $super.clear.call(this);
    this._asyncInterpreters = [];
  }

  hasAsyncRunning() {
    return this._asyncInterpreters.find(child => child.isRunning());
  }

  waitForAsyncJobs() {
    this.setWaitMode('async');
  }

  killAsyncJobs() {
    this._asyncInterpreters = [];
  }

  updateWaitMode() {
    if (this._waitMode !== 'async') {
      return $super.updateWaitMode.call(this);
    }

    if (this.hasAsyncRunning()) {
      return true;
    }

    this._waitMode = '';
    return false;
  }

  updateAsync() {
    let needsFiltering = false;

    for (const child of this._asyncInterpreters) {
      if (!child) {
        continue;
      }

      child.update();
      if (!child.isRunning()) {
        needsFiltering = true;
      }
    }

    if (needsFiltering) {
      this._asyncInterpreters = this._asyncInterpreters.filter(child => child.isRunning());
    }
  }

  updateChild() {
    this.updateAsync();
    $super.updateChild.call(this);
  }
});

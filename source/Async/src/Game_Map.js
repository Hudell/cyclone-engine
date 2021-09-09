CycloneAsync.patchClass(Game_Map, $super => class {
  update(...args) {
    this.updateAsync();
    $super.update.call(this, ...args);
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

  hasAsyncRunning() {
    return this._asyncInterpreters.find(child => child.isRunning());
  }

  killAsyncJobs() {
    this._asyncInterpreters = [];
  }

  initialize(...args) {
    $super.initialize.call(this, ...args);
    this._asyncInterpreters = [];
  }

  setup(...args) {
    $super.setup.call(this, ...args);
    this._asyncInterpreters = [];
  }

  addAsyncBlock(commandList, depth = 0, eventId = 0) {
    const child = new Game_Interpreter(depth);

    child.setup(commandList, eventId);

    this._asyncInterpreters.push(child);
  }
});

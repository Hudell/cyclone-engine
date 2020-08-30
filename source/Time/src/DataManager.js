CycloneTime.patchClass(DataManager, $super => class {
  static makeSaveContents() {
    const contents = $super.makeSaveContents.call(this);
    contents.cycloneTime = CycloneTime.getData();

    return contents;
  }

  static extractSaveContents(contents) {
    $super.extractSaveContents.call(this, contents);

    if (contents.cycloneTime !== undefined) {
      CycloneTime.setData(contents.cycloneTime);
    }
  }

  static setupNewGame() {
    $super.setupNewGame.call(this);
    CycloneTime.disableTime();
    CycloneTime.loadInitialTime();
    CycloneTime.enableTime();
  }
});
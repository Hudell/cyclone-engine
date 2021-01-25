CycloneAurora.patchClass(ImageManager, $super => class {
  static loadLight(fileName) {
    return this.loadBitmap(`img/lights/${ fileName }`);
  }
});

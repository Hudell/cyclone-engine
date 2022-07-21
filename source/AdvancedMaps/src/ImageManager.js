CycloneAdvancedMaps.patchClass(ImageManager, $super => class {
  static loadTileset(filename) {
    const customPath = CycloneAdvancedMaps.params.tilesetPath;
    if (customPath) {
      return this.loadBitmap(customPath, filename);
    }

    return $super.loadTileset.call(this, filename);
  }
});

CycloneAdvancedMaps.patchClass(Sprite_Balloon, $super => class {
  initMembers() {
    $super.initMembers.call(this);
    const balloonZ = CycloneAdvancedMaps.params.balloonZ;

    // Only apply if we have a valid Z different from the default
    if (balloonZ !== 0 && balloonZ !== 7) {
      this.z = balloonZ;
    }
  }
});

CycloneMaps.patchClass(Sprite_Animation, $super => class {
  initMembers() {
    $super.initMembers.call(this);
    const animationZ = CycloneMaps.params.animationZ;

    // Only apply if we have a valid Z different from the default
    if (animationZ !== 0 && animationZ !== 8) {
      this.z = animationZ;
    }
  }
});
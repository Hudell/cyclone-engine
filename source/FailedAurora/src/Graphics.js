CycloneAurora.patchClass(Graphics, $super => class {
  static initialize() {
    const result = $super.initialize.call(this);

    const { renderer } = this._app;
    const { gl } = renderer;

    // makes the source semi-transparent and the dest opaque?
    renderer.state.blendModes[31] = [gl.SRC_ALPHA, gl.ONE];
    // applies the source color to the dest?
    renderer.state.blendModes[32] = [gl.ZERO, gl.SRC_COLOR];

    return result;
  }
});

export class AuroraLight {
  get intensity() {
    return this._intensity;
  }

  get red() {
    return this._red;
  }

  get green() {
    return this._green;
  }

  get blue() {
    return this._blue;
  }

  initialize() {
    this.reset();
  }

  reset() {
    this._intensity = 1.0;
    this._red = 1.0;
    this._green = 1.0;
    this._blue = 1.0;
    this._targetIntensity = this._intensity;
    this._targetRed = this._red;
    this._targetGreen = this._green;
    this._targetBlue = this._blue;
    this._deltaIntensity = 0.0;
    this._deltaRed = 0.0;
    this._deltaGreen = 0.0;
    this._deltaBlue = 0.0;

    this._timer = 0;
    this._intensityTimer = 0;
  }

  update() {
    if (this._timer > 0) {
      this._timer--;
      this.applyDelta();
    }

    if (this._intensityTimer > 0) {
      this._intensityTimer--;
      this.applyIntensityDelta();
    }
  }

  updateDelta() {
    if (this._timer > 0) {
      this._deltaRed = (this._targetRed - this._red) / this._timer;
      this._deltaGreen = (this._targetGreen - this._green) / this._timer;
      this._deltaBlue = (this._targetBlue - this._blue) / this._timer;
      return;
    }

    this.applyTarget();
  }

  updateIntensityDelta() {
    if (this._intensityTimer > 0) {
      this._deltaIntensity = (this._targetIntensity - this._intensity) / this._timer;
      return;
    }

    this._intensity = this._targetIntensity;
  }

  setTargetColor(red, green, blue, time) {
    this._targetRed = red;
    this._targetGreen = green;
    this._targetBlue = blue;
    this._timer = time;

    this.updateDelta();
  }

  setTargetIntensity(intensity, time) {
    this._targetIntensity = intensity;
    this._intensityTimer = time;

    this.updateIntensityDelta();
  }

  applyDelta() {
    if (this._timer <= 0) {
      this.applyTarget();
      return;
    }

    this._red += this._deltaRed;
    this._green += this._deltaGreen;
    this._blue += this._deltaBlue;
  }

  applyIntensityDelta() {
    if (this._intensityTimer <= 0) {
      this._intensity = this._targetIntensity;
      return;
    }

    this._intensity += this._deltaIntensity;
  }

  applyTarget() {
    this._red = this._targetRed;
    this._green = this._targetGreen;
    this._blue = this._targetBlue;
  }
}
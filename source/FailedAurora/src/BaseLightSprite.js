export class BaseLightSprite extends PIXI.Sprite {
  constructor(...args) {
    super(...args);
    this.initialize(...args);
  }

  initialize() {
  }

  addFilter(filter) {
    if (this.filters) {
      this.filters.push(filter);
    } else {
      this.filters = [filter];
    }
  }

  removeFilter(filter) {
    if (!this.filters?.length) {
      return;
    }

    if (this.filters.includes(filter)) {
      this.filters.remove(filter);
    }
  }
}
const hiddenIcon = new Image();
hiddenIcon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9bpUUqgmYo4pChdbIgKuIoVSyChdJWaNXB5NIvaGJIUlwcBdeCgx+LVQcXZ10dXAVB8APEydFJ0UVK/F9SaBHjwXE/3t173L0D/M0aU82ecUDVLCOTTIj5wooYfEUIEQgYRExipp7KLuTgOb7u4ePrXZxneZ/7c/QrRZMBPpF4lumGRbxOPL1p6Zz3iQVWkRTic+Ixgy5I/Mh12eU3zmWH/TxTMHKZOWKBWCx3sdzFrGKoxFPEUUXVKN+fd1nhvMVZrdVZ+578heGitpzlOs0RJLGIFNIQIaOOKmqwEKdVI8VEhvYTHv5hx58ml0yuKhg55rEBFZLjB/+D392apckJNymcAHpfbPsjBgR3gVbDtr+Pbbt1AgSegSut499oAjOfpDc6WvQIGNgGLq47mrwHXO4AkSddMiRHCtD0l0rA+xl9UwEYugX6Vt3e2vs4fQBy1NXSDXBwCIyWKXvN492h7t7+PdPu7weVs3K1THf6MgAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+QIGBQWFPmxrYMAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAABBElEQVRIx+2UMQqDMBSGf4uDTo6dXCMIXsJLCEIPUfAYBc8gQqF3EM/woFBo1k4dOzWbnSJRk5jSsf4gmOfL95u8lwCbNv0qzzXxLcSgjsMgcJrru4JzxrTxNSN/DS7BVV1Pvsn4W4jBZuKtwSU4STMAwP12neSdjkf0nBtXsluDJ2k2wlUREZI0Q1XXyBlb1MhoMIdLXc7t4u/lymwmO9MWEdFkXJQHENH4FOVBmxtH0WAtchgEnlpcFaS+qyvrmgY952D7vVsXzU108Mu5BYAF/PF6eU5tqjNR1TUNAFjhTifZdNB6zgHACne+KuIoGvjzOYmp+22Cf3UX6TrEBt70R/oAQESSsFk1AwIAAAAASUVORK5CYII=';

const visibleIcon = new Image();
visibleIcon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9bpUUqgmYo4pChdbIgKuIoVSyChdJWaNXB5NIvaGJIUlwcBdeCgx+LVQcXZ10dXAVB8APEydFJ0UVK/F9SaBHjwXE/3t173L0D/M0aU82ecUDVLCOTTIj5wooYfEUIEQgYRExipp7KLuTgOb7u4ePrXZxneZ/7c/QrRZMBPpF4lumGRbxOPL1p6Zz3iQVWkRTic+Ixgy5I/Mh12eU3zmWH/TxTMHKZOWKBWCx3sdzFrGKoxFPEUUXVKN+fd1nhvMVZrdVZ+578heGitpzlOs0RJLGIFNIQIaOOKmqwEKdVI8VEhvYTHv5hx58ml0yuKhg55rEBFZLjB/+D392apckJNymcAHpfbPsjBgR3gVbDtr+Pbbt1AgSegSut499oAjOfpDc6WvQIGNgGLq47mrwHXO4AkSddMiRHCtD0l0rA+xl9UwEYugX6Vt3e2vs4fQBy1NXSDXBwCIyWKXvN492h7t7+PdPu7weVs3K1THf6MgAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+QIGBQWDOrdNdUAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAABOUlEQVRIx+2Uu07DMBSG/6AM6WR1apdYQkiRMrUbZM1SXgB2RkYY8hBdsvYJOtCpEqqYuvQpsIQiAQOdok7xdphOidM2NmIkv+ThHNvfufgCdOr0V3muCyutqW73gsBpr+8KTqPoqN8WyLfBGTyfxcYc+yutqS2Ib4MzeJguDTD70yiyBjkKT6SkYjWhSmtjJFJSIiUt7sZUaU3FakKJlNQ8I9ZZW+acNQA8318dnANXNp/F+0qcW/T5+oVh+mPH2RMecWvY9bWsUAj62O08pxZt8tFBi5pjk4/2LQqFoFAIslbQCwKPWzXFJQCgf73AxbkEALwV7yhfbgAAWV5irRSiwQAA0Mzec72m04e+MZflJQC0wp1e8qmHtlYKAFrhzl9FKASp7dbwMbgN/qu/iAPVbett6fQ/9A0c7tBBCKKL7gAAAABJRU5ErkJggg==';

import { Layers } from './constants';

class WindowCycloneMapEditorLayerList extends Window_Base {
  initialize() {
    const x = 0;
    const w = 180;
    const y = 0;
    const h = Graphics.height - 40;
    super.initialize(new Rectangle(x, y, w, h));
    this.showBackgroundDimmer();
  }

  update() {
    super.update();
  }

  updateBackOpacity() {
    this.backOpacity = 255;
  }

  refresh() {
    this.drawContents();
    SceneManager._scene.redrawMap();
  }

  drawContents() {
    this.contents.clear();
    const ctx = this.contents._canvas.getContext('2d');

    const names = [
      'Auto Layer',
      'Layer 1',
      'Layer 2',
      'Layer 3',
      'Layer 4',
      'Shadows',
      'Regions',
      'Events',
    ];
    this.contents.fontSize = 22;

    ctx.imageSmoothingEnabled = false;
    for (let i = 0; i < 8; i++) {
      const layerIndex = i === 0 ? Layers.auto : i - 1;
      this.contents.fontBold = CycloneMapEditor.currentLayer === layerIndex;
      this.changeTextColor(CycloneMapEditor.currentLayer === layerIndex ? ColorManager.powerUpColor() : ColorManager.normalColor());

      if (layerIndex !== Layers.auto) {
        ctx.drawImage(CycloneMapEditor.layerVisibility[layerIndex] ? visibleIcon : hiddenIcon, -4, 30 * i - 4, 48, 48);
        this.drawText(names[i], 40, i * 30, this.contents.width - 40, 'left');
      } else {
        this.drawText(names[i], 10, i * 30, this.contents.width - 10, 'left');
      }

    }
  }

  toggleLayerVisibility(layerIndex) {
    CycloneMapEditor.layerVisibility[layerIndex] = !CycloneMapEditor.layerVisibility[layerIndex];
    this.refresh();
    SceneManager._scene._mapEditorGrid.refresh();
  }

  getLayerIndex(y) {
    const padding = this.padding + 10;

    if (y < padding || y > this.height - padding + 6) {
      return -1;
    }

    const layerIndex = Math.floor((y - padding) / 30);
    if (y > padding + (layerIndex * 30) + 22) {
      return -1;
    }

    if (layerIndex > CycloneMapEditor.layerVisibility.length) {
      return -1;
    }

    if (layerIndex === 0) {
      return Layers.auto;
    }

    return layerIndex - 1;
  }

  onMapTouch(x, y) {
    let layerIndex = this.getLayerIndex(y);
    if (layerIndex < 0) {
      return;
    }

    if (x >= CycloneMapEditor.windowWidth / 2) {
      x -= CycloneMapEditor.windowWidth / 2;
      layerIndex += 4;
    }

    if (x < 50 && layerIndex < 7) {
      this.toggleLayerVisibility(layerIndex);
      return;
    }

    CycloneMapEditor.changeCurrentLayer(layerIndex);
    this.refresh();
  }
}

export {
  WindowCycloneMapEditorLayerList,
};
export class WindowEffects extends Window_Base {
  update() {
    super.update(this);

    if (this.visible) {
      this.refresh();
    }
  }

  itemPadding() {
    return 0;
  }

  updatePadding() {
    this.padding = 0;
  }

  updateBackOpacity() {
    this.backOpacity = 255;
  }

  _refreshFrame() {
  }

  refresh() {
    if (this.contents) {
      this.contents.clear();
      this.contentsBack.clear();
      this.drawContent();
    }
  }

  getSceneWindows() {
    const parentScene = this.parent;
    if (!parentScene.findAllWindows) {
      return;
    }

    return parentScene.findAllWindows();
  }

  getVisibleWindows() {
    const windows = this.getSceneWindows();
    return windows.filter(win => win.visible);
  }

  drawContent() {
    const win = this.getActiveWindow();
    if (!win) {
      return;
    }

    this.drawWindowBorder(win);
  }

  drawWindowBorder(win) {
    let color = '#00FF0066';
    if (!win.visible) {
      color = '#FF000033';
    }

    let parent = win.parent;
    let offsetX = 0;
    let offsetY = 0;

    while (parent && parent !== SceneManager._scene) {
      offsetX += parent.x;
      offsetY += parent.y;
      parent = parent.parent;
    }

    const { x, y, width, height } = win;

    let drawX = x + offsetX;
    let drawY = y + offsetY;
    let drawWidth = width;
    let drawHeight = height;

    switch (document.body.style.cursor) {
      case 'n-resize':
        drawY += this._movedY;
        drawHeight -= this._movedY;
        break;
      case 's-resize':
        drawHeight += this._movedY;
        break;
      case 'w-resize':
        drawX += this._movedX;
        drawWidth -= this._movedX;
        break;
      case 'e-resize':
        drawWidth += this._movedX;
        break;
      case 'nw-resize':
        drawY += this._movedY;
        drawHeight -= this._movedY;
        drawX += this._movedX;
        drawWidth -= this._movedX;
        break;
      case 'sw-resize':
        drawHeight += this._movedY;
        drawX += this._movedX;
        drawWidth -= this._movedX;
        break;
      case 'ne-resize':
        drawY += this._movedY;
        drawHeight -= this._movedY;
        drawWidth += this._movedX;
        break;
      case 'se-resize':
        drawHeight += this._movedY;
        drawWidth += this._movedX;
        break;
      case 'move':
        drawX += this._movedX;
        drawY += this._movedY;
        break;
    }

    if (win._lastSnap) {
      this.contents.blt(win._lastSnap, 0, 0, win._lastSnap.width, win._lastSnap.height, drawX + win.padding, drawY + win.padding, win._lastSnap.width, win._lastSnap.height);
    }

    this.contents.fillRect(drawX, drawY, drawWidth, 4, color);
    this.contents.fillRect(drawX, drawY + drawHeight - 4, drawWidth, 4, color);
    this.contents.fillRect(drawX, drawY, 4, drawHeight, color);
    this.contents.fillRect(drawX + drawWidth - 4, drawY, 4, drawHeight, color);
  }

  show() {
    const windows = this.getSceneWindows();

    for (const win of windows) {
      win._lastSnap = new Bitmap(win.width, win.height);
      if (win.visible) {
        win._lastSnap.blt(win.contents, 0, 0, win.contents.width, win.contents.height, 0, 0);
      }
    }

    super.show();
  }

  getWindowRealX(win) {
    let x = win.x;

    let parent = win.parent;
    while (parent && parent !== SceneManager._scene) {
      x += parent.x;
      parent = parent.parent;
    }

    return x;
  }

  getWindowRealY(win) {
    let y = win.y;

    let parent = win.parent;
    while (parent && parent !== SceneManager._scene) {
      y += parent.y;
      parent = parent.parent;
    }

    return y;
  }

  getClosestWindow(x, y) {
    const windows = this.getVisibleWindows();
    let minDistance = Infinity;
    let closestWindow = false;

    for (const win of windows) {
      const winX = this.getWindowRealX(win);
      const winY = this.getWindowRealY(win);

      let xDistance = Math.abs(x - winX);
      let yDistance = Math.abs(y - winY);
      let distance = Math.min(xDistance, yDistance);

      if (distance < minDistance) {
        minDistance = distance;
        closestWindow = win;
      }

      xDistance = Math.abs(x - (winX + win.width));
      yDistance = Math.abs(y - (winY + win.height));
      distance = Math.min(xDistance, yDistance);
      if (distance < minDistance) {
        minDistance = distance;
        closestWindow = win;
      }
    }

    return closestWindow;
  }

  getActiveWindow() {
    const windows = this.getVisibleWindows();

    const index = this._index ?? 0;
    return windows[index];
  }

  _onHover(x, y) {
    this._movedX = 0;
    this._movedY = 0;
    const win = this.getActiveWindow();

    const winX = this.getWindowRealX(win);
    const winY = this.getWindowRealY(win);

    const insideH = x > (winX - 10) && x < (winX + win.width + 10);
    const insideV = y > (winY - 10) && y < (winY + win.height + 10);
    const resizeLeft = Math.abs(winX - x) < 10 && insideV;
    const resizeRight = Math.abs((winX + win.width) - x) < 10 && insideV;
    const resizeTop = Math.abs(winY - y) < 10 && insideH;
    const resizeBottom = Math.abs((winY + win.height) - y) < 10 && insideH;

    const directions = [];
    if (resizeTop) {
      directions.push('n');
    } else if (resizeBottom) {
      directions.push('s');
    }

    if (resizeLeft) {
      directions.push('w');
    } else if (resizeRight) {
      directions.push('e');
    }

    if (directions.length) {
      document.body.style.cursor = `${ directions.join('') }-resize`;
    } else if (insideV && insideH) {
      document.body.style.cursor = 'move';
    } else {
      document.body.style.cursor = 'default';
    }
  }

  _onMove(x, y) {
    this._movedX = x - this._triggerX;
    this._movedY = y - this._triggerY;
  }

  _onTrigger(x, y) {
    this._windowTriggered = this.getActiveWindow();
    this._triggerX = x;
    this._triggerY = y;
  }

  _onRelease(x, y) {
    this._movedX = 0;
    this._movedY = 0;

    if (!this._windowTriggered) {
      return;
    }

    const diffX = x - this._triggerX;
    const diffY = y - this._triggerY;

    switch (document.body.style.cursor) {
      case 'n-resize':
        this._windowTriggered.y += diffY;
        this._windowTriggered.height -= diffY;
        break;
      case 's-resize':
        this._windowTriggered.height += diffY;
        break;
      case 'w-resize':
        this._windowTriggered.x += diffX;
        this._windowTriggered.width -= diffX;
        break;
      case 'e-resize':
        this._windowTriggered.width += diffX;
        break;
      case 'nw-resize':
        this._windowTriggered.y += diffY;
        this._windowTriggered.height -= diffY;
        this._windowTriggered.x += diffX;
        this._windowTriggered.width -= diffX;
        break;
      case 'sw-resize':
        this._windowTriggered.height += diffY;
        this._windowTriggered.x += diffX;
        this._windowTriggered.width -= diffX;
        break;
      case 'ne-resize':
        this._windowTriggered.y += diffY;
        this._windowTriggered.height -= diffY;
        this._windowTriggered.width += diffX;
        break;
      case 'se-resize':
        this._windowTriggered.height += diffY;
        this._windowTriggered.width += diffX;
        break;
      case 'move':
        this._windowTriggered.x += diffX;
        this._windowTriggered.y += diffY;
        break;
    }

    if (this._windowTriggered.width < 0) {
      this._windowTriggered.x -= Math.abs(this._windowTriggered.width);
      this._windowTriggered.width = Math.abs(this._windowTriggered.width);
    }

    if (this._windowTriggered.height < 0) {
      this._windowTriggered.y -= Math.abs(this._windowTriggered.height);
      this._windowTriggered.height = Math.abs(this._windowTriggered.height);
    }

    this._windowTriggered.refresh();
  }

  generateJson() {
    const windows = this.getSceneWindows();
    const data = [];
    for (const win of windows) {
      if (!win) {
        continue;
      }

      data.push({
        name: win.constructor.name,
        index: data.length,
        x: win.x,
        y: win.y,
        width: win.width,
        height: win.height,
      });
    }

    console.log(JSON.stringify(data));
  }

  setActiveWindowIndex(index) {
    this._index = index;
  }
}
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

  clearBackContents() {
    this.contentsBack.clear();
  }

  refresh() {
    if (this.contents) {
      this.contents.clear();
      this.clearBackContents();
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
    const windows = this.getSceneWindows();

    const index = this._index ?? 0;
    return windows[index];
  }

  _onHover(x, y) {
    this._movedX = 0;
    this._movedY = 0;
    const win = this.getActiveWindow();

    if (!win) {
      return;
    }

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

  applyMouseDiff(diffX, diffY) {
    const win = this._windowTriggered;

    switch (document.body.style.cursor) {
      case 'n-resize':
        win.y += diffY;
        win.height -= diffY;
        break;
      case 's-resize':
        win.height += diffY;
        break;
      case 'w-resize':
        win.x += diffX;
        win.width -= diffX;
        break;
      case 'e-resize':
        win.width += diffX;
        break;
      case 'nw-resize':
        win.y += diffY;
        win.height -= diffY;
        win.x += diffX;
        win.width -= diffX;
        break;
      case 'sw-resize':
        win.height += diffY;
        win.x += diffX;
        win.width -= diffX;
        break;
      case 'ne-resize':
        win.y += diffY;
        win.height -= diffY;
        win.width += diffX;
        break;
      case 'se-resize':
        win.height += diffY;
        win.width += diffX;
        break;
      case 'move':
        win.x += diffX;
        win.y += diffY;
        break;
    }

    if (win.width < 0) {
      win.x -= Math.abs(win.width);
      win.width = Math.abs(win.width);
    }

    if (win.height < 0) {
      win.y -= Math.abs(win.height);
      win.height = Math.abs(win.height);
    }

    win._changedX = win.x;
    win._changedY = win.y;
    win._changedWidth = win.width;
    win._changedHeight = win.height;

    win.refresh && win.refresh();
  }

  _onRelease(x, y) {
    this._movedX = 0;
    this._movedY = 0;

    if (!this._windowTriggered) {
      return;
    }

    const oldData = this.getOldData(this._windowTriggered);
    const diffX = x - this._triggerX;
    const diffY = y - this._triggerY;

    this.applyMouseDiff(diffX, diffY);
    this.makeReport(oldData, this._windowTriggered);
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

    console.log(data);

    const json = JSON.stringify(data, null, 2);
    this.downloadJson(json, 'test');
  }

  downloadJson(json, fileName) {
    // const data = atob(json);
    const buffer = new ArrayBuffer(json.length);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < json.length; i++) {
      view[i] = json.charCodeAt(i) & 0xff;
    }
    const blob = new Blob([buffer], { type: 'application/json'});
    const url = URL.createObjectURL(blob);

    let iframe = document.getElementsByName('json_download')[0];
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.setAttribute('name', 'json_download');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
    }

    const element = document.createElement('a');
    element.setAttribute('href', url);
    element.setAttribute('download', fileName + '.json');
    element.setAttribute('target', 'json_download');
    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  setActiveWindowIndex(index) {
    this._index = index;
  }

  findWindowName(win) {
    let variableName = false;
    for (const parentProp in this.parent) {
      if (!this.parent[parentProp] || this.parent[parentProp] !== win) {
        continue;
      }

      variableName = parentProp;
      break;
    }

    if (variableName) {
      return `${ win.constructor.name } ( scene.${ variableName } )`;
    }

    return win.constructor.name;
  }

  listAvailableWindows() {
    console.clear();
    console.log('Available Windows:');

    const allWindows = this.getSceneWindows();
    let idx = 0;

    const activeWin = this.getActiveWindow();

    for (const win of allWindows) {
      if (!win) {
        continue;
      }

      const shortcut = idx < 31 ? idx.toString(31) : idx;
      const line = `${ shortcut }: ${ this.findWindowName(win) }`;

      if (win === activeWin) {
        console.warn(`${ line } * Selected `);
      } else {
        console.log(line);
      }
      idx++;
      if (idx >= 31) {
        break;
      }
    }

    console.log('---------');
    console.log('Available Commands:');
    console.log('v.move(x, y);');
    console.log('v.resize(width, height);');
    console.log('v.reset();');
    console.log('v.change(newWindowIndex);');
    console.log('v.end();');
    console.log('---------');
  }

  restoreAllWindows() {
    const windows = this.getSceneWindows();
    for (const win of windows) {
      if (!win) {
        continue;
      }

      if (win._initialX !== undefined) {
        win.x = win._initialX;
      }
      if (win._initialY !== undefined) {
        win.y = win._initialY;
      }
      if (win._initialWidth !== undefined) {
        win.width = win._initialWidth;
      }
      if (win._initialHeight !== undefined) {
        win.height = win._initialHeight;
      }

      win.refresh && win.refresh();
    }
  }

  reapplyAllChanges() {
    const windows = this.getSceneWindows();
    for (const win of windows) {
      if (!win) {
        continue;
      }

      if (win._changedX !== undefined) {
        win.x = win._changedX;
      }
      if (win._changedY !== undefined) {
        win.y = win._changedY;
      }
      if (win._changedWidth !== undefined) {
        win.width = win._changedWidth;
      }
      if (win._changedHeight !== undefined) {
        win.height = win._changedHeight;
      }

      win.refresh && win.refresh();
    }
  }

  getOldData(win) {
    if (win._initialX === undefined) {
      win._initialX = win.x;
    }
    if (win._initialY === undefined) {
      win._initialY = win.y;
    }
    if (win._initialWidth === undefined) {
      win._initialWidth = win.width;
    }
    if (win._initialHeight === undefined) {
      win._initialHeight = win.height;
    }

    return {
      x: win.x,
      y: win.y,
      width: win.width,
      height: win.height,
    };
  }

  makeReport(oldData, triggeredWindow) {
    const win = triggeredWindow ?? this.getActiveWindow();
    this.listAvailableWindows();

    if (!win) {
      return;
    }

    const winName = this.findWindowName(win);
    console.log(`Changing ${ winName }:`);

    if (oldData && (win.x !== oldData.x || win.y !== oldData.y)) {
      console.warn(`Moved to ${ win.x }, ${ win.y }`);
    } else {
      console.log(`Position: ${ win.x }, ${ win.y }`);
    }

    if (oldData && (win.width !== oldData.width || win.height !== oldData.height)) {
      console.warn(`Resized to ${ win.width }, ${ win.height }`);
    } else {
      console.log(`Size: ${ win.width }, ${ win.height }`);
    }
  }

  enableWindowResizer() {
    this.show();

    this.reapplyAllChanges();

    nw.Window.get().showDevTools();
    this.listAvailableWindows();

    window.v = {
      move: (x, y) => {
        const win = this.getActiveWindow();
        if (!win) {
          console.error('Invalid window');
          return;
        }

        const oldData = this.getOldData(win);
        win.x = x;
        win.y = y;

        win._changedX = x;
        win._changedY = y;

        win.refresh && win.refresh();
        this.makeReport(oldData, win);
      },
      resize: (width, height) => {
        const win = this.getActiveWindow();
        if (!win) {
          console.error('Invalid window');
          return;
        }

        const oldData = this.getOldData(win);
        win.width = width;
        win.height = height;

        win._changedWidth = width;
        win._changedHeight = height;

        win.refresh && win.refresh();
        this.makeReport(oldData, win);
      },
      reset: () => {
        const win = this.getActiveWindow();
        if (!win) {
          console.error('Invalid window');
          return;
        }

        if (win._initialX !== undefined) {
          win.x = win._initialX;
        }
        if (win._initialY !== undefined) {
          win.y = win._initialY;
        }
        if (win._initialWidth !== undefined) {
          win.width = win._initialWidth;
        }
        if (win._initialHeight !== undefined) {
          win.height = win._initialHeight;
        }

        win.refresh && win.refresh();
      },
      change: (newWindowIndex) => {
        if (typeof newWindowIndex === 'string') {
          newWindowIndex = parseInt(newWindowIndex, 31);
        }

        if (isNaN(newWindowIndex)) {
          console.error('Invalid Index');
          return;
        }

        this.setActiveWindowIndex(newWindowIndex);
        const win = this.getActiveWindow();

        this.makeReport(false, win);
        if (!win) {
          console.warn('Deselected window');
          return;
        }
        const winName = this.findWindowName(win);
        console.warn(`Changed Selection: ${ winName }`);
      },
      end: () => {
        this.disableWindowResizer();
      }
    };

    nw.Window.get().focus();
  }

  disableWindowResizer() {
    this.hide();
    this.generateJson();
    document.body.style.cursor = 'default';

    delete window.v;

    this.restoreAllWindows();
  }

  toggle() {
    if (this.visible) {
      this.disableWindowResizer();
    } else {
      this.enableWindowResizer();
    }
  }
}
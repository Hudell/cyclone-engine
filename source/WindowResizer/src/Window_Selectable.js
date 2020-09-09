WindowResizer.patchClass(Window_Selectable, $super => class {
  refreshCursor() {
    if (WindowResizer.active) {
      return;
    }

    $super.refreshCursor.call(this);
  }
});
CycloneMapEditor.isFullScreen = function() {
  // MV's _isFullScreen was broken, it would return the opposite value
  return !Graphics._isFullScreen();
};
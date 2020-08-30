if (Utils.RPGMAKER_NAME === 'MV') {
  window.globalThis = window;

  ImageManager.iconWidth = Window_Base._iconWidth;
  ImageManager.iconHeight = Window_Base._iconHeight;
  ImageManager.faceWidth = Window_Base._faceWidth;
  ImageManager.faceHeight = Window_Base._faceHeight;
}
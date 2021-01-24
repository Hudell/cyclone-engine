export function loadFileAsync(filePath, mimeType = 'application/json', onLoad = undefined, onError = undefined) {
  const xhr = new XMLHttpRequest();
  const name = `$${ filePath.replace(/^.*(\\|\/|:)/, '').replace(/\..*/, '') }`;
  xhr.open('GET', filePath);

  if (mimeType && xhr.overrideMimeType) {
    xhr.overrideMimeType(mimeType);
  }

  const loadFn = onLoad ?? function (xhr, filePath, name) {
    if (xhr.status < 400) {
      window[name] = JSON.parse(xhr.responseText);
      DataManager.onLoad(window[name]);
    }
  };

  const errorFn = onError ?? function() {
    DataManager._errorUrl = DataManager._errorUrl ?? filePath;
  };

  xhr.onLoad = function() {
    loadFn.call(this, xhr, filePath, name);
  };

  xhr.onError = errorFn;
  window[name] = null;
  xhr.send();
}
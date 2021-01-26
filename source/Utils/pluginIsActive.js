export function pluginIsActive(pluginName) {
  for (const plugin of globalThis.$plugins) {
    if (!plugin?.status) {
      continue;
    }
    if (!plugin?.description?.includes(`<pluginName:${ pluginName }`)) { //`
      continue;
    }

    return true;
  }

  return false;
}
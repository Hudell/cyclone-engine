export function pluginIsActive(pluginName) {
  for (const plugin of globalThis.$plugins) {
    if (!plugin || !plugin.status) {
      continue;
    }
    if (!plugin.description || !plugin.description.includes(`<pluginName:${ pluginName }`)) { //`
      continue;
    }

    return true;
  }

  return false;
}
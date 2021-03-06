const path = require('path');
const camelcase = require('camelcase');
const {transform: iifeTransform} = require('es-iife');

function idToName(id, nameMaps, prefix = '') {
  for (const names of nameMaps) {
    let name;
    if (typeof names === 'function') {
      name = names(id);
    } else if (names && typeof names === 'object') {
      name = names[id];
    }
    if (name) {
      return name;
    }
  }
  if (path.isAbsolute(id)) {
    const {name} = path.parse(id);
    return prefix + camelcase(name);
  }
  return camelcase(id);
}

function createPlugin({
  sourcemap = true,
  names,
  prefix
} = {}) {
  let isNamesResolved = false;

  return {
    name: 'rollup-plugin-inline-js',
    renderChunk(code, {fileName}, {globals}) {
      if (!code) {
        return null;
      }
      if (names && typeof names === 'object' && !isNamesResolved) {
        const output = {};
        for (const [key, value] of Object.entries(names)) {
          output[resolveId(key)] = value;
        }
        names = output;
        isNamesResolved = true;
      }

      return iifeTransform({
        code,
        parse: this.parse,
        name: idToName(path.resolve(fileName), [names, globals], prefix),
        sourcemap,
        resolveGlobal: id => idToName(resolveId(id), [names, globals], prefix)
      });
    }
  };

  function resolveId(id, dir) {
    if (id.startsWith('.')) {
      return path.resolve(dir, id);
    }
    return id;
  }
}

export default createPlugin;

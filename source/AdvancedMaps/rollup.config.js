import iife from '../iife.js';

import {
  readFileSync
} from 'fs';

const header = readFileSync('header.js', 'utf-8');

export default [{
  input: 'src/main.js',
  output: [{
    file: `${__dirname}/../../plugins/Cyclone-AdvancedMaps.js`,
    format: 'cjs',
    sourcemap: false,
    banner: header,
  }],
  plugins: [
    iife(),
  ]
}];
import { getBabelOutputPlugin } from '@rollup/plugin-babel';

import iife from '../iife.js';

import {
  readFileSync
} from 'fs';

const header = readFileSync('header.js', 'utf-8');

export default [{
  input: 'src/main.js',
  output: [{
    file: `${__dirname}/dist/Cyclone-Map-Editor-MV.js`,
    format: 'esm',
    sourcemap: false,
    banner: header,
  }, {
    file: `${__dirname}/../../Games/Tornado/js/plugins/Cyclone-Map-Editor-MV.js`,
    format: 'esm',

    sourcemap: false,
    banner: header,
  }],
  plugins: [
    iife(),
    getBabelOutputPlugin({
      presets: ['@babel/preset-env'],
    }),
  ]
}];
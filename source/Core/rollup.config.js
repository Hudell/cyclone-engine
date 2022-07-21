import { terser } from 'rollup-plugin-terser';

export default [{
  input: './main.js',
  output: [{
    file: `${__dirname}/main.min.js`,
    format: 'cjs',
    sourcemap: false,
    banner: '',
  }],
  plugins: [
    terser(),
  ]
}, {
  input: './patcher.js',
  output: [{
    file: `${__dirname}/patcher.min.js`,
    format: 'cjs',
    sourcemap: false,
    banner: '',
  }],
  plugins: [
    terser(),
  ]
}];
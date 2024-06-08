// eslint-disable-next-line import/no-extraneous-dependencies
import { getBabelOutputPlugin } from '@rollup/plugin-babel';

export default {
  input: 'dist/main.js',
  plugins: [
    getBabelOutputPlugin({
      presets: ['@babel/preset-env'],
    }),
  ],
  output: [{ file: 'dist/bundle.js', format: 'cjs' }],
};

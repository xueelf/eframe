import type { BuildConfig } from 'bun';
import { sassPlugin, svgPlugin } from './plugin';

const config: BuildConfig = {
  entrypoints: ['./src/index.tsx'],
  outdir: './dist',
  target: 'browser',
  format: 'esm',
};

await Bun.build({
  ...config,
  plugins: [sassPlugin(), svgPlugin()],
});
await Bun.build({
  ...config,
  plugins: [
    sassPlugin({
      style: 'compressed',
    }),
    svgPlugin({
      minify: true,
    }),
  ],
  minify: true,
  naming: '[name].min.[ext]',
});

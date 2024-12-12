import type { BunPlugin, PluginBuilder } from 'bun';
import { compileAsync, type Options } from 'sass';

export function sassPlugin(options?: Options<'async'>): BunPlugin {
  return {
    name: 'sass',
    setup(build: PluginBuilder) {
      build.onLoad({ filter: /\.scss$/ }, async ({ path }) => {
        const { css } = await compileAsync(path, options);

        return {
          loader: 'text',
          contents: css,
        };
      });
    },
  };
}

interface SvgOptions {
  minify: boolean;
}
export function svgPlugin(options?: SvgOptions): BunPlugin {
  return {
    name: 'svg',
    setup(build: PluginBuilder) {
      build.onLoad({ filter: /\.svg$/ }, async ({ path }) => {
        let contents = await Bun.file(path).text();

        if (options?.minify) {
          contents = contents.replace(/\n(\s{2})*/g, '');
        }
        return {
          loader: 'text',
          contents,
        };
      });
    },
  };
}

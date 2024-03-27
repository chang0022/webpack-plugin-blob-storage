import type { Compiler, Compilation, Stats } from 'webpack';
import Uploader from './uploader';
import chalk from 'chalk';

import type { Options } from './types';

const PLUGIN_NAME = 'BlobStorageWebpackPlugin';

type WebpackCallback<E, T> = (error?: E | null | false, result?: T) => void;

class BlobStorageWebpackPlugin {
  private options: Options;
  private enabled: boolean = true;

  constructor(enabled: boolean, userOptions: Options) {
    this.options = userOptions;
    this.enabled = enabled;
  }

  async afterDoneCallback(compilation: Compilation, callback: WebpackCallback<Error, void>) {
    if (this.enabled) {
      console.log(chalk.cyan(`Uploading files to blob storage...`));
      try {
        const uploader = new Uploader(this.options, compilation);
        await uploader.run();
        callback?.();
      } catch (error) {
        callback?.(error as Error);
      }
      return;
    }

    callback?.();
  }
  apply(compiler: Compiler) {
    compiler.hooks.done.tapAsync(PLUGIN_NAME, (stats: Stats, callback: WebpackCallback<Error, void>) => {
      this.afterDoneCallback(stats.compilation, callback);
    });
  }
}

export { BlobStorageWebpackPlugin };

export type { Options };

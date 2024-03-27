/* eslint-disable no-console */
import { relative } from 'node:path';
import chalk from 'chalk';
import type { Compilation } from 'webpack';
import type { File } from './types';

export function logResult(files: File[], compilation: Compilation) {
  const { compilerPath } = compilation;

  console.info(
    [
      '',
      `${chalk.cyan('Upload finished.')}`,
      `✓ ${files.length} files uploaded`,
      ...files.map((p: File) => `${chalk.dim(relative(compilerPath, p.path))}`),
    ].join('\n')
  );
}

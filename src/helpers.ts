import path from 'node:path';
import fs from 'node:fs';
import mm from 'micromatch';

import type { BlobClientConfig, File } from './types';

export const DEFAULT_IGNORES: string[] = ['.DS_Store', '*.map'];

export function translatePathFromFiles(directoryPath: string, files: string[]): File[] {
  return files.map(
    (file: string): File => ({
      path: file,
      name: path.relative(directoryPath, file),
    })
  );
}

export function getDirectoryFilesRecursive(directoryPath: string, fileList: string[], ignores: string[] = []): File[] {
  const ignoreList = [...DEFAULT_IGNORES, ...ignores];
  const files = mm.not(fileList, ignoreList, { basename: true });
  return translatePathFromFiles(directoryPath, files);
}

export function getAllFilesInDirectory(directoryPath: string, fileList: string[] = []) {
  const files = fs.readdirSync(directoryPath);
  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);
    const stats = fs.statSync(filePath);
    fileList = stats.isDirectory() ? getAllFilesInDirectory(filePath, fileList) : fileList.concat(filePath);
  });
  return fileList;
}

function isContainerName(name: string) {
  const pattern = /^(?=[a-z0-9])(?!.*--)[a-z0-9-]{1,61}[a-z0-9]$/;
  return pattern.test(name);
}

// validate clientConfig
export function validateBlobClientConfig(config: BlobClientConfig): void {
  const { accountName, accountKey, sasToken, containerName, subPath } = config;

  // accountKey 和 sasToken 不能同时为空
  if (!accountKey && !sasToken) {
    throw new Error('accountKey and sasToken cannot be empty at the same time');
  }

  if (!accountName || !containerName) {
    throw new Error('accountName or containerName is empty');
  }

  if (!isContainerName(containerName)) {
    throw new Error('Invalid containerName');
  }

  if (subPath && !isContainerName(subPath)) {
    throw new Error('Invalid subPath');
  }
}

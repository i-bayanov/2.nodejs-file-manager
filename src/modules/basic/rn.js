import { rename, stat } from 'fs/promises';
import { resolve, dirname } from 'path';

import { checkPathExistence } from '../misc/checkPathExistence.js';

export async function rn(pathToFile, newFileName) {
  if (!pathToFile || !newFileName) throw new Error('Invalid input');

  const absolutePathToInputFile = resolve(this.cwd, pathToFile);
  const isFile = (await stat(absolutePathToInputFile)).isFile();
  const absolutePathToNewFile = resolve(this.cwd, newFileName);
  const isSameDir =
    dirname(absolutePathToInputFile) === dirname(absolutePathToNewFile);
  const isFileAlreadyExists = await checkPathExistence(absolutePathToNewFile);

  if (!isFile || !isSameDir || isFileAlreadyExists)
    throw new Error('Invalid input');

  try {
    await rename(absolutePathToInputFile, absolutePathToNewFile);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.startsWith('EINVAL: invalid argument, rename')) {
        throw new Error('Invalid input');
      }

      throw new Error('Operation failed');
    }
  }
}

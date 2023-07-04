import { rm as remove, stat } from 'fs/promises';
import { resolve } from 'path';

export async function rm(pathToFile) {
  if (!pathToFile) throw new Error('Invalid input');

  const absolutePathToFile = resolve(this.cwd, pathToFile);
  const isFile = (await stat(absolutePathToFile)).isFile();

  if (!isFile) throw new Error('Invalid input');

  try {
    await remove(absolutePathToFile);
  } catch {
    throw new Error('Operation failed');
  }
}

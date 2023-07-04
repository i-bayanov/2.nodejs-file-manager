import { writeFile } from 'fs/promises';
import { resolve } from 'path';

import { checkPathExistence } from '../misc/checkPathExistence.js';

export async function add(newFileName) {
  if (!newFileName) throw new Error('Invalid input');

  const pathToNewFile = resolve(this.cwd, newFileName);
  const isFileAlreadyExists = await checkPathExistence(pathToNewFile);

  if (isFileAlreadyExists) throw new Error('Invalid input');

  try {
    writeFile(pathToNewFile, '');
  } catch {
    throw new Error('Operation failed');
  }
}

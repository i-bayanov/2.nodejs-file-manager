import { basename, resolve } from 'path';

import { cp } from './cp.js';
import { rm } from './rm.js';

export async function mv(pathToFile, pathToNewDirectory) {
  if (!pathToFile || !pathToNewDirectory) throw new Error('Invalid input');

  try {
    await cp.call(this, pathToFile, pathToNewDirectory);
  } catch (error) {
    throw error;
  }

  try {
    await rm.call(this, pathToFile);
  } catch (error) {
    const fileName = basename(pathToFile);
    await rm.call(this, resolve(this.cwd, pathToNewDirectory, fileName));

    throw error;
  }
}

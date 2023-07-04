import { mkdir } from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import { resolve, basename } from 'path';

import { checkPathExistence } from '../misc/checkPathExistence.js';

export async function cp(pathToFile, pathToNewDirectory) {
  const absolutePathToFile = resolve(this.cwd, pathToFile);
  const fileName = basename(absolutePathToFile);
  const absolutePathToNewDir = resolve(this.cwd, pathToNewDirectory);
  const absolutePathToNewFile = resolve(absolutePathToNewDir, fileName);
  const isFileAlreadyExists = await checkPathExistence(absolutePathToNewFile);

  if (!pathToFile || !pathToNewDirectory || isFileAlreadyExists)
    throw new Error('Invalid input');

  try {
    const isDestinationDirExists = await checkPathExistence(
      absolutePathToNewDir
    );

    if (!isDestinationDirExists)
      await mkdir(absolutePathToNewDir, { recursive: true });

    await new Promise((resolve, reject) => {
      const readStream = createReadStream(absolutePathToFile);
      readStream
        .on('error', (error) => reject(error))
        .on('close', () => resolve());
      const writeStream = createWriteStream(absolutePathToNewFile);
      writeStream
        .on('error', (error) => reject(error))
        .on('close', () => resolve());
      readStream.pipe(writeStream);
    });
  } catch (error) {
    if (error instanceof Error) {
      const isInputInvalid =
        error.message.startsWith('ENOENT: no such file or directory') ||
        error.message === 'EISDIR: illegal operation on a directory, read';

      if (isInputInvalid) throw new Error('Invalid input');

      throw new Error('Operation failed');
    }
  }
}

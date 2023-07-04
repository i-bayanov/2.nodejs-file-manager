import { createReadStream, createWriteStream } from 'fs';
import { stat } from 'fs/promises';
import { resolve, basename } from 'path';
import { createBrotliCompress } from 'zlib';
import { pipeline } from 'stream/promises';

import { checkPathExistence } from '../misc/checkPathExistence.js';

export async function compress(pathToFile, pathToDestination) {
  if (!pathToFile || !pathToDestination) throw new Error('Invalid input');

  try {
    const absolutePathToInputFile = resolve(this.cwd, pathToFile);
    const inputFileName = basename(absolutePathToInputFile);
    const absolutePathToDestination = resolve(this.cwd, pathToDestination);
    const absolutePathToDestinationFile = resolve(
      absolutePathToDestination,
      `${inputFileName}.br`
    );

    const isFile = (await stat(absolutePathToInputFile)).isFile();
    const isDirectory = (await stat(absolutePathToDestination)).isDirectory();
    const isDestinationFileAlreadyExists = await checkPathExistence(
      absolutePathToDestinationFile
    );
    if (!isFile || !isDirectory || isDestinationFileAlreadyExists)
      throw new Error('Invalid input');

    await pipeline(
      createReadStream(absolutePathToInputFile),
      createBrotliCompress(),
      createWriteStream(absolutePathToDestinationFile)
    );
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Invalid input') throw error;
      if (error.message.startsWith('ENOENT: no such file or directory'))
        throw new Error('Invalid input');

      throw new Error('Operation failed');
    }
  }
}

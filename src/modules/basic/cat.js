import { createReadStream } from 'fs';
import path from 'path';
import { EOL } from 'os';

export async function cat(pathToFile) {
  if (!pathToFile) throw new Error('Invalid input');

  try {
    const absolutePathToFile = path.resolve(this.cwd, pathToFile);

    await new Promise((resolve, reject) => {
      const readStream = createReadStream(absolutePathToFile);
      readStream
        .on('error', (error) => reject(error))
        .on('end', () => process.stdout.write(EOL))
        .on('close', () => resolve());
      readStream.pipe(process.stdout);
    }).catch((error) => {
      throw error;
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

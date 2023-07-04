import fsPromises from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

export async function hash(pathToFile) {
  if (!pathToFile) throw new Error('Invalid input');

  try {
    const absolutePathToFile = path.resolve(this.cwd, pathToFile);
    const fileData = await fsPromises.readFile(absolutePathToFile);
    const hash = crypto.createHash('sha256').update(fileData).digest('hex');

    console.log(hash);
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

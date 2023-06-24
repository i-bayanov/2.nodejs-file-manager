import fsPromises from 'fs/promises';
import path from 'path';

export async function cd(pathToDirectory) {
  if (!pathToDirectory) throw new Error('Invalid input');

  const newPath = path.resolve(this.cwd, pathToDirectory);

  try {
    const isDirectory = (await fsPromises.stat(newPath)).isDirectory();

    if (!isDirectory) throw new Error('Path is not a directory');

    this.cwd = newPath;
  } catch (error) {
    if (error instanceof Error) {
      const isInputInvalid =
        error.message.startsWith('ENOENT: no such file or directory') ||
        error.message === 'Path is not a directory';

      if (isInputInvalid) throw new Error('Invalid input');
    }

    throw new Error('Operation failed');
  }
}

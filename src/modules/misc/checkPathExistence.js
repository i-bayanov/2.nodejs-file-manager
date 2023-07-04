import { access, constants } from 'fs/promises';

export async function checkPathExistence(path) {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

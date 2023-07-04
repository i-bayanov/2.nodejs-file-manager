import { readdir } from 'fs/promises';

export async function ls() {
  const { locale } = Intl.DateTimeFormat().resolvedOptions();

  const direntArr = await readdir(this.cwd, { withFileTypes: true });
  const directories = direntArr
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => ({ Name: dirent.name, Type: 'directory' }))
    .sort((obj1, obj2) => obj1.Name.localeCompare(obj2.Name, locale));
  const files = direntArr
    .filter((dirent) => dirent.isFile())
    .map((dirent) => ({ Name: dirent.name, Type: 'file' }))
    .sort((obj1, obj2) => obj1.Name.localeCompare(obj2.Name, locale));

  console.table([...directories, ...files]);
}

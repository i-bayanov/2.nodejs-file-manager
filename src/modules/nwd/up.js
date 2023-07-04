import path from 'path';

export function up() {
  this.cwd = path.resolve(this.cwd, '..');
}

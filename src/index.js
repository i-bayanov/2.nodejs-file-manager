import readline from 'readline';
import { homedir } from 'os';

import * as jsModules from './modules/index.js';

const userName =
  process.argv
    .slice(2)
    .find((arg) => arg.startsWith('--username='))
    ?.replace('--username=', '') || 'Anonche';

const ctx = { cwd: homedir() };

const jsModulesBound = Object.fromEntries(
  Object.entries(jsModules).map(([fnName, fn]) => [fnName, fn.bind(ctx)])
);

console.log(`Welcome to the File Manager, ${userName}!`);
jsModulesBound.promptUser();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', async (line) => {
  try {
    const indexOfSpace = line.indexOf(' ');
    const command = indexOfSpace === -1 ? line : line.slice(0, indexOfSpace);
    const args = indexOfSpace === -1 ? [] : jsModulesBound.parseArgs(line.slice(indexOfSpace + 1));

    if (command === '.exit') jsModulesBound.exit(userName);

    const fn = jsModulesBound[command];

    if (!fn) throw new Error('Invalid input');

    await fn(...args);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  } finally {
    jsModulesBound.promptUser();
  }
}).on('SIGINT', jsModulesBound.exit.bind(null, userName));

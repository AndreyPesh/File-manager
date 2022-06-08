import os from 'os';
import { getUpDirectory, moveToDir, readDir } from './utils/navigationDir.mjs';
import { print, getUserNameFromArg, printCurrentlyDir, printInvalidInput } from './utils/functions.mjs';
import { cmd } from './utils/constant.mjs';


const { EOL } = os;
const userName = getUserNameFromArg(process.argv);
let currentDirectory = os.homedir();

print(`Welcome to the File Manager, ${userName}!${EOL}`);
printCurrentlyDir(currentDirectory);

process.stdin.on('data', async (chunk) => {

  const action = String(chunk).trim();
  const [command, path] = action.split(' ');

  switch(command) {
    case cmd.exit: process.exit();
    case cmd.up: {
      currentDirectory = getUpDirectory(currentDirectory);
      break;
    }
    case cmd.cd: {
      if (!path) {
        printInvalidInput();
        break;
      }
      currentDirectory = await moveToDir(currentDirectory, path);
      break;
    }
    case cmd.ls: {
      await readDir(currentDirectory);
      break;
    }
    default: printInvalidInput();
  } 
  printCurrentlyDir(currentDirectory);
});

process.on('SIGINT', () => {
  process.exit();
});

process.on('exit', () => {
  print(`Thank you for using File Manager, ${userName}!`);
});

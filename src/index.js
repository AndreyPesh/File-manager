import os from 'os';
import { getUpDirectory } from './utils/navigationDir.mjs';
import { print, getUserNameFromArg, printCurrentlyDir } from './utils/functions.mjs';
import { cmd } from './utils/constant.mjs';


const { EOL } = os;
const userName = getUserNameFromArg(process.argv);
let currentDirectory = os.homedir();

print(`Welcome to the File Manager, ${userName}!${EOL}`);
printCurrentlyDir(currentDirectory);

process.stdin.on('data', (chunk) => {
  const action = String(chunk).trim();
  switch(action) {
    case cmd.exit: process.exit();
    case cmd.up: {
      currentDirectory = getUpDirectory(currentDirectory);
      break;
    }
    default: print(`Invalid input${EOL}`);
  } 
  printCurrentlyDir(currentDirectory);
});

process.on('SIGINT', () => {
  process.exit();
});

process.on('exit', () => {
  print(`Thank you for using File Manager, ${userName}!`);
});

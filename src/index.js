import os from 'os';
import path from 'path';
import { getUpDirectory, moveToDir, readDir } from './utils/navigationDir.mjs';
import { readFile } from './utils/operationsFile.mjs';
import { print, getUserNameFromArg, printCurrentlyDir, printInvalidInput } from './utils/functions.mjs';
import { cmd } from './utils/constant.mjs';


const { EOL } = os;
const userName = getUserNameFromArg(process.argv);
let currentDirectory = os.homedir();

print(`Welcome to the File Manager, ${userName}!${EOL}`);
printCurrentlyDir(currentDirectory);

process.stdin.on('data', async (chunk) => {

  const action = String(chunk).trim();
  const [command, pathToFile] = action.split(' ');

  switch(command) {
    case cmd.exit: process.exit();
    case cmd.up: {
      currentDirectory = getUpDirectory(currentDirectory);
      break;
    }
    case cmd.cd: {
      if (!pathToFile) {
        printInvalidInput();
        break;
      }
      currentDirectory = await moveToDir(currentDirectory, pathToFile);
      break;
    }
    case cmd.ls: {
      await readDir(currentDirectory);
      break;
    }
    case cmd.cat: {
      if (!pathToFile) {
        printInvalidInput();
        break;
      }
      const fileReadPath = path.join(currentDirectory, pathToFile);
      await readFile(fileReadPath);
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

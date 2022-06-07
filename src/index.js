import os from 'os';
import { print, getUserNameFromArg, printCurrentlyDir } from './utils/functions.mjs';
import { cmd } from './utils/constant.mjs';


const { EOL } = os;
const userName = getUserNameFromArg(process.argv);

print(`Welcome to the File Manager, ${userName}!${EOL}`);
printCurrentlyDir();

process.stdin.on('data', (chunk) => {
  const chunkToString = String(chunk).trim();
  if (cmd.exit === chunkToString) {
    process.exit();
  } 
  printCurrentlyDir();
});

process.on('SIGINT', () => {
  process.exit();
});

process.on('exit', () => {
  print(`Thank you for using File Manager, ${userName}!`);
});

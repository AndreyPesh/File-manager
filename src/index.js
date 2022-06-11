import os from 'os';
import path from 'path';
import { getUpDirectory, moveToDir, readDir } from './utils/navigationDir.mjs';
import { readFile, createFile, renameFile, copy, deleteFile, moveFile } from './utils/operationsFile.mjs';
import { printSystemInfo, checkFlag } from './utils/systemInfo.mjs';
import { print, getUserNameFromArg, printCurrentlyDir, printInvalidInput } from './utils/functions.mjs';
import { getHash } from './utils/hash.mjs';
import { cmd } from './utils/constant.mjs';
import { compress, decompress } from './utils/compress.mjs';

const { EOL } = os;
const userName = getUserNameFromArg(process.argv);
let currentDirectory = os.homedir();

print(`Welcome to the File Manager, ${userName}!${EOL}`);
printCurrentlyDir(currentDirectory);

process.stdin.on('data', async (chunk) => {

  const action = String(chunk).trim();
  const [command, pathToFile, optionalPath] = action.split(' ');

  switch (command) {
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
    case cmd.add: {
      if (!pathToFile) {
        printInvalidInput();
        break;
      }
      const fileCreatePath = path.join(currentDirectory, pathToFile);
      await createFile(fileCreatePath);
      break;
    }
    case cmd.rn: {
      if (!pathToFile || !optionalPath) {
        printInvalidInput();
        break;
      }
      const filePath = path.join(currentDirectory, pathToFile);
      const newFilepath = path.join(currentDirectory, optionalPath);
      await renameFile(filePath, newFilepath);
      break;
    }
    case cmd.cp: {
      if (!pathToFile || !optionalPath) {
        printInvalidInput();
        break;
      }
      const normalizePathToFile = path.normalize(pathToFile);
      const normalizePathToCopyFile = path.normalize(optionalPath);
      const filePath = path.join(currentDirectory, normalizePathToFile);
      const copyFilePath = path.join(currentDirectory, normalizePathToCopyFile, pathToFile);
      await copy(filePath, copyFilePath);
      break;
    }
    case cmd.rm: {
      if (!pathToFile) {
        printInvalidInput();
        break;
      }
      const pathToFileRemove = path.join(currentDirectory, pathToFile);
      await deleteFile(pathToFileRemove);
      break;
    }
    case cmd.mv: {
      if (!pathToFile || !optionalPath) {
        printInvalidInput();
        break;
      }
      const normalizePathToFile = path.normalize(pathToFile);
      const normalizePathToCopyFile = path.normalize(optionalPath);
      const filePath = path.join(currentDirectory, normalizePathToFile);
      const moveFilePath = path.join(currentDirectory, normalizePathToCopyFile, pathToFile);
      await moveFile(filePath, moveFilePath);
      break;
    }
    case cmd.os: {
      const isFlagExist = checkFlag(pathToFile);
      if (!pathToFile || !isFlagExist) {
        printInvalidInput();
        break;
      }
      printSystemInfo(pathToFile);
      break;
    }
    case cmd.hash:
      if (!pathToFile) {
        printInvalidInput();
        break;
      }
      const filePath = path.join(currentDirectory, pathToFile);
      const hash = await getHash(filePath);
      if (hash) {
        print(`${hash} ${EOL}`);
      }
      break;
    case cmd.compress: {
      if (!pathToFile || !optionalPath) {
        printInvalidInput();
        break;
      }
      const normalizePathToFile = path.normalize(pathToFile);
      const normalizePathToDestFile = path.normalize(optionalPath);
      const filePath = path.join(currentDirectory, normalizePathToFile);
      const destFilePath = path.join(currentDirectory, normalizePathToDestFile);
      await compress(filePath, destFilePath);
      break;
    }
    case cmd.decompress: {
      if (!pathToFile || !optionalPath) {
        printInvalidInput();
        break;
      }
      const normalizePathToFile = path.normalize(pathToFile);
      const normalizePathToDestFile = path.normalize(optionalPath);
      const filePath = path.join(currentDirectory, normalizePathToFile);
      const destFilePath = path.join(currentDirectory, normalizePathToDestFile);
      await decompress(filePath, destFilePath);
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

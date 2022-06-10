import { createReadStream } from 'fs';
import { open, rename, copyFile } from 'fs/promises';
import { EOL } from 'os';
import { print } from './functions.mjs';
import { FAILED_MESSAGE } from './constant.mjs';

export const readFile = async (pathToFile) => {
  return new Promise((resolve) => {
    const readStream = createReadStream(pathToFile);
    readStream.on('data', (chunk) => {
      print(chunk.toString());
    });

    readStream.on('error', () => {
      print(`${FAILED_MESSAGE} ${EOL}`);
      resolve();
    });

    readStream.on('end', () => {
      print(`${EOL}`);
      resolve();
    });
  });
}

export const createFile = async (pathToFile) => {
  try {
    await open(pathToFile, 'wx');
  } catch{
    print(`${FAILED_MESSAGE} ${EOL}`);
  }
}

export const renameFile = async (pathToFile, optionalPath) => {
  try {
    await rename(pathToFile, optionalPath);
  } catch{
    print(`${FAILED_MESSAGE} ${EOL}`);
  }
}

export const copy = async (pathToFile, pathToCopyFile) => {
  try {
    await copyFile(pathToFile, pathToCopyFile);
  } catch {
    print(`${FAILED_MESSAGE} ${EOL}`);
  }
}

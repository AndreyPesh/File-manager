import { createReadStream } from 'fs';
import { open } from 'fs/promises';
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
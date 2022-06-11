import { createReadStream, createWriteStream } from 'fs';
import { open, rename, unlink } from 'fs/promises';
import { EOL } from 'os';
import { pipeline } from 'stream';
import { print } from './common.mjs';
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
    const file = await open(pathToFile, 'wx+');
    file.close();
  } catch {
    print(`${FAILED_MESSAGE} ${EOL}`);
  }
}

export const renameFile = async (pathToFile, optionalPath) => {
  try {
    await rename(pathToFile, optionalPath);
  } catch {
    print(`${FAILED_MESSAGE} ${EOL}`);
  }
}

export const copy = (pathToFile, pathToCopyFile) => {
  const readStream = createReadStream(pathToFile);
  const writeStream = createWriteStream(pathToCopyFile);
  return new Promise(resolve => {
    pipeline(readStream, writeStream, (err) => {
      if (err) {
        print(`${FAILED_MESSAGE} ${EOL}`);
        resolve(false);
      }
      resolve(true);
    });
  });
}

export const deleteFile = async (pathToFile) => {
  try {
    await unlink(pathToFile);
  } catch {
    print(`${FAILED_MESSAGE} ${EOL}`);
  }
}

export const moveFile = async (pathToFile, pathToMoveFile) => {
  try {
    const isSuccessfulCopy = await copy(pathToFile, pathToMoveFile);
    if (isSuccessfulCopy) {
      await unlink(pathToFile);
    }
  } catch {
    print(`${FAILED_MESSAGE} ${EOL}`);
  }
}
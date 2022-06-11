import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import zlib from 'zlib';
import { EOL } from 'os';
import { FAILED_MESSAGE } from './constant.mjs';
import { print } from './common.mjs';

export const compress = async (pathToFile, pathToDest) => {
  try {
    const readableStream = createReadStream(pathToFile);
    const writeableStream = createWriteStream(pathToDest);
    await pipeline(readableStream, zlib.createBrotliCompress(), writeableStream);
  } catch {
    print(`${FAILED_MESSAGE} ${EOL}`);
  }
}

export const decompress = async (pathToFile, pathToDest) => {
  try {
    const readableStream = createReadStream(pathToFile);
    const writeableStream = createWriteStream(pathToDest);
    await pipeline(readableStream, zlib.createBrotliDecompress(), writeableStream);
  } catch {
    print(`${FAILED_MESSAGE} ${EOL}`);
  }
}
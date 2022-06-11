import { EOL } from 'os';
import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import { print } from './functions.mjs';
import { FAILED_MESSAGE } from './constant.mjs';

export const getHash = (filename) => {
  const stream = createReadStream(filename);
  const sha256 = createHash('sha256');
  let contentFile = '';
  return new Promise(resolve => {
    stream.on('data', (chunk) => {
      const data = chunk.toString('utf-8');
      contentFile += data;
    });
    stream.on('error', () => {
      print(`${FAILED_MESSAGE} ${EOL}`);
      resolve(null);
    });
    stream.on('end', async () => {
      const resultHash = sha256.update(contentFile).digest('hex');
      resolve(resultHash);
    });
  })
}

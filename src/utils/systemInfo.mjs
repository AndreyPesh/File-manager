import { print } from './functions.mjs';
import { systemFlagInfo } from './constant.mjs';
import { EOL } from 'os';


export const printSystemInfo = (flag) => {
  switch (flag) {
    case systemFlagInfo.eol:
      print(`${JSON.stringify(EOL)} ${EOL}`);
      break;
    default:
      break;
  }
}

export const checkFlag = (flag) => {
  const listFlags = Object.values(systemFlagInfo);
  return listFlags.includes(flag);
}
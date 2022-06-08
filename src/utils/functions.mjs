import { KEY_ARG_USERNAME, GUEST_NAME, SEPARATOR_KEY_VALUE_ARG } from './constant.mjs';
import { EOL } from 'os';

export const print = (data) => {
  process.stdout.write(data);
}

export const printCurrentlyDir = (pathDir) => {
  print(`You are currently in ${pathDir}${EOL}`);
}

export const getUserNameFromArg = (listArgs) => {
  const argUserName = listArgs.find(arg => arg.includes(KEY_ARG_USERNAME));
  if(argUserName) {
    return argUserName.split(SEPARATOR_KEY_VALUE_ARG).pop();
  }
  return GUEST_NAME;
}

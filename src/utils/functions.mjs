import { KEY_ARG_USERNAME, GUEST_NAME } from './constant.mjs';
import { EOL } from 'os';

export const print = (data) => {
  process.stdout.write(data);
}

export const printCurrentlyDir = () => {
  print(`You are currently in ${process.cwd()}${EOL}`);
}

export const getUserNameFromArg = (listArgs) => {
  const argUserName = listArgs.find(arg => arg.includes(KEY_ARG_USERNAME));
  if(argUserName) {
    return argUserName.split('=').pop();
  }
  return GUEST_NAME;
}
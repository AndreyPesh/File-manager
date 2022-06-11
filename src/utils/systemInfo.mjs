import { print } from './common.mjs';
import { systemFlagInfo } from './constant.mjs';
import os, { EOL } from 'os';


export const printSystemInfo = (flag) => {
  switch (flag) {
    case systemFlagInfo.eol:
      print(`${JSON.stringify(EOL)} ${EOL}`);
      break;
    case systemFlagInfo.cpu:
      printCPUInfo();
      break;
    case systemFlagInfo.homedir:
      print(`Homedir: ${os.homedir()} ${EOL}`);
      break;
    case systemFlagInfo.username:
      print(`User: ${os.userInfo().username} ${EOL}`);
      break;
    case systemFlagInfo.arch:
      print(`CPU architecture: ${os.arch()} ${EOL}`);
      break;
    default:
      break;
  }
}

export const checkFlag = (flag) => {
  const listFlags = Object.values(systemFlagInfo);
  return listFlags.includes(flag);
}

const printCPUInfo = () => {
  const cpuInfo = os.cpus();
  print(`Overall amount of CPUs: ${cpuInfo.length} ${EOL}`);
  cpuInfo.forEach(cpu => {
    print(`Model : ${cpu.model} ${EOL}`);
    print(`Clock rate : ${cpu.speed / 1000} GHz ${EOL}`);
  });
}
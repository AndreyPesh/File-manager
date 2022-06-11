import { print } from './functions.mjs';
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
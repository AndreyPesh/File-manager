import { EOL } from 'os';
import path, { sep } from 'path';
import { access, readdir } from 'fs/promises';
import { print } from './functions.mjs';
import { FAILED_MESSAGE } from './constant.mjs';

export const getUpDirectory = (currentDirPath) => {
  const arrayDirPaths = currentDirPath.split(`${sep}`);
  arrayDirPaths.pop();
  if (arrayDirPaths.length === 1) {
    return arrayDirPaths[0].replace(':', `:${sep}`);
  }
  return arrayDirPaths.join(`${sep}`);
}

const isSystemDrivePath = (pathToDir) => {
  return /:/.test(pathToDir);
}

const normalizeSystemDrivePath = (path) => {
  return path.replace(':', `:${sep}`).replace('.', '');
}

export const moveToDir = async (currentPath, pathToDir) => {
  const normalizePath = path.normalize(pathToDir);
  const isAbsPath = path.isAbsolute(pathToDir);
  const isSystemDrive = isSystemDrivePath(pathToDir);
  let resultPath = '';
  try {
    if (isAbsPath) {
      resultPath = normalizePath;
    } else if (isSystemDrive) {
      resultPath = normalizeSystemDrivePath(normalizePath);
    } else {
      resultPath = path.join(currentPath, normalizePath);
    }
    await access(resultPath);
    return resultPath;
  } catch {
    print(`${FAILED_MESSAGE} ${EOL}`);
  }
  return currentPath;
}

export const readDir = async (pathToDir) => {
  const rs = await readdir(path.join(pathToDir));
  console.log(rs);
}
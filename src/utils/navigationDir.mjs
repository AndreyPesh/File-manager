import { sep } from 'path';

export const getUpDirectory = (currentDirPath) => {
  const arrayDirPaths = currentDirPath.split(`${sep}`);
  if (arrayDirPaths.length === 1) {
    return arrayDirPaths[0];
  }
  arrayDirPaths.pop();
  return arrayDirPaths.join(`${sep}`);
}
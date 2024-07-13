import { homedir } from 'os';
import { join } from 'path';
import { promises } from 'fs';

import { ValueOfParam } from '../types/types';

const filePath = join(homedir(), 'weather-data.json');

const saveKeyValue = async (key: string, value: ValueOfParam) => {
  let data = {} as Record<string, ValueOfParam>;
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    data = JSON.parse(file as unknown as string);
  }
  data[key] = value;
  await promises.writeFile(filePath, JSON.stringify(data));
};

const getKeyValue = async (key: string) => {
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    const data = JSON.parse(file as unknown as string);
    return data[key];
  }
  return undefined;
};

const isExist = async (path: string) => {
  try {
    await promises.stat(path);
    return true;
  } catch (e) {
    return false;
  }
};

export { saveKeyValue, getKeyValue };

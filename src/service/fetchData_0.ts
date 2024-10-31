import fs from 'fs/promises';
import path from 'path';
import { JSON_ROOT } from './env';

const _fetchJson = async (filePath: string) => {
  try {
    const fullPath = path.resolve(filePath);
    const data = await fs.readFile(fullPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading JSON:', error);
    return null;
  }
};

const fetchJson = async (name: string) => {
  return _fetchJson(`${JSON_ROOT}${name}.json`);
};

export { fetchJson };

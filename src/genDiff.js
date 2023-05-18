import _ from 'lodash';
import fs from 'node:fs';
import path from 'node:path';
// import process from 'node:process';

export default (filePath1, filePath2, format) => {
  const fileExtension = (filePath) => path.extname(filePath);
  const absolutePath = (filePath) => path.resolve(filePath);
  const readFile = (filePath) => fs.readFileSync(absolutePath(filePath), 'utf-8').trim();
  const parseFile = (filePath) => {
    if (fileExtension(filePath) === '.json') {
      return JSON.parse(readFile(filePath));
    }
  };

  const obj1 = parseFile(filePath1);
  const obj2 = parseFile(filePath2);

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys = _.sortBy(_.union(keys1, keys2));

  const currentIndent = ' '.repeat(2);
  const lines = keys.flatMap((key) => {
    if (!Object.hasOwn(obj1, key)) {
      return `${currentIndent}+ ${key}: ${obj2[key]}`;
    }
    if (!Object.hasOwn(obj2, key)) {
      return `${currentIndent}- ${key}: ${obj1[key]}`;
    }
    if (obj1[key] !== obj2[key]) {
      return [`${currentIndent}- ${key}: ${obj1[key]}`, `${currentIndent}+ ${key}: ${obj2[key]}`];
    }
    return `${currentIndent.repeat(2)}${key}: ${obj2[key]}`;
  });

  const string = ['{', ...lines, '}'].join('\n');

  return string;
};

import _ from 'lodash';
import parse from './parsers.js';

// eslint-disable-next-line no-unused-vars
export default (filePath1, filePath2, format) => {
  const obj1 = parse(filePath1);
  const obj2 = parse(filePath2);

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

import path from 'node:path';
import { fileURLToPath } from 'node:url';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  expect,
  beforeAll,
  test,
  describe,
} from '@jest/globals';
import genDiff from '../src/genDiff.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

let filePath1 = '';
let filePath2 = '';

describe('Comparison of files (JSON)', () => {
  beforeAll(() => {
    filePath1 = getFixturePath('file1.json');
    filePath2 = getFixturePath('file2.json');
  });

  test('Comparison of flat files without specifying the output format', () => {
    expect(genDiff(filePath1, filePath2)).toStrictEqual(expected);
  });
});

describe('Comparison of files (YAML)', () => {
  beforeAll(() => {
    filePath1 = getFixturePath('file1.yaml');
    filePath2 = getFixturePath('file2.yaml');
  });

  test('Comparison of flat files without specifying the output format', () => {
    expect(genDiff(filePath1, filePath2)).toStrictEqual(expected);
  });
});

import path from 'node:path';
import { fileURLToPath } from 'node:url';
// eslint-disable-next-line import/no-extraneous-dependencies
import { expect, beforeAll, test } from '@jest/globals';
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

beforeAll(() => {
  filePath1 = getFixturePath('file1.json');
  filePath2 = getFixturePath('file2.json');
});

test('Comparison of flat files (JSON)', () => {
  expect(genDiff(filePath1, filePath2)).toStrictEqual(expected);
});

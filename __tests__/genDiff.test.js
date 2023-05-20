import fs from 'node:fs';
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
import { expectedFlatStylish, expectedNestedStylish, expectedNestedPlain } from '../__fixtures__/expected.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let filePath1 = '';
let filePath2 = '';
let expectedJSON = '';

describe('Comparison of files (JSON)', () => {
  describe('Flat files', () => {
    beforeAll(() => {
      filePath1 = getFixturePath('file1_flat.json');
      filePath2 = getFixturePath('file2_flat.json');
    });

    test('Without output format', () => {
      expect(genDiff(filePath1, filePath2)).toStrictEqual(expectedFlatStylish);
    });

    test('With stylish format', () => {
      expect(genDiff(filePath1, filePath2, 'stylish')).toStrictEqual(expectedFlatStylish);
    });
  });

  describe('Nested files', () => {
    beforeAll(() => {
      filePath1 = getFixturePath('file1_nested.json');
      filePath2 = getFixturePath('file2_nested.json');
      expectedJSON = readFile('expected_file.json');
    });

    test('Without output format', () => {
      expect(genDiff(filePath1, filePath2)).toStrictEqual(expectedNestedStylish);
    });

    test('With stylish format', () => {
      expect(genDiff(filePath1, filePath2, 'stylish')).toStrictEqual(expectedNestedStylish);
    });

    test('With plain format', () => {
      expect(genDiff(filePath1, filePath2, 'plain')).toStrictEqual(expectedNestedPlain);
    });

    test('With json format', () => {
      expect(genDiff(filePath1, filePath2, 'json')).toStrictEqual(expectedJSON);
    });
  });
});

describe('Comparison of files (YAML)', () => {
  describe('Flat files', () => {
    beforeAll(() => {
      filePath1 = getFixturePath('file1_flat.yaml');
      filePath2 = getFixturePath('file2_flat.yaml');
    });

    test('Without output format', () => {
      expect(genDiff(filePath1, filePath2)).toStrictEqual(expectedFlatStylish);
    });

    test('With stylish format', () => {
      expect(genDiff(filePath1, filePath2, 'stylish')).toStrictEqual(expectedFlatStylish);
    });
  });

  describe('Nested files', () => {
    beforeAll(() => {
      filePath1 = getFixturePath('file1_nested.yaml');
      filePath2 = getFixturePath('file2_nested.yaml');
      expectedJSON = readFile('expected_file.json');
    });

    test('Without output format', () => {
      expect(genDiff(filePath1, filePath2)).toStrictEqual(expectedNestedStylish);
    });

    test('With stylish format', () => {
      expect(genDiff(filePath1, filePath2, 'stylish')).toStrictEqual(expectedNestedStylish);
    });

    test('With plain format', () => {
      expect(genDiff(filePath1, filePath2, 'plain')).toStrictEqual(expectedNestedPlain);
    });

    test('With json format', () => {
      expect(genDiff(filePath1, filePath2, 'json')).toStrictEqual(expectedJSON);
    });
  });
});

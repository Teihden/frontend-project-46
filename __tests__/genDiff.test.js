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

let filePath1 = '';
let filePath2 = '';

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
  });
});

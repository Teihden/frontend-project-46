import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  expect,
  test,
  describe,
} from '@jest/globals';
import genDiff from '../src/genDiff.js';
import { expectedStylish, expectedPlain } from '../__fixtures__/expected.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const filePathJSON1 = getFixturePath('file1.json');
const filePathJSON2 = getFixturePath('file2.json');
const filePathYAML1 = getFixturePath('file1.yaml');
const filePathYAML2 = getFixturePath('file2.yaml');
const filePathYML1 = getFixturePath('file1.yml');
const filePathYML2 = getFixturePath('file2.yml');
const fileExpectedJSON = readFile('expected_file.json');

describe('Comparison of files (JSON)', () => {
  describe('Nested files', () => {
    test('Without output format', () => {
      expect(genDiff(filePathJSON1, filePathJSON2)).toStrictEqual(expectedStylish);
    });

    test('With stylish format', () => {
      expect(genDiff(filePathJSON1, filePathJSON2, 'stylish')).toStrictEqual(expectedStylish);
    });

    test('With plain format', () => {
      expect(genDiff(filePathJSON1, filePathJSON2, 'plain')).toStrictEqual(expectedPlain);
    });

    test('With json format', () => {
      expect(genDiff(filePathJSON1, filePathJSON2, 'json')).toStrictEqual(fileExpectedJSON);
    });
  });
});

describe('Comparison of files (YAML)', () => {
  describe('Extension YML', () => {
    test('Without output format', () => {
      expect(genDiff(filePathYML1, filePathYML2)).toStrictEqual(expectedStylish);
    });

    test('With stylish format', () => {
      expect(genDiff(filePathYML1, filePathYML2, 'stylish')).toStrictEqual(expectedStylish);
    });

    test('With plain format', () => {
      expect(genDiff(filePathYML1, filePathYML2, 'plain')).toStrictEqual(expectedPlain);
    });

    test('With json format', () => {
      expect(genDiff(filePathYML1, filePathYML2, 'json')).toStrictEqual(fileExpectedJSON);
    });
  });

  describe('Extension YAML', () => {
    test('Without output format', () => {
      expect(genDiff(filePathYAML1, filePathYAML2)).toStrictEqual(expectedStylish);
    });

    test('With stylish format', () => {
      expect(genDiff(filePathYAML1, filePathYAML2, 'stylish')).toStrictEqual(expectedStylish);
    });

    test('With plain format', () => {
      expect(genDiff(filePathYAML1, filePathYAML2, 'plain')).toStrictEqual(expectedPlain);
    });

    test('With json format', () => {
      expect(genDiff(filePathYAML1, filePathYAML2, 'json')).toStrictEqual(fileExpectedJSON);
    });
  });
});

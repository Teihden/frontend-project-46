import fs from 'node:fs';
import path from 'node:path';
// eslint-disable-next-line import/no-extraneous-dependencies
import yaml from 'js-yaml';

export default (filePath) => {
  const fileExtension = path.extname(filePath);
  const absolutePath = path.resolve(filePath);
  const file = fs.readFileSync(absolutePath, 'utf-8').trim();

  const chooseParser = (extension) => {
    const obj = {
      '': JSON.parse,
      '.json': JSON.parse,
      '.yml': yaml.load,
      '.yaml': yaml.load,
    };

    return obj[extension];
  };

  const parse = chooseParser(fileExtension);

  return parse(file);
};

import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

export default (filePath) => {
  const fileExtension = path.extname(filePath);
  const absolutePath = path.resolve(filePath);
  const file = fs.readFileSync(absolutePath, 'utf-8').trim();

  let parse;
  if (fileExtension === '' || fileExtension === '.json') {
    parse = JSON.parse;
  } else if (fileExtension === '.yml' || fileExtension === '.yaml') {
    parse = yaml.load;
  }

  return parse(file);
};

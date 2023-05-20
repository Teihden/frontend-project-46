import formatStylish from './formatStylish.js';
import formatPlain from './formatPlain.js';
import formatJSON from './formatJSON.js';

export default (tree, outputFormat) => {
  let format;
  if (outputFormat === 'stylish') {
    format = formatStylish;
  } else if (outputFormat === 'plain') {
    format = formatPlain;
  } else if (outputFormat === 'json') {
    format = formatJSON;
  }

  return format(tree);
};

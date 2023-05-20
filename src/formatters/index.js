import formatStylish from './formatStylish.js';
import formatPlain from './formatPlain.js';

export default (tree, outputFormat) => {
  let format;
  if (outputFormat === 'stylish') {
    format = formatStylish;
  } else if (outputFormat === 'plain') {
    format = formatPlain;
  }

  return format(tree);
};

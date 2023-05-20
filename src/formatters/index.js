import formatStylish from './formatStylish.js';
import formatPlain from './formatPlain.js';
import formatJSON from './formatJSON.js';

export default (tree, outputFormat) => {
  const chooseFormater = (format) => {
    const obj = {
      stylish: formatStylish,
      plain: formatPlain,
      json: formatJSON,
    };

    return obj[format];
  };

  const format = chooseFormater(outputFormat);

  return format(tree);
};

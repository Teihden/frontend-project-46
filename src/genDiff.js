import _ from 'lodash';
import parse from './parsers.js';

// eslint-disable-next-line no-unused-vars
export default (filePath1, filePath2, format = 'stylish') => {
  const buildDiffTree = (objToCompare1, objToCompare2) => {
    const keys1 = Object.keys(objToCompare1);
    const keys2 = Object.keys(objToCompare2);
    const keys = _.sortBy(_.union(keys1, keys2));

    const diffLevel = keys.map((key) => {
      const obj = {};
      obj.name = key;

      if (!Object.hasOwn(objToCompare1, key)) {
        obj.meta = 'added';
        obj.value = objToCompare2[key];
        return obj;
      }

      if (!Object.hasOwn(objToCompare2, key)) {
        obj.meta = 'removed';
        obj.value = objToCompare1[key];
        return obj;
      }

      if (!_.isEqual(objToCompare1[key], objToCompare2[key])) {
        if (_.isObject(objToCompare1[key]) && _.isObject(objToCompare2[key])) {
          obj.meta = 'shared';
          obj.value = buildDiffTree(objToCompare1[key], objToCompare2[key]);
        } else {
          obj.meta = 'updated';
          obj.removedValue = objToCompare1[key];
          obj.addedValue = objToCompare2[key];
        }
        return obj;
      }

      obj.meta = 'shared';
      obj.value = objToCompare1[key];
      return obj;
    });

    return diffLevel;
  };

  // eslint-disable-next-line consistent-return
  const formater = (currentValue, outputFormat, depth) => {
    if (outputFormat === 'stylish') {
      const defineCharacter = (meta) => {
        switch (meta) {
          case 'added': {
            return '+ ';
          }
          case 'removed': {
            return '- ';
          }
          case 'shared': {
            return '  ';
          }
          default: {
            return '  ';
          }
        }
      };

      const spacesCount = 4;
      const indentSize = (level) => level * spacesCount;
      const defaultIndent = ' '.repeat(indentSize(depth));
      const formatedIndent = ' '.repeat(indentSize(depth) - 2);
      const bracketIndent = ' '.repeat(indentSize(depth) - spacesCount);

      if (!_.isObject(currentValue) || (_.isArray(currentValue) && !_.isObject(currentValue[0]))) {
        return `${currentValue}`;
      }

      let lines = [];

      if (_.isObject(currentValue)) {
        lines = Object
          .entries(currentValue)
          .map(([key, value]) => `${defaultIndent}${key}: ${formater(value, 'stylish', depth + 1)}`);
      }

      if (_.isArray(currentValue)) {
        lines = currentValue.flatMap((el) => {
          if (el.meta === 'updated') {
            return [
              `${formatedIndent}${defineCharacter('removed')}${el.name}: ${formater(el.removedValue, 'stylish', depth + 1)}`,
              `${formatedIndent}${defineCharacter('added')}${el.name}: ${formater(el.addedValue, 'stylish', depth + 1)}`,
            ];
          }
          return `${formatedIndent}${defineCharacter(el.meta)}${el.name}: ${formater(el.value, 'stylish', depth + 1)}`;
        });
      }

      const string = ['{', ...lines, `${bracketIndent}}`].join('\n');
      return string;
    }
  };

  const obj1 = parse(filePath1);
  const obj2 = parse(filePath2);
  const diffTree = buildDiffTree(obj1, obj2);
  const formatedDiffTree = formater(diffTree, format, 1);

  return formatedDiffTree;
};

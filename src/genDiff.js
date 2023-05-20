import _ from 'lodash';
import parse from './parsers.js';
import formatDiffTree from './formatters/index.js';

export default (filePath1, filePath2, formatName = 'stylish') => {
  const buildDiffTree = (objToCompare1, objToCompare2) => {
    const keys1 = Object.keys(objToCompare1);
    const keys2 = Object.keys(objToCompare2);
    const keys = _.sortBy(_.union(keys1, keys2));

    const diffLevel = keys.map((key) => {
      const obj = {};
      obj.name = key;

      if (!Object.hasOwn(objToCompare1, key) || !Object.hasOwn(objToCompare2, key)) {
        obj.meta = Object.hasOwn(objToCompare1, key) ? 'removed' : 'added';
        obj.value = Object.hasOwn(objToCompare1, key) ? objToCompare1[key] : objToCompare2[key];
        return obj;
      }

      if (!_.isEqual(objToCompare1[key], objToCompare2[key])) {
        if (_.isPlainObject(objToCompare1[key]) && _.isPlainObject(objToCompare2[key])) {
          obj.meta = 'shared';
          obj.children = buildDiffTree(objToCompare1[key], objToCompare2[key]);
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

  const obj1 = parse(filePath1);
  const obj2 = parse(filePath2);
  const diffTree = buildDiffTree(obj1, obj2);
  const formatedDiffTree = formatDiffTree(diffTree, formatName);

  return formatedDiffTree;
};

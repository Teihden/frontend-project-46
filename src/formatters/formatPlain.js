import _ from 'lodash';

const fotmatValue = (value) => {
  if (_.isString(value)) {
    return `'${value}'`;
  }
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return value;
};

export default (tree) => {
  const iter = (nodes, ancestor) => nodes.flatMap((el) => {
    if (Object.hasOwn(el, 'children')) {
      return iter(el.children, `${ancestor}${el.name}.`);
    }
    if (el.meta !== 'shared') {
      const makeText = (element) => {
        const obj = {
          added: `was added with value: ${fotmatValue(element.value)}`,
          removed: 'was removed',
          updated: `was updated. From ${fotmatValue(element.removedValue)} to ${fotmatValue(element.addedValue)}`,
        };
        return obj[element.meta];
      };
      return `Property '${ancestor}${el.name}' ${makeText(el)}`;
    }
    return [];
  }).join('\n');

  return iter(tree, '');
};

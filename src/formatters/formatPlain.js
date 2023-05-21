import _ from 'lodash';

const formatValue = (value) => {
  if (_.isString(value)) {
    return `'${value}'`;
  }

  if (_.isObject(value)) {
    return '[complex value]';
  }

  return value;
};

const selectOptionText = (prefix, element) => {
  const {
    name,
    meta,
    value,
    removedValue,
    addedValue,
  } = element;

  const obj = {
    added: `was added with value: ${formatValue(value)}`,
    removed: 'was removed',
    updated: `was updated. From ${formatValue(removedValue)} to ${formatValue(addedValue)}`,
  };

  return `Property '${prefix}${name}' ${obj[meta]}`;
};

export default (tree) => {
  const iter = (nodes, ancestor) => nodes.flatMap((node) => {
    if (Object.hasOwn(node, 'children')) {
      return iter(node.children, `${ancestor}${node.name}.`);
    }

    if (node.meta !== 'shared') {
      return selectOptionText(ancestor, node);
    }

    return [];
  }).join('\n');

  return iter(tree, '');
};

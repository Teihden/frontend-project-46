import _ from 'lodash';

export default (tree) => {
  const iter = (nodes, ancestor) => {
    const fotmatValue = (value) => {
      if (_.isString(value)) {
        return `'${value}'`;
      }
      if (_.isObject(value)) {
        return '[complex value]';
      }
      return value;
    };

    return nodes.flatMap((el) => {
      if (Object.hasOwn(el, 'children')) {
        return iter(el.children, `${ancestor}${el.name}.`);
      }
      if (el.meta === 'added') {
        return `Property '${ancestor}${el.name}' was added with value: ${fotmatValue(el.value)}`;
      }
      if (el.meta === 'removed') {
        return `Property '${ancestor}${el.name}' was removed`;
      }
      if (el.meta === 'updated') {
        return `Property '${ancestor}${el.name}' was updated. From ${fotmatValue(el.removedValue)} to ${fotmatValue(el.addedValue)}`;
      }
      return [];
    }).join('\n');
  };

  return iter(tree, '');
};

import _ from 'lodash';

const defineCharacter = (meta) => {
  switch (meta) {
    case 'added': {
      return '+ ';
    }
    case 'removed': {
      return '- ';
    }
    default: {
      return '  ';
    }
  }
};

const formatLines = (strings, indent) => ['{', ...strings, `${indent}}`].join('\n');

export default (tree) => {
  const iter = (currentValue, depth) => {
    const spacesCount = 4;
    const indentSize = (level) => level * spacesCount;
    const defaultIndent = ' '.repeat(indentSize(depth));
    const formattedIndent = ' '.repeat(indentSize(depth) - 2);
    const bracketIndent = ' '.repeat(indentSize(depth) - spacesCount);

    if (_.isPlainObject(currentValue)) {
      const lines = Object
        .entries(currentValue)
        .map(([key, value]) => `${defaultIndent}${key}: ${iter(value, depth + 1)}`);

      return formatLines(lines, bracketIndent);
    }

    if (_.isArray(currentValue)) {
      const nodes = currentValue.flatMap((node) => {
        const makeLine = (name, meta, value) => `${formattedIndent}${defineCharacter(meta)}${name}: ${iter(value, depth + 1)}`;
        const {
          name,
          meta,
          children,
          value,
          removedValue,
          addedValue,
        } = node;

        if (Object.hasOwn(node, 'children')) {
          return makeLine(name, meta, children);
        }

        if (node.meta === 'updated') {
          return [
            makeLine(name, 'removed', removedValue),
            makeLine(name, 'added', addedValue),
          ];
        }
        return makeLine(name, meta, value);
      });

      return formatLines(nodes, bracketIndent);
    }

    return `${currentValue}`;
  };

  return iter(tree, 1);
};

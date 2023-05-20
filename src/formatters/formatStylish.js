import _ from 'lodash';

export default (tree) => {
  const iter = (currentValue, depth) => {
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

    const spacesCount = 4;
    const indentSize = (level) => level * spacesCount;
    const defaultIndent = ' '.repeat(indentSize(depth));
    const formattedIndent = ' '.repeat(indentSize(depth) - 2);
    const bracketIndent = ' '.repeat(indentSize(depth) - spacesCount);

    const formatLines = (strings) => ['{', ...strings, `${bracketIndent}}`].join('\n');

    if (_.isPlainObject(currentValue)) {
      const linesValue = Object
        .entries(currentValue)
        .map(([key, value]) => `${defaultIndent}${key}: ${iter(value, depth + 1)}`);

      return formatLines(linesValue);
    }

    if (_.isArray(currentValue)) {
      const linesNode = currentValue.flatMap((el) => {
        if (Object.hasOwn(el, 'children')) {
          return `${formattedIndent}${defineCharacter(el.meta)}${el.name}: ${iter(el.children, depth + 1)}`;
        }
        if (el.meta === 'updated') {
          return [
            `${formattedIndent}${defineCharacter('removed')}${el.name}: ${iter(el.removedValue, depth + 1)}`,
            `${formattedIndent}${defineCharacter('added')}${el.name}: ${iter(el.addedValue, depth + 1)}`,
          ];
        }
        return `${formattedIndent}${defineCharacter(el.meta)}${el.name}: ${iter(el.value, depth + 1)}`;
      });

      return formatLines(linesNode);
    }

    return `${currentValue}`;
  };

  return iter(tree, 1);
};

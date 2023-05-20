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
        .map(([key, value]) => `${defaultIndent}${key}: ${iter(value, depth + 1)}`);
    }

    if (_.isArray(currentValue)) {
      lines = currentValue.flatMap((el) => {
        if (Object.hasOwn(el, 'children')) {
          return `${formatedIndent}${defineCharacter(el.meta)}${el.name}: ${iter(el.children, depth + 1)}`;
        }
        if (el.meta === 'updated') {
          return [
            `${formatedIndent}${defineCharacter('removed')}${el.name}: ${iter(el.removedValue, depth + 1)}`,
            `${formatedIndent}${defineCharacter('added')}${el.name}: ${iter(el.addedValue, depth + 1)}`,
          ];
        }
        return `${formatedIndent}${defineCharacter(el.meta)}${el.name}: ${iter(el.value, depth + 1)}`;
      });
    }

    const string = ['{', ...lines, `${bracketIndent}}`].join('\n');
    return string;
  };

  return iter(tree, 1);
};

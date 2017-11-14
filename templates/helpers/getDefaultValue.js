const getDefaultValue = type => {
  switch (type) {
    case 'bool':
      return 'false';
    case 'number':
      return '0';
    case 'array':
      return '[]';
    case 'object':
      return '{}';
    case 'func':
      return '(parameterA: number) => true';
    case 'node':
      return '<div></div>';
    default:
      return '\'\'';
  }
};

module.exports = getDefaultValue;

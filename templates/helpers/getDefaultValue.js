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
      return '() => true';
    default:
      return '\'\'';
  }
};

module.exports = getDefaultValue;

const getDefaultValue = require('./getDefaultValue');

const renderDefaultPropsList = (props, isClass = false) => props.map(
  prop => !prop.required && `${isClass ? '    ' : '  '}${prop.name}: ${getDefaultValue(prop.type)},`
).filter(e => e).join('\n');

const renderDefaultProps = (name, props, isClass = false) => {
  const PropsList = renderDefaultPropsList(props, isClass);
  if (isClass) return `static defaultProps = {
${PropsList}
  };`;

  return `${name}.defaultProps = {
${PropsList}
};`;
};

module.exports = renderDefaultProps;

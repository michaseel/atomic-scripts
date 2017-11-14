const getDefaultValue = require('./getDefaultValue');

const renderDefaultPropsList = (props) => props.map(
  prop => !prop.required && `  ${prop.name}: ${getDefaultValue(prop.type)},`
).filter(e => e).join('\n');

const renderDefaultProps = (name, props) => {
  const PropsList = renderDefaultPropsList(props);
  return `${name}.defaultProps = {
${PropsList}  
}`;
};

module.exports = renderDefaultProps;

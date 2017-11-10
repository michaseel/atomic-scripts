const getDefaultValue = require('./getDefaultValue');

const renderRequiredProps = (props) =>
  props.map(prop =>
    prop.required && prop.name !== 'children'
    ? `      ${prop.name}={${getDefaultValue(prop.type)}}\n`
    : ''
).join('');

const renderClosingTag = (children, name) => children === true ?
  `>
       Lorem Ipsum Children
    </${name}>`
  : '/>';

module.exports = (name, props, children) => {
  return `<${name} 
${renderRequiredProps(props)}
    ${renderClosingTag(children, name)}`;
};

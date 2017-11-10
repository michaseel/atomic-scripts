const getDefaultValue = require('./helpers/getDefaultValue');
const displayPropValues = require('./helpers/displayPropValues');

const renderPropList = (props) => props.map(
  prop => prop.required
    ? `  ${prop.name},`
    : `  ${prop.name} = ${getDefaultValue(prop.type)},`
  ).join('\n');

const renderPropTypes = (props) => props.map(
  prop => `  ${prop.name}: PropTypes.${prop.type}${prop.required ? '.isRequired' : ''},`)
  .join('\n');

module.exports = ({ name, type, props = [], children }) =>
`import React from 'react';
import PropTypes from 'prop-types';

const ${name} = ({ 
${renderPropList(props)} 
}) => (
  <div>
    <h3>Empty ${type} ${name}</h3>
    ${displayPropValues(props, children)}
  </div>
);

${name}.propTypes = {
${renderPropTypes(props)}
};

export default ${name};
`;

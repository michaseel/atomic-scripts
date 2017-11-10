const getDefaultValue = require('./helpers/getDefaultValue');

const renderPropList = (props = []) => props.map(
  prop => prop.required
    ? `  ${prop.name},`
    : `  ${prop.name} = ${getDefaultValue(prop.type)},`
  ).join('\n');

const displayPropValues = (props = []) => props.map(
  prop => prop.name === 'children'
    ? ''
    : `      ${prop.name}: {JSON.stringify(${prop.name})}\n`
  ).join('');

const renderPropTypes = (props = []) => props.map(
  prop => `  ${prop.name}: PropTypes.${prop.type}${prop.required ? '.isRequired' : ''},`)
  .join('\n');

module.exports = answers =>
`import React from 'react';
import PropTypes from 'prop-types';

const ${answers.name} = ({ 
${renderPropList(answers.props)} 
}) => (
  <div>
    <h3>Empty ${answers.type} ${answers.name}</h3>
    <pre>
      These are your props:
      
${displayPropValues(answers.props)}    
    </pre>
    ${answers.children ? '{children}' : ''}
  </div>
);

${answers.name}.propTypes = {
${renderPropTypes(answers.props)}
};

export default ${answers.name};
`;

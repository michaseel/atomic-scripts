const renderDefaultProps = require('./helpers/renderDefaultProps');
const displayPropValues = require('./helpers/displayPropValues');

const renderPropList = (props) => props.map(
  prop => `  ${prop.name},`
  ).join('\n');

const renderPropTypes = require('./helpers/renderPropTypes');

module.exports = ({ name, type, props = [], children }) =>
`import React from 'react';
import type { Node } from 'react';

${renderPropTypes(props)}

const ${name} = ({ 
${renderPropList(props)} 
}): Node => (
  <div>
    <h3>Empty ${type} ${name}</h3>
      ${displayPropValues(props, children)}
  </div>
);

${renderDefaultProps(name, props)} 

export default ${name};
`;

const renderDefaultProps = require('./helpers/renderDefaultProps');

module.exports = ({ name, props = [] }) =>
`import React from 'react';
import type {Node} from 'react';
import styled from 'styled-components';

const ${name}Styled = styled.span\`
  
\`;

const ${name} = props => (
  <${name}Styled {...props}>
    {props.children}
  </${name}Styled>
);

${renderDefaultProps(name, props)} 

export default ${name};
`;

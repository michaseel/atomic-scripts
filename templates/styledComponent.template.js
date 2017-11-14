module.exports = answers =>
`import React from 'react';
import type {Node} from 'react';
import styled from 'styled-components';

const ${answers.name}Styled = styled.span\`
  
\`;

const ${answers.name} = props => (
  <${answers.name}Styled {...props}>
    {props.children}
  </${answers.name}Styled>
);

${answers.name}.defaultProps = {
  
};

export default ${answers.name};
`;

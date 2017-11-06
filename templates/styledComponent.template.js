module.exports = answers =>
`import React from 'react';
import PropTypes from 'prop-types';
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

${answers.name}.propTypes = {
  
};

export default ${answers.name};
`;

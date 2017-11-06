module.exports = answers => {
  switch (answers.notation) {
    case 'class':
      return classComponent(answers);
    break;

    case 'styled':
      return styledComponent(answers);
    break;

    default:
      return statelessComponent(answers);
    break;

  }
};

const classComponent = answers =>
`import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ${answers.name} extends Component {
  state = {
   
  };

  static propTypes = {

  };

  static defaultProps = {
  
  };

  render() {
    return (
      <div>
        Empty ${answers.type} ${answers.name}
      </div>
    );
  }
}
`;

const styledComponent = answers =>
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

const statelessComponent = answers =>
`import React from 'react';
import PropTypes from 'prop-types';

const ${answers.name} = ({ }) =>
  <div>
    Empty ${answers.type} ${answers.name}
  </div>;

${answers.name}.propTypes = {

};

export default ${answers.name};
`;

module.exports = answers =>
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

module.exports = answers =>
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

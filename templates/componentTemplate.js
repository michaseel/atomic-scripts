module.exports = answers =>
`import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default class ${answers.name} extends Component {
  constructor(props) {
    super(props);
    this.state = {
   
    };
  }

  static propTypes = {

  };

  static defaultProps = {
  
  };

  render() {
    return (
      <div>Empty ${answers.type} ${answers.name}</div>
    );
  }
}
`;

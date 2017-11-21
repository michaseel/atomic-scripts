const getDefaultValue = require('./helpers/getDefaultValue');
const displayPropValues = require('./helpers/displayPropValues');
const renderPropTypes = require('./helpers/renderPropTypes');
const renderDefaultProps = require('./helpers/renderDefaultProps');

const destructureProps = (props) => {
  if (props.length === 0) return '';

  const propList = props.map(
    prop => `      ${prop.name},`)
    .join('\n');

  return `const {
${propList}
    } = this.props;`;
};

module.exports = ({ name, type, props = [], children }) =>
`// @flow
import React, { Component } from 'react';
import type { Node } from 'react';

${renderPropTypes(props)}

type State = {

}

class ${name} extends Component<Props, State> {
  ${renderDefaultProps(name, props)}
  
  /* the initial state */
  state = {

  };

  render(): Node {
    ${destructureProps(props)}
    return (
      <div>
        <h3>Empty ${type} ${name}</h3>
        ${displayPropValues(props, children)}
      </div>
    );
  }
}

export default ${name};
`;

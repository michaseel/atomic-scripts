const getDefaultValue = require('./helpers/getDefaultValue');
const displayPropValues = require('./helpers/displayPropValues');
const renderPropTypes = require('./helpers/renderPropTypes');

const destructureProps = (props) => {
  if (props.length === 0) return '';

  const propList = props.map(
    prop => `      ${prop.name},`)
    .join('\n');

  return `const {
${propList}
    } = this.props;`;
};

const renderDefaultProps = (props) => props.map(
  prop => prop.required
    ? ''
    : `    ${prop.name}: ${getDefaultValue(prop.type)},\n`
).join('');

module.exports = ({ name, type, props = [], children }) =>
`import React, { Component } from 'react';
import type { Node } from 'react';

${renderPropTypes(props)}

type State = {
  
}

export default class ${name} extends Component<Props, State> {
  /* the initial state */
  state = {

  };

  static defaultProps = {
${renderDefaultProps(props)}
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
`;

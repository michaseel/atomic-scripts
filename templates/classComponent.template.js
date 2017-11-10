const getDefaultValue = require('./helpers/getDefaultValue');
const displayPropValues = require('./helpers/displayPropValues');

const renderPropTypes = (props) => props.map(
  prop => `    ${prop.name}: PropTypes.${prop.type}${prop.required ? '.isRequired' : ''},`)
  .join('\n');

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
import PropTypes from 'prop-types';

export default class ${name} extends Component {
  state = {

  };

  static propTypes = {
${renderPropTypes(props)}
  };

  static defaultProps = {
${renderDefaultProps(props)}
  };

  render() {
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

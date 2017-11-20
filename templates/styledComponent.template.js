const renderDefaultProps = require('./helpers/renderDefaultProps');
const renderPropTypes = require('./helpers/renderPropTypes');

module.exports = ({ name, props = [] }) =>
`// @flow
import React from 'react';
import type { Node } from 'react';
import styled from 'styled-components';

${renderPropTypes(props)}

const ${name}Styled = styled.span\`
  /* your CSS here */
\`;

const ${name} = (props: Props): Node => <Styled${name} {...props} />;

${renderDefaultProps(name, props)} 

export default ${name};
`;

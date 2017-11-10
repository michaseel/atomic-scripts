const renderComponentDemo = require('./helpers/renderComponentDemo');

module.exports = ({name, type, props = [], children}) =>
`import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import ${name} from './${name}';

it('renders default ${name} snapshot', () => {
  const tree = renderer.create(
    ${renderComponentDemo(name, props, children)}
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
`;

module.exports = answers =>
`import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import ${answers.name} from './${answers.name}';

it('renders default ${answers.name} snapshot', () => {
  const tree = renderer.create(<${answers.name} />).toJSON();
  expect(tree).toMatchSnapshot();
});
`;

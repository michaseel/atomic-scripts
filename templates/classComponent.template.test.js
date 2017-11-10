const classComponent = require('./classComponent.template');

describe('classComponent Template', () => {
  test('with children and props ', () => {
    const answers = {
      name: 'TestName',
      type: 'organism',
      notation: 'stateless',
      children: true,
      props: [
        {
          name: 'propName1',
          type: 'bool',
          required: false,
        },
        {
          name: 'propName2',
          type: 'number',
          required: true,
        },
        {
          name: 'propName3',
          type: 'string',
          required: true,
        },
        {
          name: 'children',
          type: 'node',
          required: true,
        },
      ],
    };
    const result = classComponent(answers);
    expect(result).toContain('import React, { Component } from \'react\';');  // should import react
    expect(result).toContain('import PropTypes from \'prop-types\';'); // should import PropTypes
    expect(result).toContain('export default class TestName extends Component {'); // class declaration
    expect(result).toContain('state = {\n\n  };'); // empty state
    expect(result).toContain('static propTypes = {'); // define PropTypes
    expect(result).toContain('static defaultProps = {'); // define defaultProps


    /* check props: destructuring, display and propTypes */
    expect(result).toContain('propName1: false');
    expect(result).toContain('propName1: {JSON.stringify(propName1)}');
    expect(result).toContain('propName1: PropTypes.bool,');

    expect(result).toContain('propName2: {JSON.stringify(propName2)}');
    expect(result).toContain('propName2: PropTypes.number.isRequired,');

    expect(result).toContain('propName3: {JSON.stringify(propName3)}');
    expect(result).toContain('propName3: PropTypes.string.isRequired,');

    expect(result).toContain('{children}');
    expect(result).toContain('children: PropTypes.node.isRequired,');
  });

  test('without children but with props ', () => {
    const answers = {
      name: 'TestName',
      type: 'organism',
      notation: 'stateless',
      children: false,
      props: [
        {
          name: 'propName1',
          type: 'bool',
          required: false,
        },
        {
          name: 'propName2',
          type: 'number',
          required: true,
        },
        {
          name: 'propName3',
          type: 'string',
          required: true,
        },
      ],
    };
    const result = classComponent(answers);
    expect(result).toContain('import React, { Component } from \'react\';');  // should import react
    expect(result).toContain('import PropTypes from \'prop-types\';'); // should import PropTypes
    expect(result).toContain('export default class TestName extends Component {'); // class declaration
    expect(result).toContain('state = {\n\n  };'); // empty state
    expect(result).toContain('static propTypes = {'); // define PropTypes
    expect(result).toContain('static defaultProps = {'); // define defaultProps


    /* check props: destructuring, display and propTypes */
    expect(result).toContain('propName1: false');
    expect(result).toContain('propName1: {JSON.stringify(propName1)}');
    expect(result).toContain('propName1: PropTypes.bool,');

    expect(result).toContain('propName2: {JSON.stringify(propName2)}');
    expect(result).toContain('propName2: PropTypes.number.isRequired,');

    expect(result).toContain('propName3: {JSON.stringify(propName3)}');
    expect(result).toContain('propName3: PropTypes.string.isRequired,');

    expect(result).not.toContain('{children}');
    expect(result).not.toContain('children: PropTypes.node.isRequired,');
  });

  test('with children without other props ', () => {
    const answers = {
      name: 'TestName',
      type: 'organism',
      notation: 'stateless',
      children: true,
      props: [
        {
          name: 'children',
          type: 'node',
          required: true,
        },
      ],
    };
    const result = classComponent(answers);
    expect(result).toContain('import React, { Component } from \'react\';');  // should import react
    expect(result).toContain('import PropTypes from \'prop-types\';'); // should import PropTypes
    expect(result).toContain('export default class TestName extends Component {'); // class declaration
    expect(result).toContain('state = {\n\n  };'); // empty state
    expect(result).toContain('static propTypes = {'); // define PropTypes
    expect(result).toContain('static defaultProps = {'); // define defaultProps


    /* check props: destructuring, display and propTypes */
    expect(result).not.toContain('propName');

    expect(result).toContain('{children}');
    expect(result).toContain('children: PropTypes.node.isRequired,');
  });

  test('without children and props ', () => {
    const answers = {
      name: 'TestName',
      type: 'organism',
      notation: 'stateless',
      children: false,
      props: [],
    };
    const result = classComponent(answers);
    expect(result).toContain('import React, { Component } from \'react\';');  // should import react
    expect(result).toContain('import PropTypes from \'prop-types\';'); // should import PropTypes
    expect(result).toContain('export default class TestName extends Component {'); // class declaration
    expect(result).toContain('state = {\n\n  };'); // empty state
    expect(result).toContain('static propTypes = {'); // define PropTypes
    expect(result).toContain('static defaultProps = {'); // define defaultProps


    /* check props: destructuring, display and propTypes */
    expect(result).not.toContain('{children}');
    expect(result).not.toContain('<pre>');
  });
});


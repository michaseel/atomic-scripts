const statelessComponent = require('./statelessComponent.template');

describe.skip('statelessComponent Template', () => {
  test('with children an props ', () => {
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
    const result = statelessComponent(answers);
    expect(result).toContain('import React from \'react\';\n');  // should import react
    expect(result).toContain('import PropTypes from \'prop-types\';'); // should import PropTypes
    expect(result).toContain('const TestName = ({'); // function declaration
    expect(result).toContain('}) => ('); // arrow function
    expect(result).toContain('TestName.propTypes = {'); // define PropTypes
    expect(result).toContain('export default TestName;'); // export the function


    /* check props: destructuring, display and propTypes */
    expect(result).toContain('propName1 = ');
    expect(result).toContain('propName1: {JSON.stringify(propName1)}');
    expect(result).not.toContain('propName1,');
    expect(result).toContain('propName1: PropTypes.bool,');

    expect(result).not.toContain('propName2 = ');
    expect(result).toContain('propName2: {JSON.stringify(propName2)}');
    expect(result).toContain('propName2,');
    expect(result).toContain('propName2: PropTypes.number.isRequired,');

    expect(result).not.toContain('propName3 = ');
    expect(result).toContain('propName3: {JSON.stringify(propName3)}');
    expect(result).toContain('propName3,');
    expect(result).toContain('propName3: PropTypes.string.isRequired,');

    expect(result).toContain('children,');
    expect(result).toContain('{children}');
    expect(result).toContain('children: PropTypes.node.isRequired,');
  });

  test('without children and props ', () => {
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
    const result = statelessComponent(answers);
    expect(result).toContain('import React from \'react\';\n');  // should import react
    expect(result).toContain('import PropTypes from \'prop-types\';'); // should import PropTypes
    expect(result).toContain('const TestName = ({'); // function declaration
    expect(result).toContain('}) => ('); // arrow function
    expect(result).toContain('TestName.propTypes = {'); // define PropTypes
    expect(result).toContain('export default TestName;'); // export the function


    /* check props: destructuring, display and propTypes */
    expect(result).toContain('propName1 = ');
    expect(result).toContain('propName1: {JSON.stringify(propName1)}');
    expect(result).not.toContain('propName1,');
    expect(result).toContain('propName1: PropTypes.bool,');

    expect(result).not.toContain('propName2 = ');
    expect(result).toContain('propName2: {JSON.stringify(propName2)}');
    expect(result).toContain('propName2,');
    expect(result).toContain('propName2: PropTypes.number.isRequired,');

    expect(result).not.toContain('propName3 = ');
    expect(result).toContain('propName3: {JSON.stringify(propName3)}');
    expect(result).toContain('propName3,');
    expect(result).toContain('propName3: PropTypes.string.isRequired,');

    expect(result).not.toContain('children');
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
    const result = statelessComponent(answers);
    expect(result).toContain('import React from \'react\';\n');  // should import react
    expect(result).toContain('import PropTypes from \'prop-types\';'); // should import PropTypes
    expect(result).toContain('const TestName = ({'); // function declaration
    expect(result).toContain('}) => ('); // arrow function
    expect(result).toContain('TestName.propTypes = {'); // define PropTypes
    expect(result).toContain('export default TestName;'); // export the function


    /* check props: destructuring, display and propTypes */
    expect(result).not.toContain('propName');

    expect(result).toContain('children,');
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
    const result = statelessComponent(answers);
    expect(result).toContain('import React from \'react\';\n');  // should import react
    expect(result).toContain('import PropTypes from \'prop-types\';'); // should import PropTypes
    expect(result).toContain('const TestName = ({'); // function declaration
    expect(result).toContain('}) => ('); // arrow function
    expect(result).toContain('TestName.propTypes = {'); // define PropTypes
    expect(result).toContain('export default TestName;'); // export the function


    /* check props: destructuring, display and propTypes */
    expect(result).not.toContain('propName');

    expect(result).not.toContain('children');
  });
});


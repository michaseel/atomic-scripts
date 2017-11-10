const testTemplate = require('./test.template');

describe('test Template', () => {
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
    const result = testTemplate(answers);
    expect(result).toContain('import React from \'react\';');  // should import react
    expect(result).toContain('import renderer from \'react-test-renderer\';'); // should import react-test-renderer
    expect(result).toContain('import \'jest-styled-components\';'); // should import react-test-renderer
    expect(result).toContain('import TestName from \'./TestName\';'); // should import the module

    expect(result).not.toContain('propName1');
    expect(result).toContain('propName2={0}');
    expect(result).toContain('propName3={\'\'}');
    expect(result).toContain('Lorem Ipsum Children');
    expect(result).toContain('</TestName>');
    expect(result).not.toContain('/>');
  });

  test('without children an props ', () => {
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
    const result = testTemplate(answers);
    expect(result).toContain('import React from \'react\';');  // should import react
    expect(result).toContain('import renderer from \'react-test-renderer\';'); // should import react-test-renderer
    expect(result).toContain('import \'jest-styled-components\';'); // should import react-test-renderer
    expect(result).toContain('import TestName from \'./TestName\';'); // should import the module

    expect(result).not.toContain('propName1');
    expect(result).toContain('propName2={0}');
    expect(result).toContain('propName3={\'\'}');
    expect(result).not.toContain('Lorem Ipsum Children');
    expect(result).not.toContain('</TestName>');
    expect(result).toContain('/>');
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
    const result = testTemplate(answers);
    expect(result).toContain('import React from \'react\';');  // should import react
    expect(result).toContain('import renderer from \'react-test-renderer\';'); // should import react-test-renderer
    expect(result).toContain('import \'jest-styled-components\';'); // should import react-test-renderer
    expect(result).toContain('import TestName from \'./TestName\';'); // should import the module

    expect(result).not.toContain('={');
    expect(result).toContain('Lorem Ipsum Children');
    expect(result).toContain('</TestName>');
    expect(result).not.toContain('/>');
  });

  test('without children and props ', () => {
    const answers = {
      name: 'TestName',
      type: 'organism',
      notation: 'stateless',
      children: false,
      props: [],
    };
    const result = testTemplate(answers);
    expect(result).toContain('import React from \'react\';');  // should import react
    expect(result).toContain('import renderer from \'react-test-renderer\';'); // should import react-test-renderer
    expect(result).toContain('import \'jest-styled-components\';'); // should import react-test-renderer
    expect(result).toContain('import TestName from \'./TestName\';'); // should import the module

    expect(result).not.toContain('={');
    expect(result).not.toContain('Lorem Ipsum Children');
    expect(result).not.toContain('</TestName>');
    expect(result).toContain('/>');
  });
});


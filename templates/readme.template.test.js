const readmeTemplate = require('./readme.template');

describe('readMe Template', () => {
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
    const result = readmeTemplate(answers);
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
    const result = readmeTemplate(answers);
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
    const result = readmeTemplate(answers);
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
    const result = readmeTemplate(answers);
    expect(result).not.toContain('={');
    expect(result).not.toContain('Lorem Ipsum Children');
    expect(result).not.toContain('</TestName>');
    expect(result).toContain('/>');
  });
});


const templates = require('./templates');

describe('defaultTemplate File', () => {
  test('structure ', () => {
    templates.forEach((template) => {
      expect(typeof template).toBe('object');
    });
  });

  test('fileNames ', () => {
    const answers = {
      type: 'atom',
      name: 'Test',
      notation: 'stateless',
    };
    templates.forEach((template) => {
      const fileName = template.fileName(answers)
      expect(typeof fileName).toBe('string');
      expect(fileName).toContain('atoms/Test');
    });
  });

  test('fileContent ', () => {
    const answers = {
      type: 'atom',
      name: 'Test',
      notation: 'stateless',
    };
    templates.forEach((template) => {
      const fileContent = template.fileContent(answers);
      expect(typeof fileContent).toBe('string');
      expect(fileContent).toContain('Test');
    });
  });

  test('component Notation stateless ', () => {
    const answers = {
      type: 'atom',
      name: 'Test',
      notation: 'stateless',
    };
    const fileContent = templates[0].fileContent(answers);
    expect(fileContent).not.toContain('{ Component }');
    expect(fileContent).not.toContain('styled-components');
  });

  test('component Notation styled ', () => {
    const answers = {
      type: 'atom',
      name: 'Test',
      notation: 'styled',
    };
    const fileContent = templates[0].fileContent(answers);
    expect(fileContent).not.toContain('{ Component }');
    expect(fileContent).toContain('styled-components');
  });

  test('component Notation class ', () => {
    const answers = {
      type: 'atom',
      name: 'Test',
      notation: 'class',
    };
    const fileContent = templates[0].fileContent(answers);
    expect(fileContent).toContain('{ Component }');
    expect(fileContent).not.toContain('styled-components');
  });
});

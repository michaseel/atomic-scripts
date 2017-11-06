const {
  validateComponentName,
  filterComponentName,
  checkSuppliedTemplates,
  getComponentTypes,
} = require('./atomic');

test('getComponentTypes fallback', () => {
  const packageJson = {};
  expect(
    getComponentTypes(packageJson)
  ).toEqual([
    'atom',
    'molecule',
    'organism',
    'template',
  ]);
});

test('getComponentTypes fallback no config', () => {
  const packageJson = {
    'atomic-scripts': {

    }
  };
  expect(
    getComponentTypes(packageJson)
  ).toEqual([
    'atom',
    'molecule',
    'organism',
    'template',
  ]);
});

test('getComponentTypes override default', () => {
  const packageJson = {
    'atomic-scripts': {
      componentTypes: [
        'quarks',
        'bosons',
        'leptons',
      ]
    }
  };
  expect(
    getComponentTypes(packageJson)
  ).toEqual([
    'quarks',
    'bosons',
    'leptons',
  ]);
});

test('checkSuppliedTemplates wrong format', () => {
  const templates = {};
  expect(
    checkSuppliedTemplates(templates)
  ).toBe(false);
});

test('checkSuppliedTemplates missing', () => {
  expect(
    checkSuppliedTemplates()
  ).toBe(false);
});

test('checkSuppliedTemplates empty', () => {
  const templates = [];
  expect(
    checkSuppliedTemplates(templates)
  ).toBe(false);
});

test('checkSuppliedTemplates correct', () => {
  const templates = [
    {
      fileName: 'testFileName',
      fileContent: 'testFileContent',
    }
  ];
  expect(
    checkSuppliedTemplates(templates)
  ).toBe(true);
});

test('validateComponentName existing', () => {
  const mockedFsExistsSync = (fileName) => fileName.indexOf('/atoms/Existing') > -1;
  const input = 'Existing';
  const answers = {
    type: 'atom',
  };
  expect(
    validateComponentName(mockedFsExistsSync)(input, answers)
  ).not.toBe(true);
});

test('validateComponentName not existing', () => {
  const mockedFsExistsSync = (fileName) => fileName.indexOf('/atoms/Existing') > -1;
  const input = 'New';
  const answers = {
    type: 'atom',
  };
  expect(
    validateComponentName(mockedFsExistsSync)(input, answers)
  ).toBe(true);
});

test('filterComponentName lowercase Name', () => {
  expect(
    filterComponentName('test')
  ).toBe('Test');
});

test('filterComponentName lowercase Name', () => {
  expect(
    filterComponentName('test')
  ).toBe('Test');
});

test('filterComponentName blank Name', () => {
  expect(
    filterComponentName('test name')
  ).toBe('TestName');
});

test('filterComponentName kebap-Case Name', () => {
  expect(
    filterComponentName('test-name')
  ).toBe('TestName');
});

test('filterComponentName trimmed Name', () => {
  expect(
    filterComponentName('  test  ')
  ).toBe('Test');
});

test('filterComponentName lodash Name', () => {
  expect(
    filterComponentName('test_name')
  ).toBe('TestName');
});

test('filterComponentName lodash blank Name', () => {
  expect(
    filterComponentName('test _ name')
  ).toBe('TestName');
});

test('filterComponentName Name', () => {
  expect(
    filterComponentName('TestName')
  ).toBe('TestName');
});

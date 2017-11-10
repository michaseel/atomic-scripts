const getDefaultValue = require('./getDefaultValue');

describe('getDefaultValue', () => {
  test('boolean', () => {
    expect(getDefaultValue('bool')).toEqual('false');
  });
  test('number', () => {
    expect(getDefaultValue('number')).toEqual('0');
  });
  test('array', () => {
    expect(getDefaultValue('array')).toEqual('[]');
  });
  test('object', () => {
    expect(getDefaultValue('object')).toEqual('{}');
  });
  test('function', () => {
    expect(getDefaultValue('func')).toEqual('() => true');
  });
  test('string', () => {
    expect(getDefaultValue('string')).toEqual('\'\'');
  });
  test('default', () => {
    expect(getDefaultValue('wrongInput')).toEqual('\'\'');
  });
});

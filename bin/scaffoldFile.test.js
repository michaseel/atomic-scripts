jest.mock('fs');
const {
  scaffoldFile,
  writeFile,
} = require('./scaffoldFile');
const chalk = require('chalk');

describe('scaffoldFile', () => {
  test('broken template ', () => {
    jest.spyOn(global.console, 'warn');

    const result = scaffoldFile({}, {}, '.');

    expect(console.warn).toBeCalledWith(chalk.red('received broken fileName template.'));
    expect(result).toBe(false);

    console.warn.mockReset();
  });

  test('broken template2 ', () => {
    jest.spyOn(global.console, 'warn');

    const result = scaffoldFile({
      fileName: 'String',
      fileContent: 42
    }, {}, 'src/');

    expect(console.warn).toBeCalledWith(chalk.red('received broken fileContent template.'));
    expect(result).toBe(false);
    console.warn.mockReset();
  });

  test('good string template ', () => {
    jest.spyOn(global.console, 'warn');

    const result = scaffoldFile({
      fileName: 'String',
      fileContent: 'StringContent'
    }, {}, 'src/');

    expect(console.warn).not.toBeCalled();
    expect(result).toBe(true);

    console.warn.mockReset();
  });
});

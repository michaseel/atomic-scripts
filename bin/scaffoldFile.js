const fs = require('fs');
const path = require('path');
const getDirName = require('path').dirname;
const mkdirp = require('mkdirp');
const appRoot = require('app-root-path');
const _ = require('lodash');
const chalk = require('chalk');

const log = console.log;

const writeFile = (path, contents, cb) => {
  mkdirp(getDirName(path), function (err) {
    if (err) return cb(err);
    fs.writeFile(path, contents, cb);
  });
};

const scaffoldFile = (template, answers, componentsDir) => {
  if (!(_.isFunction(template.fileName) || _.isString(template.fileName))) {
    log(chalk.red('received broken fileName template.'));
    return undefined;
  }

  if (!(_.isFunction(template.fileContent) || _.isString(template.fileContent))) {
    log(chalk.red('received broken fileContent template.'));
    return undefined;
  }

  const rawFileName = _.isFunction(template.fileName) ? template.fileName(answers) : template.fileName;
  const fileName = path.join(appRoot.resolve(componentsDir), rawFileName);
  const fileContent = _.isFunction(template.fileContent) ? template.fileContent(answers) : template.fileContent;

  writeFile(fileName, fileContent, function(err) {
    if(err) {
      return log(chalk.red(`The File ${fileName} could not be saved!`));
    }

    log(chalk.green(`The File ${fileName} was saved!`));
  });
};

module.exports = {
  scaffoldFile,
  writeFile,
};

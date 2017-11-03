#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const getDirName = require('path').dirname;

const inquirer = require('inquirer');
const _ = require('lodash');
const chalk = require('chalk');

const templates = require('../templates/templates');

const prompt = inquirer.createPromptModule();
const log = console.log;

if (!_.isArray(templates)) {
  log(chalk.red('the supplied templates file does not export an array!'));
  process.exit(1);
}
if (templates.length === 0) {
  log(chalk.red('the supplied templates array is empty!'));
  process.exit(1);
}

const componentTypes = [
  'atom',
  'molecule',
  'organism',
  'template',
];

const questions = [
  {
    type: 'list',
    name: 'type',
    message: 'choose a component type',
    default: 'atom',
    choices: componentTypes,
  },
  {
    type: 'input',
    name: 'name',
    message: 'name your component',
    // validate: (answer) => answer.indexOf(' ') === -1,
    filter: (answer) => _.chain(answer).camelCase().upperFirst().value(),
  }
];

const writeFile = (path, contents, cb) => {
  mkdirp(getDirName(path), function (err) {
    if (err) return cb(err);

    fs.writeFile(path, contents, cb);
  });
};

const renderFile = (template, answers) => {
  if (!(_.isFunction(template.fileName) || _.isString(template.fileName))) {
    log(chalk.red('received broken fileName template.'));
    return undefined;
  }

  if (!(_.isFunction(template.fileContent) || _.isString(template.fileContent))) {
    log(chalk.red('received broken fileContent template.'));
    return undefined;
  }

  const rawFileName = _.isFunction(template.fileName) ? template.fileName(answers) : template.fileName;
  const fileName = path.join(__dirname, rawFileName);
  const fileContent = _.isFunction(template.fileContent) ? template.fileContent(answers) : template.fileContent;

  writeFile(fileName, fileContent, function(err) {
    if(err) {
      return log(chalk.red(`The File ${fileName} could not be saved!`));
    }

    log(chalk.green(`The File ${fileName} was saved!`));
  });
};

prompt(questions)
  .then(
    (answers) => {
      templates.forEach((template) => renderFile(template, answers))
    }
  );



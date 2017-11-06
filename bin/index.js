#!/usr/bin/env node
'use strict';

const appRoot = require('app-root-path');
const packageJson = require(appRoot.resolve('package.json'));

const inquirer = require('inquirer');
const _ = require('lodash');
const chalk = require('chalk');

const templatesFile = _.get(packageJson, 'atomic-scripts.templates');
const defaultTemplates = require('../templates/templates');
const templates = templatesFile ? appRoot.resolve(templatesFile) : defaultTemplates;

const scaffoldFile = require('./scaffoldFile');

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

const componentTypes = _.get(packageJson, 'atomic-scripts.componentTypes', [
  'atom',
  'molecule',
  'organism',
  'template',
]);

const componentsDir = _.get(packageJson, 'atomic-scripts.componentsDir', 'src/components');



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

prompt(questions)
  .then(
    (answers) => {
      templates.forEach((template) => scaffoldFile(template, answers, componentsDir))
    }
  );



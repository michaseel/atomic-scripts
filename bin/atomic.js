const appRoot = require('app-root-path');
const packageJson = require(appRoot.resolve('package.json'));
const fs = require('fs');
const inquirer = require('inquirer');
const _ = require('lodash');
const chalk = require('chalk');

const templatesFile = _.get(packageJson, 'atomic-scripts.templates');
const defaultTemplates = require('../templates/templates');
const templates = templatesFile ? appRoot.resolve(templatesFile) : defaultTemplates;

const scaffoldFile = require('./scaffoldFile');

const prompt = inquirer.createPromptModule();
const log = console.log;


const checkSuppliedTemplates = (_templates) => {
  if (!_.isArray(_templates)) {
    log(chalk.red('the supplied templates file does not export an array!'));
    process.exit(1);
  }
  if (_templates.length === 0) {
    log(chalk.red('the supplied templates array is empty!'));
    process.exit(1);
  }
};



const componentTypes = _.get(packageJson, 'atomic-scripts.componentTypes', [
  'atom',
  'molecule',
  'organism',
  'template',
]);

const componentsDir = _.get(packageJson, 'atomic-scripts.componentsDir', 'src/components');

const validateComponentName = (input, answers) => {
  const componentDir = `${appRoot}/${componentsDir}/${answers.type}s/${input}`;
  if (fs.existsSync(componentDir)) {
    return 'Error: this component already exists: '+ componentDir;
  }
  return true;
};

const filterComponentName = (answer) => _.chain(answer).camelCase().upperFirst().value();

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
    validate: validateComponentName,
    filter: filterComponentName,
  },
  {
    type: 'list',
    name: 'notation',
    message: 'choose a component notation',
    default: 'stateless',
    choices: [
      {
        value: 'stateless',
        name: 'Stateless functional Component'
      },
      {
        value: 'class',
        name: 'Statefull Class Component'
      },
      {
        value: 'styled',
        name: 'Styled-Component'
      },
    ],
  },
];

module.exports = {
  validateComponentName,
  filterComponentName,
  checkSuppliedTemplates,
};

module.exports = () => {
  checkSuppliedTemplates(templates);

  prompt(questions)
    .then(
      (answers) => {
        templates.forEach((template) => scaffoldFile(template, answers, componentsDir))
      }
    );
};

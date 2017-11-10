const appRoot = require('app-root-path');
const packageJson = require(appRoot.resolve('package.json'));
const fs = require('fs');
const inquirer = require('inquirer');
const _ = require('lodash');
const chalk = require('chalk');

const defaultTemplates = require('../templates/templates');

const templatesFile = _.get(packageJson, 'atomic-scripts.templates');

const templates = templatesFile ? appRoot.resolve(templatesFile) : defaultTemplates;

const { scaffoldFile } = require('./scaffoldFile');

const log = console.log;

const checkSuppliedTemplates = (_templates) => {
  if (!_.isArray(_templates)) {
    log(chalk.red('the supplied templates file does not export an array!'));
    return false;
  }
  if (_templates.length === 0) {
    log(chalk.red('the supplied templates array is empty!'));
    return false;
  }
  return true;
};


const getComponentTypes = (packageJson) => _.get(packageJson, 'atomic-scripts.componentTypes', [
  'atom',
  'molecule',
  'organism',
  'template',
]);

const componentTypes = getComponentTypes(packageJson);

const componentsDir = _.get(packageJson, 'atomic-scripts.componentsDir', 'src/components');

const validateComponentName = (fsExistsSync) => (input, answers) => {
  const componentDir = `${appRoot}/${componentsDir}/${answers.type}s/${input}`;
  console.log(componentDir);
  if (fsExistsSync(componentDir)) {
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
    validate: validateComponentName(fs.existsSync),
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
  {
    type: 'confirm',
    name: 'children',
    message: 'should this component have children?',
    when: (answers) => answers.notation !== 'styled',
    default: true,
  },
  {
    type: 'confirm',
    name: 'addProps',
    message: 'do you want to add props? (just hit enter for YES)',
    default: true,
  }
];

const propQuestions = [
  {
    type: 'input',
    name: 'propName',
    message: 'What is the name of your Prop?'
  },
  {
    type: 'confirm',
    name: 'required',
    message: 'is this prop required?',
    default: true
  },
  {
    type: 'list',
    name: 'propType',
    message: 'choose a propType',
    default: 'string',
    choices: [
      {
        value: 'string',
        name: 'String',
      },
      {
        value: 'bool',
        name: 'Boolean',
      },
      {
        value: 'number',
        name: 'Number',
      },
      {
        value: 'array',
        name: 'Array',
      },
      {
        value: 'object',
        name: 'Object',
      },
      {
        value: 'func',
        name: 'Function',
      },
    ],
  },
/*  {
    type: 'input',
    name: 'defaultValue',
    message: 'This prop is not required. Please specify a default Value',
    // when: (answers) => answers.required === false,
    // validate: (input, { propType }) => typeof input === propType ? true : `The default value must be a ${ propType }`,
    filter: (input, { propType }) => {
      switch (propType) {
        case 'bool':
          return (input === 'true');
        case 'number':
          return _.toNumber(input);
        case 'array':
          return [];
        case 'object':
          return {};
        default:
          return input;
      }
    },
  },*/
  {
    type: 'confirm',
    name: 'addAnotherProp',
    message: 'Do you want to add another Prop? (just hit enter for YES)?',
    default: true
  }
];

const props = [];

const addProp = (answers) => {
  const prompt = inquirer.createPromptModule();
  return prompt(propQuestions).then(
    (propAnswers) => {
      props.push({
        name: propAnswers.propName,
        type: propAnswers.propType,
        required: propAnswers.required,
      });
      if (propAnswers.addAnotherProp) {
        return addProp(answers);
      } else {
        return answers;
      }
  });
};

const atomic = () => {
  if (!checkSuppliedTemplates(templates)) process.exit(1);

  const prompt = inquirer.createPromptModule();
  prompt(questions)
    .then(
      answers => {
        if (answers.addProps) {
          return addProp(answers);
        }
        return answers;
      }
    )
    .then(
      (answers) => {
        if (answers.children) {
          props.push({
            name: 'children',
            type: 'node',
            required: true,
          });
        }

        answers.props = _.sortBy(props, 'name');
        console.log(answers.props);
        templates.forEach((template) => scaffoldFile(template, answers, componentsDir))
      }
    );
};

module.exports = {
  atomic,
  getComponentTypes,
  validateComponentName,
  filterComponentName,
  checkSuppliedTemplates,
};

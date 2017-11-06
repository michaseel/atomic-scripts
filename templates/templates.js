const componentTemplate = require('./component.template');
const testTemplate = require('./test.template');
const readmeTemplate = require('./readme.template');

const baseFileName = (fileExtension) => (answers) => `${answers.type}s/${answers.name}/${answers.name}${fileExtension}`

module.exports = [
  {
    fileName: baseFileName('.js'),
    fileContent: componentTemplate,
  },
  {
    fileName: baseFileName('.test.js'),
    fileContent: testTemplate,
  },
  {
    fileName: baseFileName('.md'),
    fileContent: readmeTemplate,
  },
];

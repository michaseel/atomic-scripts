const componentTemplate = require('./componentTemplate');
const testTemplate = require('./testTemplate');
const readmeTemplate = require('./readmeTemplate');

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

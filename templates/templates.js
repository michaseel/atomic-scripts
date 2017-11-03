module.exports = [
  {
    fileName: (answers) => `${answers.type}s/${answers.name}/${answers.name}.js`,
    fileContent: (answers) => `console.log('this is the component ${answers.name}!!!');`,
  },
  {
    fileName: (answers) => `${answers.type}s/${answers.name}/${answers.name}.test.js`,
    fileContent: (answers) => `this is my unit test file for the ${answers.type} named ${answers.name}`,
  },
  {
    fileName: (answers) => `${answers.type}s/${answers.name}/${answers.name}.md`,
    fileContent: (answers) => `this is my documentation for the ${answers.type} named ${answers.name}`,
  },
];

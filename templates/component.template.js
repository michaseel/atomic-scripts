const classComponent = require('./classComponent.template');
const styledComponent = require('./styledComponent.template');
const statelessComponent = require('./statelessComponent.template');

module.exports = answers => {
  switch (answers.notation) {
    case 'class':
      return classComponent(answers);

    case 'styled':
      return styledComponent(answers);

    default:
      return statelessComponent(answers);
  }
};

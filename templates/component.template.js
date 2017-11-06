const classComponent = require('./classComponent.template');
const styledComponent = require('./styledComponent.template');
const statelessComponent = require('./statelessComponent.template');

module.exports = answers => {
  switch (answers.notation) {
    case 'class':
      return classComponent(answers);
    break;

    case 'styled':
      return styledComponent(answers);
    break;

    default:
      return statelessComponent(answers);
    break;

  }
};

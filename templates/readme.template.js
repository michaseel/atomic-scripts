const getDefaultValue = require('./helpers/getDefaultValue');

const renderRequiredProps = (props = []) => props.map(
  prop => prop.required && prop.name !== 'children'
    ? `      ${prop.name}={${getDefaultValue(prop.type)}}\n`
    : ''
  ).join('');

const renderClosingTag = ({ children, name }) => children === true ?
`>
       Lorem Ipsum Children
    </${name}>`
: '/>';

module.exports = answers =>
`## Demo of the ${answers.type} ${answers.name}

    <${answers.name} 
${renderRequiredProps(answers.props)}
    ${renderClosingTag(answers)}
    
Please add more examples    
`;

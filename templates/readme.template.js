const renderComponentDemo = require('./helpers/renderComponentDemo');

module.exports = ({name, type, props = [], children}) =>
`## Demo of the ${type} ${name}

    ${renderComponentDemo(name, props, children)}
    
Please add more examples    
`;

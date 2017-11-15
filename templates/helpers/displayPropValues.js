const printPropValue = (name, type) => {
  switch (type) {
    case 'node':
      return `{${name}}`;
    case 'func':
      return 'Function';
    default:
      return `{JSON.stringify(${name})}`;
  }
};

const displayPropValues = (props, children) => {
  const propList = props.map(
    ({name, type}) => name === 'children'
      ? ''
      : `          ${name}: ${printPropValue(name, type)}\n`
  ).join('');
  if (propList === '') return `${children ? '{children}' : ''}`;

  return `<pre>
        This are your props:
      
${propList}    
      </pre>
    ${children ? '{children}' : ''}`;
};


module.exports = displayPropValues;

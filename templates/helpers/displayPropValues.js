module.exports = displayPropValues = (props, children) => {
  const propList = props.map(
    prop => prop.name === 'children'
      ? ''
      : `          ${prop.name}: {JSON.stringify(${prop.name})}\n`
  ).join('');
  if (propList === '') return `${children ? '{children}' : ''}`;

  return `<pre>
      These are your props:
      
${propList}    
      </pre>
    ${children ? '{children}' : ''}`;
};

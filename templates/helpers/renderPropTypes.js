const getPropType = type => {
  switch (type) {
    case 'array':
      return 'Array<string>';
    case 'object':
      return '{\n\n  }';
    case 'node':
      return 'Node';
    case 'func':
      return '(parameterA: number) => boolean';
    default:
      return type;
  }
};

const renderPropTypes = (props) => {
  const typeDefs = props.map(
    prop =>
`  /** please describe the prop ${prop.name} */
  ${prop.name}${prop.required ? '' : '?'}: ${getPropType(prop.type)},
`)
    .join('\n');
  return `type Props = {
${typeDefs}  
}`;
};

module.exports = renderPropTypes;

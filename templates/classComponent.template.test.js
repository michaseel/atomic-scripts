const classComponent = require('./classComponent.template');

describe('classComponent Template', () => {
  test('with children and props ', () => {
    const answers = {
      name: 'TestName',
      type: 'organism',
      notation: 'stateless',
      children: true,
      props: [
        {
          name: 'propName1',
          type: 'bool',
          required: false,
        },
        {
          name: 'propName2',
          type: 'number',
          required: true,
        },
        {
          name: 'propName3',
          type: 'string',
          required: true,
        },
        {
          name: 'propName4',
          type: 'object',
          required: false,
        },
        {
          name: 'propName5',
          type: 'func',
          required: false,
        },
        {
          name: 'propName6',
          type: 'array',
          required: false,
        },
        {
          name: 'propName7',
          type: 'node',
          required: false,
        },
        {
          name: 'children',
          type: 'node',
          required: true,
        },
      ],
    };
    const result = classComponent(answers);
    expect(result).toContain('import React, { Component } from \'react\';');  // should import react
    expect(result).toContain('import type { Node } from \'react\';'); // should import Node type
    expect(result).toContain('class TestName extends Component<Props, State> {'); // class declaration
    expect(result).toContain('state = {\n\n  };'); // empty state
    expect(result).toContain('type Props = {'); // define Prop Type
    expect(result).toContain('type State = {'); // define State Type
    expect(result).toContain('TestName.defaultProps = {'); // define defaultProps


    /* check props: destructuring, display and propTypes */
    expect(result).toContain('propName1: false');
    expect(result).toContain('propName1: {JSON.stringify(propName1)}');
    expect(result).toContain('propName1?: bool,');

    expect(result).toContain('propName2: {JSON.stringify(propName2)}');
    expect(result).toContain('propName2: number,');

    expect(result).toContain('propName3: {JSON.stringify(propName3)}');
    expect(result).toContain('propName3: string');

    expect(result).toContain('propName4: {JSON.stringify(propName4)}');
    expect(result).toContain('propName4?: {');

    expect(result).toContain('propName5: Function');
    expect(result).toContain('propName5?: (');

    expect(result).toContain('propName6: {JSON.stringify(propName6)}');
    expect(result).toContain('propName6?: Array<');

    expect(result).toContain('propName7: {propName7}');
    expect(result).toContain('propName7?: Node,');

    expect(result).toContain('{children}');
    expect(result).toContain('children: Node,');
  });

  test('without children but with props ', () => {
    const answers = {
      name: 'TestName',
      type: 'organism',
      notation: 'stateless',
      children: false,
      props: [
        {
          name: 'propName1',
          type: 'bool',
          required: false,
        },
        {
          name: 'propName2',
          type: 'number',
          required: true,
        },
        {
          name: 'propName3',
          type: 'string',
          required: true,
        },
      ],
    };
    const result = classComponent(answers);
    expect(result).toContain('import React, { Component } from \'react\';');  // should import react
    expect(result).toContain('import type { Node } from \'react\';'); // should import Node type
    expect(result).toContain('class TestName extends Component<Props, State> {'); // class declaration
    expect(result).toContain('state = {\n\n  };'); // empty state
    expect(result).toContain('type Props = {'); // define Prop Type
    expect(result).toContain('type State = {'); // define State Type
    expect(result).toContain('TestName.defaultProps = {'); // define defaultProps


    /* check props: destructuring, display and propTypes */
    expect(result).toContain('propName1: false');
    expect(result).toContain('propName1: {JSON.stringify(propName1)}');
    expect(result).toContain('propName1?: bool,');

    expect(result).toContain('propName2: {JSON.stringify(propName2)}');
    expect(result).toContain('propName2: number,');

    expect(result).toContain('propName3: {JSON.stringify(propName3)}');
    expect(result).toContain('propName3: string,');

    expect(result).not.toContain('{children}');
    expect(result).not.toContain('children: Node,');
  });

  test('with children without other props ', () => {
    const answers = {
      name: 'TestName',
      type: 'organism',
      notation: 'stateless',
      children: true,
      props: [
        {
          name: 'children',
          type: 'node',
          required: true,
        },
      ],
    };
    const result = classComponent(answers);
    expect(result).toContain('import React, { Component } from \'react\';');  // should import react
    expect(result).toContain('import type { Node } from \'react\';'); // should import Node type
    expect(result).toContain('class TestName extends Component<Props, State> {'); // class declaration
    expect(result).toContain('state = {\n\n  };'); // empty state
    expect(result).toContain('type Props = {'); // define Prop Type
    expect(result).toContain('type State = {'); // define State Type
    expect(result).toContain('TestName.defaultProps = {'); // define defaultProps


    /* check props: destructuring, display and propTypes */
    expect(result).not.toContain('propName');

    expect(result).toContain('{children}');
    expect(result).toContain('children: Node,');
  });

  test('without children and props ', () => {
    const answers = {
      name: 'TestName',
      type: 'organism',
      notation: 'stateless',
      children: false,
      props: [],
    };
    const result = classComponent(answers);
    expect(result).toContain('import React, { Component } from \'react\';');  // should import react
    expect(result).toContain('import type { Node } from \'react\';'); // should import Node type
    expect(result).toContain('class TestName extends Component<Props, State> {'); // class declaration
    expect(result).toContain('state = {\n\n  };'); // empty state
    expect(result).toContain('type Props = {'); // define Prop Type
    expect(result).toContain('type State = {'); // define State Type
    expect(result).toContain('TestName.defaultProps = {'); // define defaultProps


    /* check props: destructuring, display and propTypes */
    expect(result).not.toContain('{children}');
    expect(result).not.toContain('<pre>');
  });
});


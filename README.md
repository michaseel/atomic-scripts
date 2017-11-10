# atomic-scripts
a small cli helper-tool for fast component scaffolding.

[![Build Status](https://travis-ci.org/michaseel/atomic-scripts.svg?branch=master)](https://travis-ci.org/michaseel/atomic-scripts)

## Installation
1. `npm install --save-dev atomic-scripts` or `yarn add --dev atomic-scripts`

2. Update your `package.json` like this:
   ```diff json
   {
     "scripts": {
   +   "atomic": "atomic-scripts"
     },
   + "atomic-scripts": {
   +   "componentsDir": "src/components/"
   + }
   }
   ```
   
## Usage:
In your terminal start the cli-script via: `npm run atomic` or `yarn atomic`

The answer all the questions and the component will be scaffolded into the correct directory.
![atomic-scripts](https://media.giphy.com/media/l0CPbmWBJSbeirLNu/giphy.gif)
   
## Configuration

For custom componentTypes to choose in your cli: add them in your `package.json` config:
   ```diff json
     "atomic-scripts": {
       "componentsDir": "src/components/",
   +   "componentTypes": [
   +      "atoms",
   +      "molecules",
   +      "organisms",
   +      "templates"          
   +    ]
     }
   }
   ```
   
If you want to specify your own templates: configure the path of your own templates.js in the `package.json` config:

   ```diff json
     "atomic-scripts": {
       "componentsDir": "src/components/",
   +   "templates": "thePathToYour/templates.js"
     }
   }
   ```   
   
The specified templates.js MUST export an `array` of `objects` which contains two keys:
`fileName` and `fileContent`.

These two can be strings or functions. 
If a function is supplied it will called with one parameter: 
an object with all user answers and must return a string.

Here is an example how this answers object could look like:
```
{
  type: 'atom',
  name: 'TestComponent',
}
```

For an quickstart look at the original [templates.js](/templates/templates.js) file.

## Created by

- [Michael Seel](https://github.com/michaseel)


## License

MIT © [Michael Seel](https://github.com/michaseel)

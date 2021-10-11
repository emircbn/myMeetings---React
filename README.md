# Meeting App (Dockerized React Webpack App)
- `start` development server with command `docker-compose up`
  ###### app will start `localhost:8080`
- `build` your app using `npm run build` command, your build appears in `dist` folder
  ###### test will start before build

# Some useful commands

- `styling:fix` fixes code styles automatically end show errors that not convenient for eslint rules
- `styling:check` checks code styles automatically end show errors that not convenient for eslint rules

###### Last command are useful for ci/cd tools.

# Test

it uses jest for testing. run this command for run tests: `npm run test` 

# Build with

 - Babel 7 [doc](https://babeljs.io/docs/en/)
 - Webpack 5 [doc](https://webpack.js.org/concepts/)

# Enabled Babel Plugins

- @babel/plugin-proposal-class-properties [doc](https://babeljs.io/docs/en/babel-plugin-proposal-class-properties)
- @babel/plugin-proposal-export-default-from [doc](https://babeljs.io/docs/en/babel-plugin-proposal-export-default-from)
- @babel/plugin-proposal-export-namespace-from [doc](https://babeljs.io/docs/en/babel-plugin-proposal-export-namespace-from)
- @babel/plugin-proposal-logical-assignment-operators [doc](https://babeljs.io/docs/en/babel-plugin-proposal-logical-assignment-operators)
- @babel/plugin-proposal-nullish-coalescing-operator [doc](https://babeljs.io/docs/en/babel-plugin-proposal-nullish-coalescing-operator)
- @babel/plugin-proposal-optional-chaining [doc](https://babeljs.io/docs/en/babel-plugin-proposal-optional-chaining)
- @babel/plugin-proposal-throw-expressions [doc](https://babeljs.io/docs/en/babel-plugin-proposal-throw-expressions)
- @babel/plugin-proposal-function-bind [doc](https://babeljs.io/docs/en/babel-plugin-proposal-function-bind)
- @babel/plugin-transform-regenerator [doc](https://babeljs.io/docs/en/babel-plugin-transform-regenerator)
- @babel/plugin-proposal-json-strings [doc](https://babeljs.io/docs/en/babel-plugin-proposal-json-strings)
- @babel/plugin-proposal-function-sent [doc](https://babeljs.io/docs/en/babel-plugin-proposal-function-sent)
- @babel/plugin-syntax-dynamic-import [doc](https://babeljs.io/docs/en/babel-plugin-syntax-dynamic-import)
- @babel/plugin-syntax-import-meta [doc](https://babeljs.io/docs/en/babel-plugin-syntax-import-meta)

# React Redux Sagas Architecture

- https://github.com/facebook/create-react-app

- https://redux.js.org/basics

- https://github.com/reactjs/react-router-redux

- https://github.com/redux-saga/redux-saga

```
npx create-react-app redux-sagas
```

![session](src/assets/images/session.gif)

## Initial Boilerplate

```
yarn add axios history notie prop-types redux@next react-redux react-router-dom react-router-redux@next redux-saga
```

## Tooling

```
yarn add husky lint-staged prettier redux-logger -D
```

## Material-UI

React components that implement Google's Material Design.

- https://material-ui-next.com/

```
yarn add material-ui@next
```

## Unit Tests

- https://github.com/josoroma/react-redux-sagas#running-tests

Create React App uses Jest as its test runner.

Jest is a Node-based runner. This means that the tests always run in a Node environment and not in a real browser.

Jest is intended to be used for **Unit Tests** of our logic and our components rather than the DOM quirks.

### CLI

Jest will always explicitly mention that it only ran tests related to the files changed since the last commit.

```
npm test
```

All `expect()` matchers supported by **Jest** are extensively documented here:

- https://facebook.github.io/jest/docs/en/expect.html#content

To create “spies” or mock functions we can also use `jest.fn()` and `expect(fn).toBeCalled()`:

- https://facebook.github.io/jest/docs/en/expect.html#tohavebeencalled

### Enzyme

- http://airbnb.io/enzyme

If we’d like to test components in isolation from the child components they render, please use `shallow()` rendering API from Enzyme.

```
yarn add enzyme enzyme-adapter-react-16 react-test-renderer -D
```

Full DOM rendering is ideal for use cases where you have components that may interact with DOM APIs, or may require the full lifecycle in order to fully test the component.

- http://airbnb.io/enzyme/docs/api/mount.html

### jest-enzyme

- https://github.com/FormidableLabs/enzyme-matchers#assertions

Helpful to simplify our tests with readable matchers.

```
yarn add jest-enzyme -D
```

### `redux-saga-test-plan` && `jest-localstorage-mock`

Test Redux Saga with an easy plan. 

- https://github.com/jfairbank/redux-saga-test-plan

Use this module with Jest to run web tests that rely on localstorage and / or sessionStorage where you want a working localStorage API with mocked functions.

- https://github.com/clarkbw/jest-localstorage-mock

```
yarn add enzyme enzyme-adapter-react-16 react-test-renderer jest-enzyme sinon redux-saga-test-plan jest-localstorage-mock -D
```

## Testing React Apps

- https://facebook.github.io/jest/docs/en/tutorial-react.html#content

- https://github.com/jfairbank/redux-saga-test-plan#unit-testing

- http://redux-saga-test-plan.jeremyfairbank.com/unit-testing/

- https://www.npmjs.com/package/jest-localstorage-mock#in-create-react-app

```
yarn add enzyme enzyme-adapter-react-16 react-test-renderer jest-enzyme redux-saga-test-plan jest-localstorage-mock -D
```

## Inspired by

- https://medium.com/@shrsujan2007/implementation-of-redux-saga-in-react-applications-973f5a2a87d2

- https://github.com/shrsujan/react-redux-saga-demo

- https://github.com/dbroadhurst/create-react-app-redux-saga-boilerplate

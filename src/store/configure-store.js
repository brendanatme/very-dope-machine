import { createStore, compose, applyMiddleware } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import updatePadsOnKitSwitch from '../middleware/update-pads-on-kit-switch';
import writeToStorage from '../middleware/write-to-storage';
import { rootReducer } from './reducers';

function configureStoreProd(initialState) {
  const middlewares = [
    // Add other middleware on this line...

    // thunk middleware can also accept an extra argument to be passed to each thunk action
    // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
    thunk,
    updatePadsOnKitSwitch,
    writeToStorage(['modal', 'loops', 'presets']),
  ];

  return createStore(rootReducer, initialState, compose(
    applyMiddleware(...middlewares),
  ));
}

function configureStoreDev(initialState) {
  const middlewares = [
    // Add other middleware on this line...

    // Redux middleware that spits an error on you when you try to mutate your state either inside a dispatch or between dispatches.
    reduxImmutableStateInvariant(),

    // thunk middleware can also accept an extra argument to be passed to each thunk action
    // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
    thunk,
    updatePadsOnKitSwitch,
    writeToStorage(['modal', 'loops', 'presets']),
  ];

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
  const store = createStore(rootReducer, initialState, composeEnhancers(
    applyMiddleware(...middlewares),
    ),
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').rootReducer; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

export const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;

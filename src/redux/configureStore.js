import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import createSagaMiddleware from 'redux-saga';
import { createReducers } from './reducers';
import appSaga from '../containers/app/appSaga';
import meetingSaga from '../containers/Meetings/state/meetingSaga';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}) {
  const enhancers = [applyMiddleware(sagaMiddleware)];

  const composeEnhancers =
    process.env.NODE_ENV !== 'production' && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ shouldHotReload: false })
      : compose;

  const store = createStore(createReducers(), fromJS(initialState), composeEnhancers(...enhancers));

  sagaMiddleware.run(appSaga);
  sagaMiddleware.run(meetingSaga);

  return store;
}

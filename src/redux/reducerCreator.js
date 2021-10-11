import { fromJS } from 'immutable';

const _defaultHandler = (state) => {
  return state;
};

const reducerCreator = (handlers = {}, initialState = fromJS({}), defaultHandler = _defaultHandler) => {
  const functionCheck = (handler) => {
    return typeof handler === 'function';
  };

  return (state = initialState, action = {}) => {
    const arrayHandlers = Array.isArray(handlers[action.type])
      ? handlers[action.type]
      : action.type && typeof handlers[action.type] === 'function'
      ? [handlers[action.type]]
      : null;

    if (arrayHandlers != null && !arrayHandlers.every(functionCheck)) {
      throw new Error('one or more reducer(s) are not a function', arrayHandlers);
    }

    if (arrayHandlers != null) {
      return arrayHandlers.reduce((state, reducer) => {
        return reducer(state, action);
      }, state);
    }

    return defaultHandler(state, action);
  };
};

export { reducerCreator };

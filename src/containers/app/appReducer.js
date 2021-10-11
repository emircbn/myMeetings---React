import { fromJS } from 'immutable';
import { reducerCreator } from '../../redux/reducerCreator';
import { LOGIN_ACTION, LOGIN_COMPLETED_ACTION, LOGOUT_ACTION } from './appActions';

const INITIAL_STATE = fromJS({
  lang: 'en',
  isAuthorized: false,
  token: null,
  user: {
    data: null,
    loading: false,
    error: false
  }
});

const loginHandler = (state) => {
  return state.setIn(['user', 'loading'], true);
};

const loginCompletedHandler = (state, action) => {
  const { token, ...rest } = action.data;
  localStorage.setItem('jwt', token);
  return state.set('isAuthorized', true).set('token', token).setIn(['user', 'data'], rest).setIn(['user', 'loading'], false);
};

const logoutHandler = (state) => {
  localStorage.clear();
  return state.set('isAuthorized', false);
};

const handlers = {
  [LOGIN_ACTION]: loginHandler,
  [LOGIN_COMPLETED_ACTION]: loginCompletedHandler,
  [LOGOUT_ACTION]: logoutHandler
};

export const appReducer = reducerCreator(handlers, INITIAL_STATE);

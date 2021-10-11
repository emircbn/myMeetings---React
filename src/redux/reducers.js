import { combineReducers } from 'redux-immutable';
import { appReducer } from '../containers/app/appReducer';
import { meetingReducer } from '../containers/Meetings/state/meetingReducer';

export const createReducers = () => {
  return combineReducers({
    app: appReducer,
    meetings: meetingReducer
  });
};

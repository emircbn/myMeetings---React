import { createSelector } from 'reselect';

const meetingsSelector = (state) => {
  return state.get('meetings');
};

export const meetingListSelector = createSelector(meetingsSelector, (appState) => {
  return appState.getIn(['list', 'data']).toJS();
});

export const drawerStateSelector = createSelector(meetingsSelector, (appState) => {
  return appState.get('drawer').toJS();
});

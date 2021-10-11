import { createSelector } from 'reselect';

const appSelector = (state) => {
  return state.get('app');
};

export const isAuthorizedSelector = createSelector(appSelector, (appState) => {
  return appState.get('isAuthorized');
});

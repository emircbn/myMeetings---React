export const LOGIN_ACTION = 'app/LOGIN_ACTION';
export const LOGIN_COMPLETED_ACTION = 'app/LOGIN_COMPLETED_ACTION';
export const LOGOUT_ACTION = 'app/LOGOUT_ACTION';

export const loginAction = (userCredentials) => {
  return { type: LOGIN_ACTION, userCredentials };
};

export const loginCompletedAction = (data) => {
  return { type: LOGIN_COMPLETED_ACTION, data };
};

export const logoutAction = () => {
  return { type: LOGOUT_ACTION };
};

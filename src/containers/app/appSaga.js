import { all, call, takeLatest, delay, put } from 'redux-saga/effects';
import { LOGIN_ACTION, loginCompletedAction } from './appActions';
import authService from '../../service/authService';

function* loginApp(service, action) {
  delay(1000);
  const response = yield call(service.login, action.userCredentials);
  yield put(loginCompletedAction(response.data));
}

export default function* appSaga() {
  yield all([takeLatest(LOGIN_ACTION, loginApp, authService)]);
}

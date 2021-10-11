import { all, call, takeLatest, delay, put } from 'redux-saga/effects';
import { CREATE_NEW_MEETING, FETCH_MEETINGS, representCreatedMeetingAction, representMeetingsAction } from './meetingActions';
import meetingService from '../../../service/meetingService';

function* createMeeting(service, action) {
  delay(1000);
  const data = yield call(service.postMeeting, action.data);
  yield put(representCreatedMeetingAction(data));
}

function* getMeetings(service) {
  delay(1000);
  const data = yield call(service.getMeetings, {});
  yield put(representMeetingsAction(data));
}

export default function* meetingSaga() {
  yield all([takeLatest(CREATE_NEW_MEETING, createMeeting, meetingService), takeLatest(FETCH_MEETINGS, getMeetings, meetingService)]);
}

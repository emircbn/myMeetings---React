export const CREATE_NEW_MEETING = 'meeting/CREATE_NEW_MEETING';
export const REPRESENT_CREATED_MEETING = 'meeting/REPRESENT_CREATED_MEETING';
export const FETCH_MEETINGS = 'meeting/FETCH_MEETINGS';
export const REPRESENT_MEETINGS = 'meeting/REPRESENT_MEETINGS';
export const ON_DRAWER_OPEN = 'meeting/ON_DRAWER_OPEN';
export const ON_DRAWER_CLOSE = 'meeting/ON_DRAWER_CLOSE';
export const UPDATE_MEETING = 'meeting/UPDATE_MEETING';
export const DELETE_MEETING = 'meeting/DELETE_MEETING';
export const ON_SEARCH_MEETING = 'meeting/ON_SEARCH_MEETING';

export const createNewMeetingAction = (data) => {
  return {
    type: CREATE_NEW_MEETING,
    data
  };
};

export const representCreatedMeetingAction = (data) => {
  return {
    type: REPRESENT_CREATED_MEETING,
    data
  };
};

export const fetchMeetingsAction = (params = {}) => {
  return {
    type: FETCH_MEETINGS,
    params
  };
};

export const representMeetingsAction = (data) => {
  return {
    type: REPRESENT_MEETINGS,
    data
  };
};

export const onDrawerOpenAction = (id = null, data = null) => {
  return {
    type: ON_DRAWER_OPEN,
    id,
    data
  };
};

export const onDrawerCloseAction = () => {
  return {
    type: ON_DRAWER_CLOSE
  };
};

export const updateMeetingAction = (data) => {
  return {
    type: UPDATE_MEETING,
    data
  };
};

export const deleteMeetingAction = (id) => {
  return {
    type: DELETE_MEETING,
    id
  };
};

export const onSearchAction = (search) => {
  return {
    type: ON_SEARCH_MEETING,
    search
  };
};

import { fromJS } from 'immutable';
import { reducerCreator } from '../../../redux/reducerCreator';
import {
  CREATE_NEW_MEETING,
  DELETE_MEETING,
  FETCH_MEETINGS,
  ON_DRAWER_CLOSE,
  ON_DRAWER_OPEN,
  ON_SEARCH_MEETING,
  REPRESENT_CREATED_MEETING,
  REPRESENT_MEETINGS,
  UPDATE_MEETING
} from './meetingActions';

const INITIAL_STATE = fromJS({
  list: {
    loading: false,
    data: [],
    allData: []
  },
  drawer: {
    visible: false,
    loading: false,
    data: {}
  }
});

const createNewMeetingHandler = (state) => {
  return state.setIn(['list', 'loading'], true);
};

const representCreatedMeetingHandler = (state, action) => {
  const listData = state.getIn(['list', 'data']).splice(0, 0, fromJS(action.data));
  return state
    .set(
      'drawer',
      fromJS({
        visible: false,
        loading: false,
        data: {}
      })
    )
    .setIn(['list', 'data'], listData)
    .setIn(['list', 'allData'], listData)
    .setIn(['list', 'loading'], false);
};

const fetchMeetingsHandler = (state) => {
  return state.setIn(['list', 'loading'], true);
};

const representMeetingsHandler = (state, action) => {
  return state.setIn(['list', 'loading'], false).setIn(['list', 'allData'], fromJS(action.data)).setIn(['list', 'data'], fromJS(action.data));
};

const onDrawerOpenHandler = (state, action) => {
  const { id, data } = action;

  if (id == null) {
    state = state.setIn(['drawer', 'data'], fromJS({}));
  } else if (data == null || data.id !== id) {
    const stateData = state.getIn(['list', 'data']).find((item) => {
      return item.get('id') === id;
    });
    state = state.setIn(['drawer', 'data'], stateData);
  } else {
    state = state.setIn(['drawer', 'data'], fromJS(data));
  }

  return state.setIn(['drawer', 'visible'], true);
};

const onDrawerCloseHandler = (state) => {
  return state.setIn(['drawer', 'visible'], false).setIn(['drawer', 'data'], fromJS({}));
};

const updateMeetingHandler = (state, action) => {
  const update = (data) => {
    return data.map((d) => {
      if (d.get('id') === action.data.id) {
        return fromJS(action.data);
      }
      return d;
    });
  };
  return state.updateIn(['list', 'data'], update).updateIn(['list', 'allData'], update);
};

const deleteMeetingHandler = (state, action) => {
  const stateData = state.getIn(['list', 'data']).filter((item) => {
    return item.get('id') !== action.id;
  });
  return state.setIn(['list', 'data'], stateData);
};

const onSearchHandler = (state, action) => {
  const allData = state.getIn(['list', 'allData']);
  if (action.search == null) {
    return state.setIn(['list', 'data'], allData);
  }

  const update = () => {
    return allData.filter((d) => {
      const isInclude = d.keySeq().find((key) => {
        const value = d.get(key);
        return key !== 'id' && value.toString().toLowerCase().includes(action.search.toLowerCase());
      });

      return Boolean(isInclude);
    });
  };
  return state.updateIn(['list', 'data'], update);
};

const handlers = {
  [CREATE_NEW_MEETING]: createNewMeetingHandler,
  [REPRESENT_CREATED_MEETING]: representCreatedMeetingHandler,
  [FETCH_MEETINGS]: fetchMeetingsHandler,
  [REPRESENT_MEETINGS]: representMeetingsHandler,
  [ON_DRAWER_OPEN]: onDrawerOpenHandler,
  [ON_DRAWER_CLOSE]: onDrawerCloseHandler,
  [UPDATE_MEETING]: updateMeetingHandler,
  [DELETE_MEETING]: deleteMeetingHandler,
  [ON_SEARCH_MEETING]: onSearchHandler
};

export const meetingReducer = reducerCreator(handlers, INITIAL_STATE);

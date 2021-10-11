import React from 'react';
import { connect } from 'react-redux';
import MeetingDrawer from './MeetingDrawer';
import MeetingList from './MeetingList';
import { fetchMeetingsAction } from './state/meetingActions';

const Dashboard = (props) => {
  React.useEffect(() => {
    props.fetchMeetings();
  }, []);

  return (
    <React.Fragment>
      <MeetingDrawer />
      <MeetingList />
    </React.Fragment>
  );
};

const mapDispatchToProps = {
  fetchMeetings: fetchMeetingsAction
};

export default connect(null, mapDispatchToProps)(Dashboard);

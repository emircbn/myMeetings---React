import baseServiceInstance from './baseService';

class MeetingService {
  constructor() {
    this.service = baseServiceInstance;
  }

  getMeeting = (id) => {
    return this.service.newRequest('GET', `/meeting/${id}`).then((res) => {
      return res.data;
    });
  };

  getMeetings = (params) => {
    return this.service.newRequest('GET', '/meeting', { params }).then((res) => {
      return res.data;
    });
  };

  postMeeting = (data) => {
    return this.service.newRequest('POST', '/meeting', { data }).then((res) => {
      return res.data;
    });
  };

  updateMeeting = (data, params) => {
    return this.service.newRequest('POST', '/meeting/', { params }).then((res) => {
      return res.data;
    });
  };

  deleteMeeting = (id) => {
    return this.service.newRequest('DELETE', `/meeting/${id}`).then((res) => {
      return res.data;
    });
  };
}

export default new MeetingService();

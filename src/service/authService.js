import baseServiceInstance from './baseService';

class AuthService {
  constructor() {
    this.service = baseServiceInstance;
  }

  login = (data) => {
    return this.service.newRequest('POST', '/auth', { data });
  };
}

export default new AuthService();

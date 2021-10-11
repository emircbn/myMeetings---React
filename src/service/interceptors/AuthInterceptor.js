import AbstractInterceptor from './AbstractInterceptor';

class AuthInterceptor extends AbstractInterceptor {
  constructor() {
    super();
    this.requestInterceptor = AuthInterceptor.createRequestInterceptor();
  }

  static createRequestInterceptor() {
    return (request) => {
      const token = localStorage.getItem('jwt');

      if (token && token.length > 0) {
        request.headers.Authorization = token;
      }

      return request;
    };
  }

  getRequestInterceptor() {
    return this.requestInterceptor;
  }
}

export default AuthInterceptor;

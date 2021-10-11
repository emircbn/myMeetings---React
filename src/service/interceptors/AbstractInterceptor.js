class AbstractInterceptor {
  _requestInterceptorErrorHandler = (error) => {
    return Promise.reject(error);
  };
  _responseInterceptorErrorHandler = (error) => {
    return Promise.reject(error);
  };
  _responseInterceptor = (response) => {
    return response;
  };
  _requestInterceptor = (request) => {
    return request;
  };

  getRequestInterceptor() {
    return this._requestInterceptor;
  }

  getResponseInterceptor() {
    return this._responseInterceptor;
  }

  getResponseInterceptorErrorHandler() {
    return this._responseInterceptorErrorHandler;
  }

  getRequestInterceptorErrorHandler() {
    return this._requestInterceptorErrorHandler;
  }
}

export default AbstractInterceptor;

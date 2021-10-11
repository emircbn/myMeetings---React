import axios from 'axios';
import AuthInterceptor from './interceptors/AuthInterceptor';
import AbstractInterceptor from './interceptors/AbstractInterceptor';

const createNewClient = (options = {}) => {
  return axios.create({
    timeout: 3 * 60 * 1000, // 180 seconds,
    ...options
  });
};

class BaseService {
  constructor({ baseURL }, interceptors = []) {
    if (BaseService.instance) {
      return BaseService.instance;
    }

    this.client = BaseService.newClient({ baseURL }, interceptors);
    BaseService.instance = this;
  }

  static instance;
  static newClient(clientConfig, interceptors) {
    const client = createNewClient(clientConfig);

    interceptors.forEach((interceptor) => {
      if (interceptor instanceof AbstractInterceptor) {
        client.interceptors.request.use(interceptor.getRequestInterceptor(), interceptor.getRequestInterceptorErrorHandler());
        client.interceptors.response.use(interceptor.getResponseInterceptor(), interceptor.getResponseInterceptorErrorHandler());
      }
    });

    return createNewClient(clientConfig);
  }

  newRequest(method, url, extraParams = {}) {
    const reqConfig = { method, url, ...extraParams };
    return this.client.request(reqConfig);
  }
}

const authInterceptor = new AuthInterceptor();

const baseServiceInstance = new BaseService({ baseURL: 'http://localhost:8080/api' }, [authInterceptor]);

export default baseServiceInstance;

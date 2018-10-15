/**
 * @class NetworkService
 * @description Class NetworkService - gets, put and post infomation from database.
 *
 */
export default class NetworkService {
  constructor() {}

  /**
   * @method httpReq({url, method, data})
   * @description Public method - gets, put and post infomation from database.
   * @param {string} url - URL for request.
   * @param {string} method - method for request.
   * @param {json} data - data for put or post in the database.
   */
  httpReq({ url, method, data }) {
    return new Promise((resolve, reject) => {
      let req = new XMLHttpRequest();
      req.open(method, url, true);

      req.addEventListener('load', function() {
        if (this.status !== 200) {
          let error = new Error(this.statusText);
          error.code = this.status;
          reject(error);
        }
        resolve(this.response);
      });

      req.addEventListener('error', () => {
        reject(new Error('Network Error'));
      });

      if (data && (method === 'POST' || method === 'PUT')) {
        req.send(data);
        return;
      }

      req.send();
    });
  }
}

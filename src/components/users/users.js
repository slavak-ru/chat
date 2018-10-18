/**
 * @class Users
 * @description Class Users - gets, checks and put users information.
 * @param {string} usersUrl - URL for get, or put users information.
 * @param {class} networkService - class for network.
 *
 */
export default class Users {
  constructor ({ usersUrl, networkService }) {
    this.networkService = networkService;
    this.usersUrl = usersUrl;
    this.delay = 0;

    this.getUsers();
  }

  /**
   * @method getUsers
   * @description Public method - for get users information from database.
   * @return {object} return object with users informations.
   */
  getUsers () {
    this._makeRequest({}).then(response => {
      this.usersList = Array.isArray(JSON.parse(response))
        ? JSON.parse(response)
        : Object.values(JSON.parse(response));
      return this.usersList;
    });
  }

  /**
   * @method _makeRequest(options)
   * @description Inner method - for get users information from database.
   * @param {string} url - URL.
   * @param {string} method - request method.
   * @param {object} data - data for publishing in the database.
   * @return {object} return object with users informations.
   */
  _makeRequest ({ url = this.usersUrl, method = 'GET', data }) {
    return this.networkService.httpReq({ url, method, data });
  }

  /**
   * @method checkUser(userData)
   * @description Public method - checks users information.
   * @param {object} userData - user information for check.
   * @return {boolean} return true if user information is correct, or false.
   */
  checkUser (userData) {
    let isUser = Object.keys(this.usersList).some(obj => {
      let check;
      if (userData.form === 'login') {
        check =
          this.usersList[obj]['user-name'] === userData.user &&
          this.usersList[obj].pass === userData.pass;
      }
      if (userData.form === 'sign') {
        check =
          this.usersList[obj]['user-name'] === userData.user ||
          this.usersList[obj]['e-mail'] === userData.mail;
      }
      if (userData.form === 'forgot') {
        check =
          this.usersList[obj]['user-name'] === userData.user &&
          this.usersList[obj]['e-mail'] === userData.mail;
      }
      return check;
    });
    return isUser;
  }

  /**
   * @method setNewUser(options)
   * @description Public method - publish in database information of the new user.
   * @param {object} data - user information for publish.
   * @param {string} usersUrl - URL for publish.
   */
  setNewUser ({ data, usersUrl }) {
    let json = JSON.stringify(data);

    this._makeRequest({
      url: usersUrl,
      method: 'POST',
      data: json
    }).then(() => {
      this.getUsers();
    });
  }

  /**
   * @method changePassword(options)
   * @description Public method - for change user's password.
   * @param {object} data - user information for publish.
   * @param {string} usersUrl - URL for publish.
   */
  changePassword ({ data, usersUrl }) {
    this._makeRequest({ url: this.usersUrl, method: 'GET' })
      .then(response => {
        response = JSON.parse(response);
        Object.keys(response).forEach(key => {
          if (
            data['user-name'] === response[key]['user-name'] &&
            data['e-mail'] === response[key]['e-mail']
          ) {
            response[key].pass = data.pass;
          }
        });
        let json = JSON.stringify(response);
        return json;
      })
      .then(json => {
        this.networkService.httpReq({
          url: usersUrl,
          method: 'PUT',
          data: json
        });
      })
      .then(() => {
        this.getUsers();
      });
  }

  /**
   * @method getUsersList
   * @description Public method - for recive users informtion.
   * @return {object} return users information.
   */
  getUsersList () {
    return this.usersList;
  }
}

import css from './app.css';
import appTemplate from './app.templ.pug';
import urls from './urls.json';
import NetworkService from '../networkService/networkService.js';
import Form from '../form/form.js';
import Tooltip from '../tooltip/tooltip.js';
import Users from '../users/users.js';
import Modal from '../modal/modal.js';
import Chat from '../chat/chat.js';
import Login from '../login/login.js';
import Router from '../router/router.js';

/**
 * @class App
 * @description Class App - manages Form and Chat of the application
 *
 */
export default class App {
  /**
   * @description render DOM and manages Chat and Login pages.
   * @param {object} element - the App DOM-element.
   */
  constructor ({ element }) {
    this.app = element;
    this.appTemplate = appTemplate.bind(this);
    this.networkService = new NetworkService();

    this.pages = {};

    this._methodBinding(this.onLoginSubmit, this._startChat, this._startLogin);
    this._initialStartApp();
    this._initEvents();
  }

  /**
   * @method _methodBinding(args)
   * @description Inner method - for binding of the methods around this.
   * @param {object} ...args - array of the arguments. Each argument is a method.
   * @return {object} method -  method binded around App class.
   */
  _methodBinding (...args) {
    args.forEach(method => {
      let name =
        method.name.charAt(0) === '_' ? method.name.slice(1) : method.name;
      return (this[name] = method.bind(this));
    });
  }
  /**
   * @method _initialStartApp
   * @description Inner method - creates the header of the App, start Router and start Chat
   */
  _initialStartApp () {
    return (async () => {
      await this._getUrls().catch(error => {
        let chat = document.getElementById('chat');
        chat.classList.remove('chat__content_empty');
        chat.classList.add('network_error');
        console.log(error);
      });
      this._renderAppTemplate();
      this.router = new Router();
      this.router.pagesRegistration.call(this, this.app);
      this.router.initEvents.call(this, this.app);
      this.router.setCurentPage.call(this, 'startChat');
      this.router.start.call(this);
      this._startChat();
    })();
  }

  /**
   * @method _getUrls
   * @description Inner method - get the database URLs for messages and users from json file from server.
   */
  _getUrls () {
    return (async () => {
      let response = await this.networkService
        .httpReq({ url: urls, method: 'GET' })
        .catch(error => {
          console.log(error);
        });

      response = JSON.parse(response);
      this.messagesUrl = response.messages;
      this.usersUrl = response.users;
    })();
  }

  /**
   * @method _renderAppTemplate
   * @description Inner method - render App template (header).
   */
  _renderAppTemplate () {
    this.app.innerHTML = this.appTemplate();
  }

  /**
   * @method _initEvents
   * @description Inner method - creating events for click (click on HTMLAnchorElement); and events for the window resizing.
   */
  _initEvents () {
    window.addEventListener('resize', () => this._setVh());
  }

  /**
   * @method _startChat
   * @description Inner method - creating the Chat page and initializing the Chat.
   */
  _startChat () {
    let element = document.querySelector('.app__content');

    if (!element) {
      setTimeout(() => {
        this.startChat();
      }, 100);
    }
    if (!element) return;

    this.currentUser = document.getElementById('username').innerHTML
      ? document.getElementById('username').innerHTML
      : window.sessionStorage.getItem('currentUser');

    document.getElementById('username').innerHTML = this.currentUser;
    this.router.setCurentPage.call(this, 'startChat');

    this.chat = new Chat({
      element: element,
      NetworkService: NetworkService,
      messagesUrl: this.messagesUrl,
      form: Form,
      tooltip: Tooltip,
      currentUser: this.currentUser
    });
    this.chat.initialStartChat();

    this._setVh();
    this._getIP();
  }

  /**
   * @method _setVh
   * @description Inner method - sets the VH size for window resizing and sets app content height.
   */
  _setVh () {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    let header = document.querySelector('.app__header');
    let headerHeight = header.offsetHeight;
    let form = document.querySelector('.chat__form');
    let formHeight = form && form.offsetHeight ? form.offsetHeight : 160;
    let appContent = document.querySelector('.app__content');
    let chatContent = document.getElementById('chat');

    let appContentHeight = window.innerHeight - headerHeight;
    appContent.style.height =
      appContentHeight > formHeight + headerHeight
        ? appContentHeight + 'px'
        : formHeight + headerHeight + 'px';

    if (!this.currentUser) return;
    if (chatContent) {
      chatContent.style.height =
        parseFloat(appContent.style.height) - formHeight + 'px';
    }
  }

  /**
   * @method onLoginSubmit(userName)
   * @description Public method - which sets behavior Login page on submit event.
   * @param {object} userName - the current user name.
   */
  onLoginSubmit (userName) {
    if (!userName) return;

    window.sessionStorage.setItem('currentUser', userName);
    this.messagesLength = 0;
    this.currentUser = document.getElementById('username').innerHTML = userName;
    this.startChat();
  }

  /**
   * @method _startLogin
   * @description Inner method - creating Login and initializing the Logins methods.
   */
  _startLogin () {
    let element = document.querySelector('.app__content');
    if (!element) {
      setTimeout(() => {
        this._startLogin();
      }, 100);
    }

    if (!element) return;

    this.login = new Login({
      element: element,
      usersUrl: this.usersUrl,
      NetworkService: NetworkService,
      form: Form,
      Tooltip: Tooltip,
      Users: Users,
      Modal: Modal
    });
    this.login.onSubmit = this.onLoginSubmit;
    this.login.initialStartLogin();

    this.router.setCurentPage.call(this, 'startLogin');
  }
  /**
   * @method _getIP
   * @description Inner method - for define user IP and sets it in session Storage.
   */
  _getIP () {
    (async () => {
      let data = await this.networkService
        .httpReq({
          url: 'https://jsonip.com',
          method: 'GET'
        })
        .catch(error => {
          this.userIP = 'n/a';
          console.log(error);
        });

      data = JSON.parse(data);
      this.userIP = data.ip;
      window.sessionStorage.setItem('userIP', this.userIP);
    })();
  }
  //   this.networkService
  //     .httpReq({
  //       url: 'https://jsonip.com',
  //       method: 'GET'
  //     })
  //     .then(response => {
  //       response = JSON.parse(response);
  //       this.userIP = response.ip;
  //       window.sessionStorage.setItem('userIP', this.userIP);
  //     })
  //     .catch(error => {
  //       this.userIP = 'n/a';
  //       console.log(error);
  //     });
  // }
}

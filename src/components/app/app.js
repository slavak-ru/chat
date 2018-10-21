import css from './app.css';
import appTemplateRu from './app.templ-ru.pug';
import appTemplateEng from './app.templ-eng.pug';
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
    this.appTemplateRu = appTemplateRu;
    this.appTemplateEng = appTemplateEng;
    this.networkService = new NetworkService();

    this.pages = {};

    this._methodBinding(this.onLoginSubmit, this._startChat, this._startLogin);
    this._initialStartApp();
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

      if (
        !window.sessionStorage.getItem('currentLanguage') ||
        window.sessionStorage.getItem('currentLanguage') === 'ru'
      ) {
        this._renderAppTemplate(this.appTemplateRu);
        window.sessionStorage.setItem('currentLanguage', 'ru');
      } else {
        this._renderAppTemplate(this.appTemplateEng);
        window.sessionStorage.setItem('currentLanguage', 'eng');
      }

      this._initEvents();
      this.router = new Router();
      this.router.pagesRegistration.call(this, this.app);
      this.router.initEvents.call(this, this.app);
      this.router.setCurrentPage.call(this, 'startChat');
      this.router.start.call(this);

      if (window.sessionStorage.getItem('currentPage') === '/chat/login') {
        this._startLogin();
      } else {
        this._startChat();
      }
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
  _renderAppTemplate (template) {
    this.app.innerHTML = template();
  }

  /**
   * @method _initEvents
   * @description Inner method - creating events for click (click on HTMLAnchorElement); and events for the window resizing.
   */
  _initEvents () {
    window.addEventListener('resize', () => this._setVh());
    window.addEventListener('click', e => this._language(e));
  }

  /**
   * @method _language
   * @description Inner method - switches the languages in the application  and reloads the content.
   * @param {object} e - event on click.
   */
  _language (e) {
    let target = e.target;
    let toggleBlock = document.getElementById('user-toggle');
    if (!toggleBlock) return;

    let toggle = toggleBlock.querySelector('.toggle');
    let flags = toggleBlock.querySelectorAll('.flag');

    if (
      target !== toggleBlock &&
      target !== toggle &&
      target !== flags[0] &&
      target !== flags[1]
    ) {
      return;
    }

    let currentPage;
    if (toggle.classList.contains('ru')) {
      this._renderAppTemplate(this.appTemplateEng);
      window.sessionStorage.setItem('currentLanguage', 'eng');
      currentPage = this.router.getCurrentPage.call(this);
      if (currentPage === '/chat') {
        this._startChat();
        return;
      }
      this._startLogin();
    } else {
      this._renderAppTemplate(this.appTemplateRu);
      window.sessionStorage.setItem('currentLanguage', 'ru');
      currentPage = this.router.getCurrentPage.call(this);
      if (currentPage === '/chat') {
        this._startChat();
        return;
      }
      this._startLogin();
    }
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

    this._isCurrentUser();

    this.router.setCurrentPage.call(this, 'startChat');

    this.chat = new Chat({
      element: element,
      NetworkService: NetworkService,
      messagesUrl: this.messagesUrl,
      form: Form,
      tooltip: Tooltip,
      currentUser: this.currentUser
    });
    this._setVh();
    this._getIP();
    window.sessionStorage.setItem('currentPage', '/chat');

    this.chat.initialStartChat();
  }

  /**
   * @method _isCurrentUser
   * @description Inner method - to check the user's login and replace the language switch with the user name.
   */
  _isCurrentUser () {
    let userElement = document.getElementById('user-toggle');

    if (window.sessionStorage.getItem('currentUser')) {
      this.currentUser = window.sessionStorage.getItem('currentUser');
    }
    if (userElement.classList.contains('header__user')) {
      this.currentUser = document.getElementById('user-toggle').innerHTML;
    }

    if (this.currentUser) {
      document.getElementById('user-toggle').innerHTML = this.currentUser;
      userElement.classList.add('header__user');
    }
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
    this.currentUser = document.getElementById(
      'user-toggle'
    ).innerHTML = userName;
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
    window.sessionStorage.setItem('currentPage', '/chat/login');
    this._isCurrentUser();

    this.router.setCurrentPage.call(this, 'startLogin');
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
}

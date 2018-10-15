import css from'./app.css';
import appTemplate from'./app.templ.pug';
import urls from './urls.json';
import NetworkService from '../networkService/networkService.js';
import Form from '../form/form.js';
import Tooltip from'../tooltip/tooltip.js';
import Users from '../users/users.js';
import Modal from '../modal/modal.js';
import Chat from '../chat/chat.js';
import Login from '../login/login.js';
import Router from '../router/router.js';
  
/** 
 * @class App
 * @description Class App - manages Form and Chat 
 * 
*/
export default class App {

  /**
		* @description render DOM and manages Chat and Login pages.
		* @param {object} element - the App DOM-element.
	*/
  constructor ({element}) {
    this.app = element;
    this.appTemplate = appTemplate.bind(this);
    this.networkService = new NetworkService();
    this.router = Router.bind(this);
       
    this.pages = {};
    this.messagesUrl;
    this.usersUrl;
    this.currentUser;
    this.currentPage;

    this._methodBinding(this.onLoginSubmit, this._startChat, this._startLogin)
    this._initialStartApp();
    this._initEvents();
  }

  _methodBinding(...args) {
    args.forEach(method => {
      let name = (method.name.charAt(0) === "_")? method.name.slice(1): method.name;
      //console.log(method.name, name)})
      return this[name] = method.bind(this);
    })
  }
  /**
		* @method _initialStartApp
		* @description Inner method - create header of the App.
	*/
  _initialStartApp() {
    this._getUrls()
      .then((response) => {
        this._renderAppTemplate();
        return response;
      })
      //.then(() => this._router())
      .then(() => {
        this.router = new this.router;
        this.pages = this.router.pagesRegistration.call(this, this.app);
        this.router.initEvents.call(this, this.app);
        this.router.setCurentPage.call(this, 'startChat');
      })
      .then(() => this._startChat())
      .catch(error => console.log(error));
   }

  /**
		* @method _getUrls
    * @description Inner method - get the database URLs for messages and users from json file from server.
	*/
  _getUrls() {
    return this.networkService.httpReq({url: urls, method: 'GET'})
      .then(
        response => {
          response = JSON.parse(response);
          this.messagesUrl = response.messages;
          this.usersUrl = response.users;
          return response;
        }
      )
      .catch(error => {
        console.log(error); 
      });
  }

  /**
		* @method _renderAppTemplate
    * @description Inner method - render App template (header).
	*/
  _renderAppTemplate() {
    this.app.innerHTML = this.appTemplate();
  }

  /**
		* @method _initEvents
    * @description Inner method - creating events for click (click on HTMLAnchorElement); and events for the window resizing.
	*/
  _initEvents() {
    window.addEventListener('resize', () => this._setVh());
  }

  /**
		* @method _startChat
    * @description Inner method - creating Chat page.
	*/
  _startChat() {
    let element = document.querySelector('.app__content');
    
    if(!element) {
      setTimeout(()=> {
        this.startChat();
      }, 100);
    }
    if(!element) return;
    
    this.currentUser = (document.getElementById('username').innerHTML)?
    document.getElementById('username').innerHTML :
    window.sessionStorage.getItem('currentUser');

    document.getElementById('username').innerHTML = this.currentUser;
    this.router.setCurentPage.call(this, 'startChat');

    this.chat = new Chat({
      element: element,
      networkService: NetworkService,
      messagesUrl: this.messagesUrl,
      form: Form,
      tooltip: Tooltip,
      currentUser: this.currentUser
    });
    this.chat.initialStartChat();
   
    this._setVh();
  }

  /**
		* @method _setVh
    * @description Inner method - sets the VH size for window resizing and sets app content height.
	*/
  _setVh() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    let header = document.querySelector('.app__header');
    let headerHeight = header.offsetHeight;
    let form = document.querySelector('.chat__form');
    let formHeight = (form && form.offsetHeight)? form.offsetHeight : 160;
    let appContent = document.querySelector('.app__content');
    let chatContent = document.getElementById('chat');

    let appContentHeight = window.innerHeight - headerHeight;
    appContent.style.height = (appContentHeight > formHeight+headerHeight )? 
                        appContentHeight + 'px' :
                        formHeight+headerHeight + 'px';

    if(!this.currentUser) return;
    if(chatContent) chatContent.style.height = parseFloat(appContent.style.height) - formHeight + 'px';
  }

  /**
		* @method onLoginSubmit(userName)
		* @description Public method - which sets behavior Login page on submit event.
		* @param {object} userName - the current user name.
	*/
  onLoginSubmit(userName) {
    if(!userName) return;

    window.sessionStorage.setItem('currentUser', userName);
    this.messagesLength = 0;
    this.currentUser = document.getElementById('username').innerHTML = userName;
    this.startChat();
  }

  /**
		* @method _startLogin
		* @description Inner method - creating Login page.
	*/
  _startLogin() {
    let element = document.querySelector('.app__content');
    if(!element) {
      setTimeout(()=> {
        this._startLogin();
      }, 100);
    }

    if(!element) return;

    this.login = new Login({
      element: element,
      usersUrl: this.usersUrl,
      networkService: NetworkService,
      form: Form,
      tooltip: Tooltip,
      users: Users,
      modal: Modal
    });
    this.login.onSubmit = this.onLoginSubmit;
    this.login.initialStartLogin();

    this.router.setCurentPage.call(this, 'startLogin');
  }

}
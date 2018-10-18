import css from './login.css';
import loginHeaderTemplate from '../login/login-header.templ.pug';
import loginTemplate from '../login/login.templ.pug';
import signTemplate from '../login/sign.templ.pug';
import forgotTemplate from '../login/forgot.templ.pug';
import Encrypt from '../encrypt/encrypt.js';

/**
 * @class Login
 * @description Class Login creates the Login page from the template, creates forms (login,registration), collect data from form-elements on Submint event and creates modal window if information isn't correct.
 * */
export default class Login {
  /**
   * @description creates login page content (render a form), check and collect data from login forms.
   * @param {object} element - the Login (DOM-element).
   * @param {string} usersUrl - URL of the messages in the database.
   * @param {class} networkService - class networkService for obtaining and publishing data in the database over the network.
   * @param {class} form - class that creates forms on the login page.
   * @param {class} tooltip - class Tooltip for create tooltips.
   * @param {class} users - class users for get and put users fromdatabase, check user information.
   * @param {class} modal - class modal creates modal window if information isn't true.
   */
  constructor ({
    element,
    usersUrl,
    NetworkService,
    form,
    Tooltip,
    Users,
    Modal
  }) {
    this.logins = element;
    this.usersUrl = usersUrl;
    this.networkService = new NetworkService();
    this.Form = form;
    this.tooltip = Tooltip;
    this.users = new Users({
      usersUrl: this.usersUrl,
      networkService: this.networkService
    });
    this.modal = new Modal();
    this.modal.onEvent = this._onModalEvent.bind(this);
    this.loginHeaderTemplate = loginHeaderTemplate;
    this.loginTemplate = loginTemplate;
    this.signTemplate = signTemplate;
    this.forgotTemplate = forgotTemplate;
    this.encrypt = new Encrypt();
    this.loginErrorText =
      'Введенные данные (логин или пароль) не верны, попробуйте еще раз';
    this.signErrorText =
      'Пользователь с таким логином или мейлом уже существует';
    this.forgotErrorText =
      'Пользователя с таким логином и мейлом не существует';
    this.tabsList = {};

    this.currentRadioChecked = document.querySelector(
      'input[type="radio"]:checked'
    );

    this._initEvents();
  }

  /**
   * @method _initEvents
   * @description Inner method - adding EventListener, sets classes on the tab elements and show/hide password
   */
  _initEvents () {
    this.logins.addEventListener('click', e => {
      let elem = e.target;
      if (
        !this.tabsList[elem.value] &&
        !elem.classList.contains('icon-password')
      ) {
        return;
      }

      if (this.tabsList[elem.value]) { this._setTabsClass(this.tabsList[elem.value]); }

      if (elem.classList.contains('icon-password')) {
        let input = this.logins.querySelector("input[name='pass']");
        elem.classList.toggle('icon-password_unlock');
        input.getAttribute('type') === 'password'
          ? input.setAttribute('type', 'text')
          : input.setAttribute('type', 'password');
      }
    });
  }

  /**
   * @method _setTabsClass(elemOnClick)
   * @description Inner method - adding class to the tabs on loggin page.
   * @param {object} elemOnClick - the element of the DOM on which the click occurred.
   */
  _setTabsClass (elemOnClick) {
    Object.keys(this.tabsList).forEach(tabName => {
      if (
        elemOnClick.tab === this.tabsList[tabName].tab &&
        !this.tabsList[tabName].tab.classList.contains('button_active')
      ) {
        this.tabsList[tabName].tab.classList.add('button_active');
        this._renderForm(this.tabsList[tabName].template);
      }
      if (
        elemOnClick.tab !== this.tabsList[tabName].tab &&
        this.tabsList[tabName].tab.classList.contains('button_active')
      ) {
        this.tabsList[tabName].tab.classList.remove('button_active');
      }
    });
  }

  /**
   * @method _renderForm(template)
   * @description Inner method - creating loggin form from template.
   * @param {function} template - template for creating loggin form.
   */
  _renderForm (template) {
    this.form.render(template);
    this.form.onSubmit = this.onLoginSubmit.bind(this);
  }

  /**
   * @method onLoginSubmit(data)
   * @description Public method - for behavior on submit login form
   * @param {object} data - data (user information) from login form.
   */
  onLoginSubmit (data) {
    if (!data['user-name'] || !data.pass) return;
    if (data.formName !== 'login' && !data['e-mail']) return;

    data.pass = this.encrypt.hashIt(data.pass);

    if (data['e-mail']) data['e-mail'] = this.encrypt.hashIt(data['e-mail']);
    if (window.sessionStorage.getItem('userIP')) { data.ip = window.sessionStorage.getItem('userIP'); }

    switch (data.formName) {
      case 'sign':
        if (
          this.users.checkUser({
            form: data.formName,
            user: data['user-name'],
            mail: data['e-mail']
          })
        ) {
          this.modal.createModal(this.signErrorText);

          return;
        }

        this.users.setNewUser({ data: data, usersUrl: this.usersUrl });

        this.onSubmit(data['user-name']);
        break;

      case 'forgot':
        if (
          !this.users.checkUser({
            form: data.formName,
            user: data['user-name'],
            mail: data['e-mail']
          })
        ) {
          this.modal.createModal(this.forgotErrorText);

          return;
        }

        this.users.changePassword({ data: data, usersUrl: this.usersUrl });

        this.onSubmit(data['user-name']);
        break;

      default:
        if (
          !this.users.checkUser({
            form: data.formName,
            user: data['user-name'],
            pass: data.pass
          })
        ) {
          this.modal.createModal(this.loginErrorText);

          return;
        }
        this.onSubmit(data['user-name']);
    }
  }

  /**
   * @method _onModalEvent
   * @description Inner method - removing modal window.
   */
  _onModalEvent () {
    this.modal.removeModal();
  }

  /**
   * @method onSubmit(message)
   * @description Public method - for behavior login page on submit login form
   * @param {string} data - user name from login form.
   */
  onSubmit (data) {
    console.log(console.log('You must set own onSubmit method'));
  }

  /**
   * @method initialStartLogin
   * @description Public method - for initial start login page. Creates tabs of the login form.
   */
  initialStartLogin () {
    this.logins.innerHTML = this.loginHeaderTemplate();
    this.loginsContent = this.logins.querySelector('.login__content_wrapper');

    this.tabs = this.logins.querySelectorAll('.button_login');
    this.tabs.forEach(tab => {
      this.tabsList[tab.value] = {};
      this.tabsList[tab.value]['tab'] = tab;
      this.tabsList[tab.value]['template'] = this[tab.value + 'Template'];
    });

    this.form = new this.Form({
      element: this.loginsContent,
      tooltip: this.tooltip
    });
    this._renderForm(this.tabsList.login.template);
  }
}

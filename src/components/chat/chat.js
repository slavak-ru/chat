import css from './chat.css';
import chatTemplate from './chat.templ.pug';
import Message from '../message/message.js';
import formTemplate from '../form/form.templ.pug';

/**
 * @class Chat
 * @description Class Chat - creating Chat page content and manages Chat and Form
 * */
export default class Chat {
  /**
   * @description render DOM and manages Chat and Form.
   * @param {object} element - the Chat (App content) DOM-element.
   * @param {string} messagesUrl - databes URL for messages.
   * @param {object} networkService - class for get and put information in the database by the net.
   * @param {object} form - the class for creating the Form element on the chat page.
   * @param {object} tooltip - the class for creating tooltips on errors the Form.
   * @param {string} currentUser - name of the current user.
   */
  constructor ({
    element,
    messagesUrl,
    NetworkService,
    form,
    tooltip,
    currentUser
  }) {
    this.chat = element;
    this.messagesUrl = messagesUrl;
    this.networkService = new NetworkService();
    this.Form = form;
    this.tooltip = tooltip;
    this.currentUser = currentUser;
    this.chatTemplate = chatTemplate.bind(this);
    this.messagesLength = 0;
    this.delay = 1000;
  }

  /**
   * @method initialStartChat
   * @description Public method - creates chat page from template and retrieves messages from the database.
   */
  initialStartChat () {
    this.chat.innerHTML = this.chatTemplate();
    (async () => {
      let response = await this.networkService
        .httpReq({
          url: this.messagesUrl,
          method: 'GET'
        })
        .catch(error => {
          let chat = document.getElementById('chat');
          chat.classList.add('database_error');
          console.log(error);
        });
      response = JSON.parse(response);
      this.messages = Array.isArray(response)
        ? response
        : Object.values(response);
      this.messagesLength = this.messages.length;
      this._startChat();
    })();
  }

  /**
   * @method _startChat
   * @description Inner method - create initial Chat and Form DOM-elements.
   */
  _startChat () {
    this.message = new Message({
      element: document.getElementById('chat'),
      messages: this.messages,
      currentUser: this.currentUser
    });
    this.form = new this.Form({
      element: document.getElementById('form'),
      tooltip: this.tooltip
    });
    this.form.onSubmit = this.onSubmit.bind(this);
    this._updateMessages();
    this._render(this.currentUser);
  }

  /**
   * @method _updateMessages
   * @description Inner method - updates messages from databse every time set by delay.
   */
  _updateMessages () {
    let self = this;

    setTimeout(function request () {
      self.networkService
        .httpReq({ url: self.messagesUrl, method: 'GET' })
        .then(response => {
          response = JSON.parse(response);
          response = Array.isArray(response)
            ? response
            : Object.values(response);
          let newMessages = response.slice(self.messagesLength);
          if (!newMessages.length) return;

          newMessages.forEach(key => {
            self.messagesLength += 1;
            self.message.addMessage(key);
            self._render(false);
          });
        });
      setTimeout(request, self.delay);
    }, this.delay);
  }

  /**
   * @method _render(user)
   * @description Inner method - render Chat and Form DOM-elements.
   * @param {string} user - the name of the current user, if any user is logged in - displays the form element.
   */
  _render (user) {
    this.message.render();
    if (!user) {
      return;
    }

    this.form.render(formTemplate);
  }

  /**
   * @method onSubmit(message)
   * @description Public method - adding new message in the Chat.
   * @param {object} message - contains user-name, message-content and message time-creation
   */
  onSubmit (newMessage) {
    if (!newMessage.message) return;

    newMessage.user = this.currentUser;

    if (window.sessionStorage.getItem('userIP')) {
      newMessage.ip = window.sessionStorage.getItem('userIP');
    }

    let json = JSON.stringify(newMessage);
    this.networkService.httpReq({
      url: this.messagesUrl,
      method: 'POST',
      data: json
    });
    this.messagesLength += 1;
    this.message.addMessage(newMessage);
    this._render(true);
  }
}

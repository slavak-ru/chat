(function(){
  'use strict';

  import Chat from '../chat/chat.js';
  import Form from '../form/form.js';
  
  /** @description Class App - manages Form and Chat */
  class App {

    /**
			* @description render DOM and manages Form and Chat.
			* @param {object} element - the App DOM-element.
		*/
    constructor ({element}) {
      this.app = element;
      this.appTemplate = window.appTemplate.bind(this);
      this.loginTemplate = window.loginTemplate.bind(this);
      
      this.messagesUrl;
      this.messagesLength = 0;
      this.delay = 1000;
      this.networkService = this._networkService.bind(this);

      this.userElement;
      this.usersUrl; 
      this.currentUser;

      this._initialStartChat();
      this._initEvent();
    }

    _setVh() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);

      let header = document.querySelector('.app__header');
      let headerHeight = header.offsetHeight;
      let form = document.querySelector('.app__form');
      let formHeight = (form.offsetHeight)? form.offsetHeight : 0;
      let chatContent = document.querySelector('.app__content_wrapper');

      let chatContentHeight = window.innerHeight - headerHeight - formHeight;
      chatContent.style.minHeight = (chatContentHeight > formHeight+headerHeight )? 
                          chatContentHeight + 'px' :
                          formHeight+headerHeight + 'px';
    }

    _initialStartChat() {
      this.networkService({url: 'components/app/urls.json', type: 'GET'})
                  .then(response => {
                    this.messagesUrl = JSON.parse(response).messages;
                    this.usersUrl = JSON.parse(response).users;
                    return response;
                  })
                  .then((response) => {
                    this.users = new Users({usersUrl: this.usersUrl});
                    this.users.getUsers();
                    return response;
                  })
                  .then((response)=>{
                    this._startChat();
                    this._setVh();
                  })
    }
   
    /**
			* @method _initialLogin()
			* @description Inner method - create Login page.
		*/
    _initialLogin() {
      this.app.innerHTML = this.loginTemplate();
      this.login = new Login({element: document.getElementById('login'), form: Form, tooltip: Tooltip, usersUrl: this.usersUrl});
      this.login.onSubmit = this.onLoginSubmit.bind(this);
    }

    /**
			* @method _initialStartChat()
			* @description Inner method - create initial Chat and Form DOM-elements and render them.
		*/
    _startChat() {
      this._checkUser();
      this.app.innerHTML = this.appTemplate();
      
      this.chat = new Chat(document.getElementById('chat'));
      this.userElement = document.getElementById('username');

      this.form = new Form({element: document.getElementById('form'), tooltip: Tooltip});
      this.form.onSubmit = this.onSubmit.bind(this);
      this._updateMessages();
    }

    _initEvent() {
      this.app.addEventListener('click', (e)=>{
        
        if (e.target['name'] != 'login-page') return;

          this._initialLogin();
      
      })

      window.addEventListener('resize', () => this._setVh());
    }

    _render(status) {
      if(!status) {
        this.chat.render();
        return;
      }
      this.userElement.innerHTML = this.currentUser;
      this.chat.render();
      this.form.render();
      this._setVh()
    }

    _checkUser() {
      this.networkService({url: this.usersUrls, type: 'GET'})
      .then(response => {

        if (response === undefined) {
          let self = this;
      
          setTimeout(function requestUsers() {

            self.networkService({url: self.usersUrl, type: 'GET'})
              .then(response => {
                if(!response) setTimeout(requestUsers, self.delay);
                
                let storage = window.sessionStorage.getItem("curentUser");

                self.currentUser = (self.users.checkUser('user-name', storage))? storage: null;

                if(!self.currentUser) {
                  sessionStorage.setItem("curentUser", null);
                  return;
                }
                self._render(true);
              });
            }, this.delay);
        }
      })
    }
  
    _updateMessages() {
      let self = this;
      
      setTimeout(function request(){

        self.networkService({url: self.messagesUrl, type: 'GET'})
          .then(response => {
            
            response = JSON.parse(response);
            let indexNewMessages = Object.keys(response).slice(self.messagesLength);

            indexNewMessages.forEach(key=>{
              self.messagesLength += 1;

              self.chat.addMessage(response[key]);
              self._render(false);
            })
          });
        setTimeout(request, self.delay);
      }, this.delay);
    }

    /**
			* @method _networkService({url, type, data})
			* @description Inner method - adding new message in the Chat.
			* @param {string} url - url POST for messages json.
      * @param {string} type - type of the query ('GET' or 'PUT').
      * @param {json} data - json file with messages.
		*/
    _networkService({url, type, data}) {
      return new NetworkService().httpReq({url, type, data})
        .then(
          response => response,
          error => console.log(`Rejected: ${error}`)
      )
    }
  
    /**
			* @method onSubmit(message)
			* @description Public method - adding new message in the Chat.
			* @param {object} message - contains user-name, message-content and message time-creation
		*/
    onSubmit(message) {

      if (!message.message ) return;

      message.user = window.sessionStorage.getItem("curentUser");

      let json = JSON.stringify(message);

      this.networkService({
                url: this.messagesUrl, 
                type:'POST', 
                data: json});
      this.messagesLength += 1;
      this.chat.addMessage(message);
      this._render(true);
    }

    /**
			* @method onLoginSubmit(userName)
			* @description Public method - 
			* @param {object} data - 
		*/
    onLoginSubmit(userName) {
      window.sessionStorage.setItem('curentUser', userName)
      this.messagesLength = 0;
      this._initialStartChat();
    }

    
  }

  window.App = App;
})();
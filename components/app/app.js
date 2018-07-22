(function(){
  'use strict';
  
  /** @description Class App - manages Form and Chat */
  class App {

    /**
			* @description render DOM and manages Form and Chat.
			* @param {object} element - the App DOM-element.
		*/
    constructor ({element}) {
      this.app = element;
      this.appTemplate = window.appTemplate.bind(this);
      this.messagesUrl = 'https://chat-2b2e7.firebaseio.com/chat/messages.json';
      this.messagesLength = 0;
      this.delay = 1000;

      this._initialCreateChat();

      this.form.onSubmit = this.onSubmit.bind(this);
    }

    
    /**
			* @method _initialCreateChat()
			* @description Inner method - create initial Chat and Form DOM-elements and render them.
		*/
    _initialCreateChat() {
      this.app.innerHTML = this.appTemplate();

      this.chat = new Chat(document.getElementById('chat'));
      this.form = new Form({element: document.getElementById('form'), tooltip: Tooltip});
      this.form.render();
      this.textarea = new Textarea({element: document.querySelector('textarea[name="message"]')});
      this._updateMessages();
    }

    _updateMessages() {
      let self = this;
      
      setTimeout(function request(){
        
        self._xhr({url: self.messagesUrl, type:'GET'})
          .then(response => {
            let indexNewMessages = Object.keys(response).slice(self.messagesLength);

            indexNewMessages.forEach(key=>{
              self.messagesLength += 1;
              self.chat.addMessage(response[key]);
              self.chat.render();
            })
          });
        setTimeout(request, self.delay);
      }, this.delay);
    }

    /**
			* @method _xhr({url, type, data})
			* @description Inner method - adding new message in the Chat.
			* @param {string} url - url for messages json.
      * @param {string} type - type of the query ('GET' or 'PUT').
      * @param {json} data - json file with messages.
		*/
    _xhr({url, type, data}) {
      return httpGet({url, type, data})
        .then(
          response => this.messages = JSON.parse(response),
          error => console.log(`Rejected: ${error}`)
      )
    }
  
    /**
			* @method onSubmit(message)
			* @description Public method - adding new message in the Chat.
			* @param {object} message - contains user-name, message-content and message time-creation
		*/
    onSubmit(message) {

      if (!message.user || !message.message ) return;

      let json = JSON.stringify(message);
      this._xhr({
                url: 'https://chat-2b2e7.firebaseio.com/chat/messages.json', 
                type:'POST', 
                data: json});
      this.messagesLength += 1;
      this.chat.addMessage(message);
      this.chat.render();
      this.form.render();
    }
  }

  window.App = App;
})();
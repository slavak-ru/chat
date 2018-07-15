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

      this.chat.render();
      this.form.render();
  
      this.textarea = new Textarea({element: document.querySelector('textarea[name="message"]')});
    }
  
    /**
			* @method onSubmit(message)
			* @description Public method - adding new message in the Chat.
			* @param {object} message - contains user-name, message-content and message time-creation
		*/
    onSubmit(message) {

      if (!message.user || !message.message ) return;
    
      this.chat.addMessage(message);
      this.chat.render();
      this.form.render();

    }
  }

  window.App = App;
})();
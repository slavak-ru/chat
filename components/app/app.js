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
  
      this._startChat();

      this.form.onSubmit = this.onSubmit.bind(this);
    }

    /**
			* @method _startChat()
			* @description Inner method - create initial Chat and Form DOM-elements and render them.
		*/
    _startChat() {
      
      let chatElement = this._createElement({tag: 'div', className: 'chat', id: 'chat'});
      let formElement = this._createElement({tag: 'div', className: 'form', id: 'form'});

      this.chat = new Chat(chatElement);
      this.form = new Form({element: formElement, tooltip: Tooltip});

      this.chat.render();
      this.form.render();
  
      this.textarea = new Textarea({element: document.querySelector('textarea[name="message"]')});
    }

    /**
			* @method _createElement(option)
			* @description Inner method - create DOM-element and append element to the App.
			* @param {object} option - contains TAG-name, ClassName and ID of the element.
			* @return {object} element - created element.
		*/
    _createElement({tag, className, id}) {
      let element = document.createElement(tag);
      element.className = className;
      element.id = id;

      this.app.appendChild(element);

      return element;
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





/** @description app.js - is a control module, create and manage all components of the Chat*/
/*
let chat = new Chat({element: document.getElementById('chat')});
let form = new Form({element: document.getElementById('form'), tooltip: Tooltip});

chat.render();
form.render();

let textarea = new Textarea({element: document.querySelector('textarea[name="message"]')});

form.onSubmit = (message) => {
  let tooltip = {};
  
  if (!message.user || !message.message ) return;

  let tooltips = document.querySelectorAll('.tooltip');
  tooltips.forEach((elem)=> document.body.removeChild(elem) )

  chat.addMessage(message);
  chat.render();
  form.render();
}
*/
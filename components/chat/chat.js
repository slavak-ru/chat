(function(){
  'use strict';
  
	/** @description Class Chat add messagees in Chat  (DOM-element). */
  class Chat {
    /**
			* @description adding messages in the Chat.
			* @param {object} element - the Chat (DOM-element).
			* @param {object} data - contains all chat messages.
		*/
    constructor(element, data = {chat: {messages:[], users: []}}) {
      this.chat = element;
      this.data = data;
      this.count = 0;
      this.chatTemplate = window.chatTemplate.bind(this);
    }

    /**
			* @method render()
			* @description Public method - create DOM-element for new message and add to the Chat.
		*/
    render() { 
      let div;
      if (this.data.chat.messages.length > this.count ) {
        div = document.createElement('div');
        div.className = 'message-wrapper';
        div.innerHTML = this.chatTemplate(this.data);
        
        this.count++;
      }
      
      if(div) this.chat.appendChild(div);
    }

    /**
			* @method render()
			* @description Public method - adding new key and value to the data-object.
		*/
    addMessage(message) {
        this.data.chat.messages.push({user: message.user, time: message.time , message: message.message});
      }
  }

  window.Chat = Chat;
})();
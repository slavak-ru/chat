(function(){
  'use strict'
	/** @description Class Chat add messagees in Chat  (DOM-element). */
  class Chat {
    /**
			* @description adding messages in the Chat.
			* @param {object} element - the Chat (DOM-element).
			* @param {object} data - contains all chat messages.
		*/
    constructor(element, data = {messages:[]}) {
      this.chat = element;
      this.data = data;
      this.count = 0;
    }

    /**
			* @method render()
			* @description Public method - create DOM-element for new message and add to the Chat.
		*/
    render() {
      let dataOption = {day: '2-digit', month: '2-digit', year: '2-digit', minute: '2-digit',  hour:'2-digit', second:'2-digit'};
      let data = new Date().toLocaleString('ru', dataOption);   
      let div;
      if (this.data.messages.length > this.count ) {
        div = document.createElement('div');
        div.className = 'message-wrapper';
        div.innerHTML = `
          <div class="user">${this.data.messages[this.count][0]}
          <span class="data">${data}<span>
          </div>
          <div class="message">${this.data.messages[this.count][1]}</div>
          </div>`;

        this.count++;
      }
      
      if(div) this.chat.appendChild(div);
      
    }

    /**
			* @method render()
			* @description Public method - adding new key and value to the data-object.
		*/
    addMessage(message) {
        this.data.messages.push([message.user, message.message]);
      }
  }

  window.Chat = Chat;
})();
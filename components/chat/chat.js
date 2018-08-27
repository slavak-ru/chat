(function(){
  'use strict';
  
	/** @description Class Chat add messagees in Chat  (DOM-element). */
  class Chat {
    /**
			* @description adding messages in the Chat.
			* @param {object} element - the Chat (DOM-element).
			* @param {object} messages - contains all chat message. Each the message is array.
		*/
    constructor(element, messages = {messages:[]}) {
      this.chat = element;
      this.messages = messages.messages;
      this.count = 0;
      this.chatTemplate = window.chatTemplate.bind(this);
    }

    /**
			* @method render()
			* @description Public method - create DOM-element for new message and add to the Chat.
		*/
    render() { 
      if (this.messages.length === this.count) return;

      let elements = this._createChatElements();
      this.chat.appendChild(elements);

      this._scrollElement(this.chat.lastElementChild);
    }

    /**
			* @method _addChatElement()
      * @description Inner method - adding elements (messages) and return DOM-element.
      * @return {objet} - return DOM-element if one message or document fragment with chat's messages DOM-elements (if messages more than one).
		*/
    _createChatElements() {
      let fragment = document.createDocumentFragment();
      
      for (this.count; this.count < this.messages.length; this.count +=1) {
        let div = document.createElement('div');
        div.className = 'message-wrapper';
        div.innerHTML = this.chatTemplate(this.messages[this.count]);
        fragment.appendChild(div);
      }  
      return fragment;
    }

    /**
			* @method _scrollElement(element)
      * @description Inner method - scrolls if the element is not visible.
      * @param {object} element - the DOM-element of the Chat.
		*/
    _scrollElement(element) {
      if (element.getBoundingClientRect().bottom - element.offsetHeight <= this.chat.clientHeight) return;

      this.chat.parentElement.style.overflowY = 'auto';
      //this.chat.parentElement.scrollTop = div.getBoundingClientRect().bottom; // other way to scroll
      element.scrollIntoView(false);
    }

    /**
			* @method addMessage(message)
      * @description Public method - adding new key and value to the data-object.
      * @param {object} message - the objest contains user, time and message keys.
		*/
    addMessage(message) {
        this.messages.push({user: message.user, time: message.time , message: message.message});
      }
  }

  window.Chat = Chat;
})();
import css from './message.css';
import messageTemplate from './message.templ.pug';
import userPic from './user-pic.png';

/**
 * @class Message
 * @description Class Message add messages in Chat (DOM-element).
 * */
export default class Message {
  /**
   * @description adding messages in the Chat.
   * @param {object} element - the Chat (DOM-element).
   * @param {object} messages - contains all chat message. Each the message is array.
   * @param {string} currentUser - the name of the registered user.
   */
  constructor({ element, messages = [], currentUser }) {
    this.chat = element;
    this.messages = Array.isArray(messages)
      ? messages
      : Object.values(messages);
    this.currentUser = currentUser;
    this.count = 0;
    this.messageTemplate = messageTemplate.bind(this);
  }

  /**
   * @method render
   * @description Public method - create DOM-element for new message and add to the Chat.
   */
  render() {
    if (this.messages.length === this.count) return;
    // 0: {message: "", start: "start", time: "", user: ""}length: 1__proto__: Array(0)
    if (
      !this.messages[this.count].message.length ||
      !this.messages[this.count].user.length
    ) {
      this.count += 1;
      return;
    }
    let elements = this._createChatElements();
    this.chat.appendChild(elements);
    this._scrollElement(this.chat.lastElementChild);
  }

  /**
   * @method _addChatElement
   * @description Inner method - adding elements (messages) and return DOM-element.
   * @return {object} - return DOM-element if one message or document fragment with chat's messages DOM-elements (if messages more than one).
   */
  _createChatElements() {
    let fragment = document.createDocumentFragment();
    for (this.count; this.count < this.messages.length; this.count += 1) {
      let div = document.createElement('div');
      div.className =
        this.messages[this.count].user !== this.currentUser
          ? 'message-wrapper'
          : 'message-wrapper current-user';
      div.innerHTML = this.messageTemplate(this.messages[this.count]);
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
    if (
      element.getBoundingClientRect().bottom - element.offsetHeight <=
      this.chat.clientHeight
    )
      return;

    this.chat.parentElement.style.overflowY = 'auto';
    //this.chat.parentElement.scrollTop = div.getBoundingClientRect().bottom; // other way toscroll
    element.scrollIntoView(false);
  }

  /**
   * @method addMessage(message)
   * @description Public method - adding new key and value to the data-object.
   * @param {object} message - the objest contains user, time and message keys.
   */
  addMessage(message) {
    if (!message.user.length || !message.message.length) return;
    this.messages.push({
      user: message.user,
      time: message.time,
      message: message.message,
    });
  }
}
